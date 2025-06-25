# Deployment Troubleshooting Guide

## Current Issue
Error: `"P.Headers is not a constructor"` coming from Supabase Edge Function

## Likely Causes
1. **Missing RESEND_API_KEY** in Supabase Edge Function secrets
2. **Outdated Resend library** causing compatibility issues
3. **Edge Function not deployed** with latest changes

## Step-by-Step Fix

### 1. Check Edge Function Secrets
In Supabase Dashboard → Edge Functions → Secrets, ensure you have:
```bash
ADMIN_EMAIL=your-email@domain.com
RESEND_API_KEY=re_your_actual_key_here
SUPABASE_URL=https://obgguwoebrabzmwfdaci.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 2. Get Resend API Key
1. Go to [Resend Dashboard](https://resend.com/api-keys)
2. Create an API key
3. Copy the key (starts with `re_`)

### 3. Deploy Edge Function
```bash
# Install Supabase CLI if not installed
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref obgguwoebrabzmwfdaci

# Deploy the edge function
supabase functions deploy send-booking-email
```

### 4. Test the Function Directly
```bash
# Test with curl
curl -X POST 'https://obgguwoebrabzmwfdaci.supabase.co/functions/v1/send-booking-email' \
  -H 'Authorization: Bearer YOUR_ANON_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "1234567890",
    "numberOfGuests": 2,
    "message": "Test booking",
    "startDate": "2024-01-15T00:00:00.000Z",
    "endDate": "2024-01-17T00:00:00.000Z"
  }'
```

## Alternative: Simplified Email Solution

If the Resend integration continues to fail, I can implement a simpler email solution using:
1. EmailJS (client-side)
2. Netlify Functions
3. Different email service

## Environment Variables Checklist

**Frontend (.env):**
- [x] VITE_SUPABASE_URL ✅
- [x] VITE_SUPABASE_ANON_KEY ✅

**Backend (Supabase Secrets):**
- [ ] ADMIN_EMAIL ❓
- [ ] RESEND_API_KEY ❓ 
- [ ] SUPABASE_URL ❓
- [ ] SUPABASE_SERVICE_ROLE_KEY ❓

## Next Steps
1. Set up Resend API key
2. Deploy the Edge Function
3. Test the booking form again 