import { Handler, HandlerEvent } from '@netlify/functions';
import { Resend } from 'resend';

interface BookingInquiry {
  name: string;
  email: string;
  phone?: string;
  numberOfGuests?: number;
  adults?: number;
  children?: number;
  message: string;
  startDate?: string;
  endDate?: string;
  honeypot?: string; // Anti-spam honeypot field
}

// Simple in-memory rate limiter (resets on function cold start)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 5 * 60 * 1000; // 5 minutes
const RATE_LIMIT_MAX = 3; // Max 3 submissions per window

// Clean up old entries periodically
const cleanupRateLimitMap = () => {
  const now = Date.now();
  for (const [key, value] of rateLimitMap.entries()) {
    if (now - value.timestamp > RATE_LIMIT_WINDOW) {
      rateLimitMap.delete(key);
    }
  }
};

// Check rate limit
const checkRateLimit = (ip: string): boolean => {
  cleanupRateLimitMap();
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return true;
  }

  // Check if window has expired
  if (now - entry.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return true;
  }

  // Check if under limit
  if (entry.count < RATE_LIMIT_MAX) {
    entry.count++;
    return true;
  }

  return false;
};

// Validate email format
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Normalize phone number
const normalizePhoneNumber = (phone: string): string => {
  return phone.replace(/[\s\-()]/g, '');
};

// Validate phone number (Dutch and international E.164 formats)
const isValidPhone = (phone: string): boolean => {
  if (!phone || phone.trim() === '') {
    return true; // Optional field
  }

  const normalized = normalizePhoneNumber(phone.trim());

  // Dutch mobile: 06 followed by 8 digits
  const dutchMobilePattern = /^06\d{8}$/;
  
  // Dutch landline: 0 + area code (2-3 digits) + number (6-7 digits)
  const dutchLandlinePattern = /^0[1-9]\d{7,9}$/;
  
  // International format: +31 followed by 9 digits (Dutch)
  const intlDutchPattern = /^\+31[1-9]\d{8}$/;
  
  // International format with leading 00: 0031 followed by 9 digits
  const intlDutch00Pattern = /^0031[1-9]\d{8}$/;
  
  // Generic international E.164: + followed by 1-3 digit country code and 4-14 digits
  const intlGenericPattern = /^\+\d{1,3}\d{4,14}$/;

  return (
    dutchMobilePattern.test(normalized) ||
    dutchLandlinePattern.test(normalized) ||
    intlDutchPattern.test(normalized) ||
    intlDutch00Pattern.test(normalized) ||
    intlGenericPattern.test(normalized)
  );
};

// Validate required fields
const validateFields = (body: BookingInquiry): string | null => {
  if (!body.name || body.name.trim().length < 2) {
    return 'Naam moet minimaal 2 karakters bevatten';
  }

  if (body.name.trim().length > 100) {
    return 'Naam mag maximaal 100 karakters bevatten';
  }

  if (!body.email || !isValidEmail(body.email)) {
    return 'Ongeldig e-mailadres';
  }

  if (!body.message || body.message.trim().length < 10) {
    return 'Bericht moet minimaal 10 karakters bevatten';
  }

  // Validate phone if provided
  if (body.phone && !isValidPhone(body.phone)) {
    return 'Voer een geldig telefoonnummer in';
  }

  return null;
};

