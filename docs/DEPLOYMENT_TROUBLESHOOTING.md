# Deployment Troubleshooting Guide

## Common Issues

### Contact form not sending emails

**Likely Causes:**
1. **Missing RESEND_API_KEY** in Netlify environment variables
2. **Missing ADMIN_EMAIL** in Netlify environment variables
3. **Netlify Function not deployed** with latest changes

## Step-by-Step Fix

### 1. Check Netlify Environment Variables
In Netlify Dashboard → Site settings → Environment variables, ensure you have:
```bash
ADMIN_EMAIL=<your-admin-email>
RESEND_API_KEY=<your-resend-api-key>
```
> **Note:** Never commit real secret values. Set them only in the Netlify dashboard.

### 2. Get Resend API Key
1. Go to [Resend Dashboard](https://resend.com/api-keys)
2. Create an API key
3. Copy the key (starts with `re_`)

### 3. Test the Netlify Function
After deploying to Netlify, test the contact form on your live site or use the Netlify CLI locally:
```bash
netlify dev
# Then test the form at http://localhost:8888
```

## Alternative: Simplified Email Solution

If the Resend integration continues to fail, I can implement a simpler email solution using:
1. EmailJS (client-side)
2. Netlify Functions
3. Different email service

## Environment Variables Checklist

**Frontend (.env):**
- [x] VITE_GOOGLE_MAPS_API_KEY (public - Google Maps)
- [x] VITE_GOOGLE_SHEET_ID (public - Google Sheets)
- [x] VITE_GOOGLE_API_KEY (public - Google API)

**Backend (Netlify environment variables):**
- [ ] ADMIN_EMAIL
- [ ] RESEND_API_KEY

## Next Steps
1. Set up Resend API key in Netlify dashboard
2. Set ADMIN_EMAIL in Netlify dashboard
3. Deploy and test the booking form