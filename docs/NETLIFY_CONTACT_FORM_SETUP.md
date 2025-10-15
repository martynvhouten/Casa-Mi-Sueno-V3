# Netlify Contact Form Setup Guide

This guide explains how to configure the contact form for Casa Mi Sueño, which uses a Netlify Function and Resend for email delivery.

## Overview

The contact form has been migrated from Supabase Edge Functions to Netlify Functions for better integration with the Netlify hosting platform. The form uses Resend for reliable email delivery and includes anti-spam measures.

## Environment Variables

The following environment variables must be configured in your Netlify dashboard:

### Required Variables

1. **RESEND_API_KEY**
   - **Purpose**: API key for the Resend email service
   - **How to get it**:
     1. Go to [resend.com](https://resend.com)
     2. Sign up or log in
     3. Navigate to API Keys section
     4. Create a new API key
   - **Example**: `re_123abc456def789ghi`

2. **ADMIN_EMAIL**
   - **Purpose**: Email address that receives contact form submissions
   - **Example**: `info@casamisueno.com` or your personal email
   - **Note**: This is where you'll receive notifications about new inquiries

3. **RESEND_FROM_EMAIL** (Optional)
   - **Purpose**: Sender email address for outgoing emails
   - **Default**: `Casa Mi Sueño <onboarding@resend.dev>`
   - **For production**: Set up a custom domain in Resend and use your own email
   - **Example**: `Casa Mi Sueño <noreply@casamisueno.com>`

### How to Add Environment Variables in Netlify

1. Log in to your Netlify dashboard
2. Select your Casa Mi Sueño site
3. Go to **Site settings** → **Environment variables**
4. Click **Add a variable**
5. Add each variable with its key and value
6. Click **Save**
7. **Important**: Redeploy your site for changes to take effect

## Resend Setup

### Free Plan (Testing)
- You can use the default `onboarding@resend.dev` sender address
- Limited to 100 emails per day
- Suitable for testing

### Production Setup
1. **Add your domain to Resend**:
   - Go to Resend dashboard → Domains
   - Click "Add Domain"
   - Enter your domain (e.g., `casamisueno.com`)
   - Add the DNS records provided by Resend to your domain registrar

2. **Verify your domain**:
   - Wait for DNS propagation (can take up to 48 hours)
   - Resend will automatically verify your domain
   - Once verified, you can send from any email address on that domain

3. **Update RESEND_FROM_EMAIL**:
   - Set to your custom email, e.g., `Casa Mi Sueño <noreply@casamisueno.com>`
   - Redeploy your Netlify site

## Anti-Spam Features

The contact form includes several anti-spam measures:

### 1. Server-side Validation
- Email format validation
- Field length restrictions (name: 2-100 chars, message: 10-1000 chars)
- Required field checks

### 2. Rate Limiting
- Maximum 3 submissions per IP address per 5 minutes
- Returns 429 status code when limit exceeded
- Automatic cleanup of old rate limit entries

### 3. Honeypot Field
- Hidden field that bots typically fill but humans don't see
- If filled, the submission is silently accepted but no email is sent
- Field is positioned off-screen using CSS

### 4. Client-side Sanitization
- Uses DOMPurify to clean all user inputs
- Prevents XSS attacks and malicious content

## Email Templates

The function sends two emails for each submission:

### 1. Owner Notification Email
- Sent to ADMIN_EMAIL
- Contains all form data
- Reply-to is set to the submitter's email for easy response
- Subject includes submitter name and dates (for booking inquiries)

### 2. Guest Confirmation Email
- Sent to the form submitter
- Confirms receipt of their inquiry
- Includes summary of their submission
- Professional and welcoming tone

## Testing

### Local Testing
1. Install dependencies: `npm install`
2. Create a `.env` file with your test environment variables
3. Run locally with Netlify CLI: `netlify dev`
4. Test the form at `http://localhost:8888`

### Test Checklist
- [ ] General contact form submission
- [ ] Booking inquiry with dates
- [ ] Verify owner receives email
- [ ] Verify guest receives confirmation
- [ ] Test with invalid email
- [ ] Test with missing required fields
- [ ] Test rate limiting (submit 4+ times quickly)
- [ ] Test honeypot (use browser dev tools to fill hidden field)

## Troubleshooting

### Emails not being sent
1. Check that RESEND_API_KEY is correctly set in Netlify
2. Verify the API key is active in Resend dashboard
3. Check Netlify function logs for errors
4. Ensure ADMIN_EMAIL is valid

### Rate limiting issues
- Rate limits reset after 5 minutes
- Clear browser cache if testing repeatedly
- Use different browsers or incognito mode for testing

### Form validation errors
- Check browser console for detailed error messages
- Verify all required fields are filled
- Ensure dates are selected for booking inquiries

## Monitoring

### Netlify Function Logs
1. Go to Netlify dashboard → Functions
2. Click on `send-contact-email`
3. View recent invocations and logs
4. Check for errors or successful submissions

### Resend Dashboard
1. Log in to Resend
2. Go to Emails section
3. View sent emails and delivery status
4. Check for bounce or delivery failures

## Migration Notes

This contact form replaces the previous Supabase Edge Function implementation. Key differences:

- **No Supabase database logging**: Email is the primary notification method
- **Better Netlify integration**: Runs on the same platform as the site
- **Improved anti-spam**: Honeypot and rate limiting built-in
- **Same email provider**: Still uses Resend for delivery

If you need to add database logging back, you can:
1. Keep Supabase environment variables
2. Uncomment the database logging code in `netlify/functions/send-contact-email.ts`
3. Install `@supabase/supabase-js` if removed

## Support

For issues or questions:
- Check Netlify function logs
- Review Resend email logs
- Ensure environment variables are correctly set
- Verify DNS records if using custom domain