export const handler: Handler = async (event: HandlerEvent) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, message: 'Method not allowed' }),
    };
  }

  try {
    // Fail-fast: Check required environment variables
    const resendApiKey = process.env.RESEND_API_KEY;
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!resendApiKey) {
      console.error('RESEND_API_KEY environment variable is not configured');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: 'Server configuration error: RESEND_API_KEY is missing. Please contact support.' 
        }),
      };
    }

    if (!adminEmail) {
      console.error('ADMIN_EMAIL environment variable is not configured');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: 'Server configuration error: ADMIN_EMAIL is missing. Please contact support.' 
        }),
      };
    }

    // Get client IP for rate limiting
    const clientIp = event.headers['x-forwarded-for']?.split(',')[0] || 
                     event.headers['client-ip'] || 
                     'unknown';

    // Check rate limit
    if (!checkRateLimit(clientIp)) {
      return {
        statusCode: 429,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: 'Te veel verzoeken. Probeer het later opnieuw.' 
        }),
      };
    }

    // Parse request body
    if (!event.body) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, message: 'Geen gegevens ontvangen' }),
      };
    }

    const body: BookingInquiry = JSON.parse(event.body);

    // Check honeypot field (should be empty)
    if (body.honeypot && body.honeypot.trim() !== '') {
      console.log('Honeypot triggered, likely spam');
      // Return success to not alert bots
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, message: 'Message sent successfully' }),
      };
    }

    // Validate required fields
    const validationError = validateFields(body);
    if (validationError) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, message: validationError }),
      };
    }

    // Initialize Resend (env vars already validated at start of try block)
    const resend = new Resend(resendApiKey);
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'Casa Mi Sueño <onboarding@resend.dev>';

    // Determine if this is a booking inquiry
    const isBooking = !!(body.startDate && body.endDate);

    // Format dates if provided
    let startDate = '';
    let endDate = '';
    if (body.startDate && body.endDate) {
      try {
        startDate = new Date(body.startDate).toLocaleDateString('nl-NL', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });
        endDate = new Date(body.endDate).toLocaleDateString('nl-NL', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });
      } catch (error) {
        console.error('Error formatting dates:', error);
      }
    }

    // Create owner email HTML
    const ownerEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          h2 { color: #C75B39; }
          table { border-collapse: collapse; width: 100%; margin: 20px 0; }
          td { padding: 10px; border-bottom: 1px solid #eee; }
          .label { font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>${isBooking ? 'Nieuwe boekingsaanvraag' : 'Nieuw contactformulier'} van ${body.name}</h2>
          <p>Voor: Casa Mi Sueño</p>
          <table>
            <tr>
              <td class="label">Naam:</td>
              <td>${body.name}</td>
            </tr>
            <tr>
              <td class="label">E-mail:</td>
              <td><a href="mailto:${body.email}">${body.email}</a></td>
            </tr>
            ${body.phone ? `
            <tr>
              <td class="label">Telefoon:</td>
              <td>${body.phone}</td>
            </tr>
            ` : ''}
            ${startDate && endDate ? `
            <tr>
              <td class="label">Aankomst:</td>
              <td>${startDate}</td>
            </tr>
            <tr>
              <td class="label">Vertrek:</td>
              <td>${endDate}</td>
            </tr>
            ` : ''}
            ${body.numberOfGuests ? `
            <tr>
              <td class="label">Aantal gasten:</td>
              <td>${body.numberOfGuests}${body.adults !== undefined && body.children !== undefined ? ` (${body.adults} volwassenen, ${body.children} kinderen)` : ''}</td>
            </tr>
            ` : ''}
            <tr>
              <td class="label">Bericht:</td>
              <td>${body.message}</td>
            </tr>
          </table>
        </div>
      </body>
      </html>
    `;

    // Create guest confirmation email HTML
    const guestEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          h2 { color: #C75B39; }
          table { border-collapse: collapse; width: 100%; margin: 20px 0; }
          td { padding: 10px; border-bottom: 1px solid #eee; }
          .label { font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Bedankt voor je ${isBooking ? 'aanvraag' : 'bericht'}!</h2>
          <p>Beste ${body.name},</p>
          <p>We hebben je ${isBooking ? 'boekingsaanvraag' : 'bericht'} voor Casa Mi Sueño ontvangen. We nemen zo snel mogelijk contact met je op${isBooking ? ' om je boeking te bevestigen' : ''}.</p>
          ${isBooking ? `
          <h3>Overzicht van je aanvraag:</h3>
          <table>
            <tr>
              <td class="label">Aankomst:</td>
              <td>${startDate}</td>
            </tr>
            <tr>
              <td class="label">Vertrek:</td>
              <td>${endDate}</td>
            </tr>
            ${body.numberOfGuests ? `
            <tr>
              <td class="label">Aantal gasten:</td>
              <td>${body.numberOfGuests}${body.adults !== undefined && body.children !== undefined ? ` (${body.adults} volwassenen, ${body.children} kinderen)` : ''}</td>
            </tr>
            ` : ''}
            ${body.message ? `
            <tr>
              <td class="label">Jouw bericht:</td>
              <td>${body.message}</td>
            </tr>
            ` : ''}
          </table>
          ` : ''}
          <p>Met vriendelijke groet,<br/>
          Casa Mi Sueño</p>
        </div>
      </body>
      </html>
    `;

    // Send email to owner
    try {
      await resend.emails.send({
        from: fromEmail,
        to: adminEmail,
        subject: isBooking 
          ? `Boekingsaanvraag – ${body.name}${startDate ? ` – ${startDate} tot ${endDate}` : ''}`
          : `Contactformulier – ${body.name}`,
        html: ownerEmailHtml,
        replyTo: body.email,
      });
    } catch (error) {
      console.error('Error sending owner email:', error);
      throw new Error('Failed to send notification email');
    }

    // Send confirmation email to guest
    try {
      await resend.emails.send({
        from: fromEmail,
        to: body.email,
        subject: isBooking 
          ? 'Bevestiging boekingsaanvraag - Casa Mi Sueño'
          : 'Bevestiging van je bericht - Casa Mi Sueño',
        html: guestEmailHtml,
      });
    } catch (error) {
      console.error('Warning: Failed to send confirmation email to guest:', error);
      // Don't throw - owner email was sent successfully
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: isBooking ? 'Booking inquiry sent successfully' : 'Message sent successfully'
      }),
    };

  } catch (error) {
    console.error('Error processing contact form:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false, 
        message: error instanceof Error ? error.message : 'Er is een fout opgetreden bij het verzenden van je bericht' 
      }),
    };
  }
};

