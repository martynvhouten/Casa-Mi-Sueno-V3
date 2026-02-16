# Environment Variables Setup

## Required Environment Variables

### Frontend (.env file in project root)
Create a `.env` file with:

```bash
VITE_GOOGLE_MAPS_API_KEY=<your-google-maps-api-key>
VITE_GOOGLE_SHEET_ID=<your-google-sheet-id>
VITE_GOOGLE_API_KEY=<your-google-api-key>
```

> **Note:** These are public client-side keys. They are embedded in the browser bundle by Vite.
> Never place server-only secrets (like `RESEND_API_KEY`) in the `.env` file with a `VITE_` prefix.

### Backend (Netlify Environment Variables)
In your Netlify dashboard → Site settings → Environment variables, add:

```bash
ADMIN_EMAIL=<your-admin-email>
RESEND_API_KEY=<your-resend-api-key>
```

> **Important:** Never commit real secret values to the repository.
> These variables are only accessible server-side in Netlify Functions via `process.env`.

## How to Find Your Google API Values

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Go to APIs & Services → Credentials
4. Copy:
   - **Maps API key** → Use for `VITE_GOOGLE_MAPS_API_KEY`
   - **Sheets API key** → Use for `VITE_GOOGLE_API_KEY`
5. Go to Google Sheets and copy the sheet ID from the URL → Use for `VITE_GOOGLE_SHEET_ID`

## Testing Environment Setup

Run this in browser console after starting dev server:
```javascript
console.log({
  hasMapsKey: !!import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  hasSheetId: !!import.meta.env.VITE_GOOGLE_SHEET_ID,
  hasApiKey: !!import.meta.env.VITE_GOOGLE_API_KEY
});
```

## Common Issues

- **Google Maps not loading**: Wrong or missing `VITE_GOOGLE_MAPS_API_KEY`
- **Booking dates not loading**: Wrong or missing `VITE_GOOGLE_SHEET_ID` or `VITE_GOOGLE_API_KEY`
- **Environment variables not loading**: Restart dev server after creating `.env`
- **Contact form errors**: Check that `RESEND_API_KEY` and `ADMIN_EMAIL` are set in Netlify dashboard

## Next Steps

1. Create `.env` file with the frontend values above
2. Set backend variables in Netlify dashboard
3. Restart your development server (`npm run dev`)
4. Test the booking form and contact form
