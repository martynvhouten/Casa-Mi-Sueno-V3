import { serve } from 'https://deno.fresh.dev/std@v1/http/server.ts';
import { Resend } from 'https://esm.sh/resend@1.0.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

interface BookingInquiry {
  name: string;
  email: string;
  phone?: string;
  numberOfGuests: number;
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

    // Initialize Resend
    const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

    // Format dates for display
    const startDate = new Date(body.startDate).toLocaleDateString('nl-NL');
    const endDate = new Date(body.endDate).toLocaleDateString('nl-NL');

    // Create email HTML
    const emailHtml = `
      <h2>New Booking Inquiry from ${body.name}</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Name:</strong></td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${body.name}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${body.email}</td>
        </tr>
        ${body.phone ? `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${body.phone}</td>
        </tr>
        ` : ''}
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Check-in:</strong></td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${startDate}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Check-out:</strong></td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${endDate}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Number of Guests:</strong></td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${body.numberOfGuests}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Message:</strong></td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${body.message}</td>
        </tr>
      </table>
    `;

    // Send email
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: 'Casa Mi Sueño <no-reply@casamisueno.com>',
      to: Deno.env.get('ADMIN_EMAIL')!,
      subject: `Booking request – ${body.name} – ${startDate} to ${endDate}`,
      html: emailHtml,
      reply_to: body.email
    });

    if (emailError) {
      throw emailError;
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