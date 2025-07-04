import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { Resend } from 'https://esm.sh/resend@2.0.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

interface BookingInquiry {
  name: string;
  email: string;
  phone?: string;
  numberOfGuests: number;
  adults: number;
  children: number;
  message: string;
  startDate: string;
  endDate: string;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Only allow POST requests
    if (req.method !== 'POST') {
      throw new Error('Method not allowed');
    }

    // Get request body
    const body: BookingInquiry = await req.json();

    // Validate required fields
    const requiredFields = ['name', 'email', 'numberOfGuests', 'message', 'startDate', 'endDate'];
    for (const field of requiredFields) {
      if (!body[field as keyof BookingInquiry]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    // Initialize Resend with error handling
    let resend;
    try {
      resend = new Resend(Deno.env.get('RESEND_API_KEY'));
      if (!Deno.env.get('RESEND_API_KEY')) {
        throw new Error('RESEND_API_KEY environment variable is not set');
      }
    } catch (error) {
      console.error('Failed to initialize Resend:', error);
      throw new Error(`Email service initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    // Format dates for display
    const startDate = new Date(body.startDate).toLocaleDateString('nl-NL');
    const endDate = new Date(body.endDate).toLocaleDateString('nl-NL');

    // Create owner email HTML (in Dutch)
    const ownerEmailHtml = `
      <h2>Nieuwe boekingsaanvraag van ${body.name}</h2>
      <p>Voor: Casa Mi Sueño</p>
      <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Naam:</strong></td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${body.name}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>E-mail:</strong></td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${body.email}</td>
        </tr>
        ${body.phone ? `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Telefoon:</strong></td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${body.phone}</td>
        </tr>
        ` : ''}
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Aankomst:</strong></td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${startDate}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Vertrek:</strong></td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${endDate}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Volwassenen:</strong></td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${body.adults}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Kinderen:</strong></td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${body.children}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Bericht:</strong></td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${body.message}</td>
        </tr>
      </table>
    `;

    // Create guest confirmation email HTML (in Dutch)
    const guestEmailHtml = `
      <h2>Bedankt voor je boekingsaanvraag!</h2>
      <p>Beste ${body.name},</p>
      <p>We hebben je boekingsaanvraag voor Casa Mi Sueño ontvangen. We nemen zo snel mogelijk contact met je op om je boeking te bevestigen.</p>
      
      <h3>Overzicht van je aanvraag:</h3>
      <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Aankomst:</strong></td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${startDate}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Vertrek:</strong></td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${endDate}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Volwassenen:</strong></td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${body.adults}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Kinderen:</strong></td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${body.children}</td>
        </tr>
        ${body.message !== 'Geen specifieke opmerkingen' ? `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Jouw bericht:</strong></td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${body.message}</td>
        </tr>
        ` : ''}
      </table>
      
      <p>Met vriendelijke groet,<br/>
      Casa Mi Sueño</p>
    `;

    // Send email to owner
    const { data: ownerEmailData, error: ownerEmailError } = await resend.emails.send({
      from: 'Casa Mi Sueño <onboarding@resend.dev>',
      to: Deno.env.get('ADMIN_EMAIL')!,
      subject: `Boekingsaanvraag – ${body.name} – ${startDate} tot ${endDate}`,
      html: ownerEmailHtml,
      reply_to: body.email
    });

    if (ownerEmailError) {
      throw ownerEmailError;
    }

    // Send confirmation email to guest
    const { data: guestEmailData, error: guestEmailError } = await resend.emails.send({
      from: 'Casa Mi Sueño <onboarding@resend.dev>',
      to: body.email,
      subject: 'Bevestiging boekingsaanvraag - Casa Mi Sueño',
      html: guestEmailHtml
    });

    if (guestEmailError) {
      console.error('Warning: Failed to send confirmation email to guest:', guestEmailError);
      // Don't throw here - we still want to continue if the owner email was sent
    }

    // Optional: Log to contact_submissions table
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { error: dbError } = await supabase
      .from('contact_submissions')
      .insert({
        name: body.name,
        email: body.email,
        phone: body.phone,
        message: body.message,
        type: 'booking',
        check_in_date: body.startDate,
        check_out_date: body.endDate,
        number_of_guests: body.numberOfGuests
      });

    if (dbError) {
      console.error('Error logging submission:', dbError);
      // Don't throw here - we still want to return success if email was sent
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Booking inquiry sent successfully' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: error instanceof Error ? error.message : 'An unknown error occurred' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    );
  }
});