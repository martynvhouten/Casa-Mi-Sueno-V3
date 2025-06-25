# Environment Variables Setup

## Required Environment Variables

### Frontend (.env file in project root)
Create a `.env` file with:

```bash
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### Backend (Supabase Edge Function Secrets)
In your Supabase dashboard → Edge Functions → Secrets, add:

```bash
ADMIN_EMAIL=your-email@domain.com
RESEND_API_KEY=your_resend_api_key
SUPABASE_URL=https://your-project-id.supabase.co  
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## How to Find Your Supabase Values

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to Settings → API
4. Copy:
   - **Project URL** → Use for `VITE_SUPABASE_URL` and `SUPABASE_URL`
   - **anon public** → Use for `VITE_SUPABASE_ANON_KEY`
   - **service_role** → Use for `SUPABASE_SERVICE_ROLE_KEY`

## Testing Environment Setup

Run this in browser console after starting dev server:
```javascript
console.log({
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
  hasAnonKey: !!import.meta.env.VITE_SUPABASE_ANON_KEY
});
```

## Common Issues

- **404 Error**: Wrong Supabase URL
- **401 Error**: Wrong anon key
- **Environment variables not loading**: Restart dev server after creating .env
- **Headers constructor error**: Usually indicates environment variables not loaded

## Next Steps

1. Create `.env` file with the values above
2. Restart your development server (`npm run dev`)
3. Try the booking form again
4. Check browser console for debug logs 