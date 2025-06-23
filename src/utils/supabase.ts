import { createClient } from '@supabase/supabase-js';
import { Database } from './types/supabase';

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase configuration. Please check your .env file for VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
}

// Create Supabase client with type safety
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Helper functions for contact form submissions
export const contactApi = {
  /**
   * Create a new contact form submission
   */
  async submitContactForm(contact: {
    name: string;
    email: string;
    phone?: string;
    message: string;
    type: 'general' | 'booking';
    check_in_date?: string;
    check_out_date?: string;
    number_of_guests?: number;
  }) {
    try {
      // Store in Supabase
      const { data, error } = await supabase
        .from('contact_submissions')
        .insert([{
          ...contact,
          created_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;

      // Send email notification
      await this.sendEmailNotification({
        ...contact,
        submission_id: data.id
      });

      return data;
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }
  },

  /**
   * Send email notification for new contact form submissions
   */
  async sendEmailNotification(data: {
    name: string;
    email: string;
    phone?: string;
    message: string;
    type: 'general' | 'booking';
    check_in_date?: string;
    check_out_date?: string;
    number_of_guests?: number;
    submission_id: number;
  }) {
    // Here you would implement your email sending logic
    // This could be using a Netlify function, AWS Lambda, or any other serverless function
    
    const emailEndpoint = import.meta.env.VITE_EMAIL_ENDPOINT;
    if (!emailEndpoint) {
      console.error('Missing email endpoint configuration');
      return;
    }

    try {
      const response = await fetch(emailEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: data.type === 'booking' 
            ? `Nieuwe boekingsaanvraag van ${data.name}`
            : `Nieuw contactformulier van ${data.name}`,
          data: {
            ...data,
            formatted_dates: data.check_in_date && data.check_out_date
              ? `${new Date(data.check_in_date).toLocaleDateString('nl-NL')} tot ${new Date(data.check_out_date).toLocaleDateString('nl-NL')}`
              : undefined
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email notification');
      }
    } catch (error) {
      console.error('Error sending email notification:', error);
      // Don't throw here - we still want to save the submission even if email fails
    }
  }
}; 