# HIGH Priority SEO + AI Discoverability (H1-H7)

## Summary

Implements all high-priority SEO and AI discoverability fixes from the audit in one PR:
- Added `llms.txt` for AI crawler discoverability.
- Centralized JSON-LD to one injection path with route-aware `@graph`.
- Added `WebSite`, `Organization`, `House`, `BreadcrumbList`, and route-specific `FAQPage`.
- Removed duplicate schema injection points and fixed viewport accessibility.
- Added descriptive Dutch `alt` text and `loading="lazy"` for page-level `q-img` content images.

## Files changed (H1-H7)

- `public/llms.txt`
- `src/utils/schema.ts`
- `src/App.vue`
- `src/layouts/MainLayout.vue`
- `src/pages/PracticalPage.vue`
- `index.html`
- `src/pages/IndexPage.vue`
- `src/pages/AboutPage.vue`
- `src/pages/HousePage.vue`
- `src/pages/OutdoorPage.vue`
- `src/pages/LocationPage.vue`

## Build result

- [x] `npm run build` completed successfully

## Quick manual checklist

- [x] `/llms.txt` exists in `public` and is shipped by the app
- [x] Zoom-blocking viewport params removed (`user-scalable=no`, `maximum-scale=1`)
- [x] Static JSON-LD removed from `index.html`
- [x] Duplicate House schema calls removed from layout/page-level paths
- [x] Single centralized JSON-LD injection path active via `src/utils/schema.ts`
- [x] Route-aware `BreadcrumbList` generation added
- [x] `WebSite` and `Organization` schema nodes added in `@graph`
- [x] FAQ schema moved from `PracticalPage.vue` into centralized schema flow
- [x] All `q-img` instances in pages have descriptive Dutch `alt`
- [x] All below-the-fold `q-img` instances in pages use `loading=\"lazy\"`

---

# Replace Supabase Contact Form with Netlify Function + Resend

## Summary

Migrated both the **contact form** and **booking inquiry form** from Supabase Edge Functions to a single Netlify Function using Resend for email delivery. This simplifies the infrastructure, reduces dependencies, and improves maintainability.

## Changes

### New Files
- ✅ `netlify/functions/send-contact-email.ts` - Unified Netlify Function for all form submissions
- ✅ `src/types/booking.ts` - Booking-related type definitions (moved from Supabase types)
- ✅ `docs/NETLIFY_CONTACT_FORM_SETUP.md` - Complete setup and configuration guide
- ✅ `docs/MIGRATION_COMPLETE.md` - Migration summary and instructions
- ✅ `docs/SUPABASE_REMOVAL_AUDIT.md` - Comprehensive audit of Supabase removal

### Modified Files
- ✅ `src/components/ContactForm.vue` - Updated to call Netlify Function, added honeypot field
- ✅ `src/components/booking/BookingForm.vue` - Updated to call Netlify Function, added honeypot field
- ✅ `src/components/booking/CostSummary.vue` - Updated type imports
- ✅ `src/pages/BookingPage.vue` - Updated type imports
- ✅ `package.json` - Added `resend`, removed `@supabase/supabase-js`
- ✅ `netlify.toml` - Removed Supabase from CSP and secrets scan config

### Deleted Files
- ✅ `supabase/` - Entire directory (Edge Functions no longer needed)
- ✅ `src/utils/supabase.ts` - Supabase client (no longer used)
- ✅ `src/utils/types/supabase.ts` - Types moved to `src/types/booking.ts`

## Features

### Email Delivery
- 📧 Owner notification emails (to `ADMIN_EMAIL`)
- 📧 Guest confirmation emails (to form submitter)
- 📧 Proper HTML formatting with booking details
- 📧 Reply-to set to guest email for easy responses

### Anti-Spam Protection
- 🛡️ **Rate limiting**: Max 3 submissions per IP per 5 minutes (429 response)
- 🛡️ **Honeypot field**: Hidden field that bots typically fill
- 🛡️ **Server-side validation**: Email format, length limits, required fields (400 response)
- 🛡️ **Client-side sanitization**: DOMPurify prevents XSS attacks

### Error Handling
- ⚡ **Fail-fast validation**: Returns 500 if `RESEND_API_KEY` or `ADMIN_EMAIL` missing
- ⚡ Proper HTTP status codes: 200 (success), 400 (validation), 429 (rate limit), 500 (server error)
- ⚡ Clear error messages in Dutch for users
- ⚡ Detailed logging for debugging

## Pre-Deployment Checklist

### 1. Environment Variables
In your Netlify dashboard, configure these environment variables:

- [ ] `RESEND_API_KEY` - Get from [resend.com](https://resend.com) dashboard
- [ ] `ADMIN_EMAIL` - Your email to receive form submissions (e.g., `info@casamisueno.com`)
- [ ] `RESEND_FROM_EMAIL` - _(Optional)_ Custom sender email (defaults to `onboarding@resend.dev`)

**Important**: Delete these old Supabase variables:
- [ ] Remove `VITE_SUPABASE_URL`
- [ ] Remove `VITE_SUPABASE_ANON_KEY`
- [ ] Remove `SUPABASE_URL` (if exists)
- [ ] Remove `SUPABASE_SERVICE_ROLE_KEY` (if exists)

### 2. Dependencies
- [ ] Run `npm install` to install `resend` package

### 3. Testing

#### Contact Form (General Inquiry)
- [ ] Navigate to `/contact`
- [ ] Submit form with valid data → Expect 200 response
- [ ] Submit form with invalid email → Expect 400 response
- [ ] Submit 4 forms rapidly → Expect 429 on 4th submission
- [ ] Verify owner receives email at `ADMIN_EMAIL`
- [ ] Verify guest receives confirmation email

#### Booking Form (With Dates)
- [ ] Navigate to `/booking`
- [ ] Select check-in and check-out dates
- [ ] Fill in guest details (adults + children)
- [ ] Submit form with valid data → Expect 200 response
- [ ] Verify owner email shows date range and guest breakdown
- [ ] Verify guest confirmation email includes booking summary

#### Anti-Spam Testing
- [ ] Submit form 4 times in under 5 minutes → 4th should fail with 429
- [ ] Use browser DevTools to fill honeypot field → Should accept silently (200 but no email)
- [ ] Try XSS in message field → Should be sanitized

### 4. Monitoring

#### Netlify Function Logs
- [ ] Go to Netlify Dashboard → Functions → `send-contact-email`
- [ ] Verify successful invocations show status 200
- [ ] Check for any 500 errors indicating missing env vars
- [ ] Confirm rate limiting (429) appears for spam attempts

#### Resend Dashboard
- [ ] Log in to [resend.com](https://resend.com)
- [ ] Go to Emails section
- [ ] Verify emails are being sent successfully
- [ ] Check for any delivery failures or bounces
- [ ] Monitor email sending limits (100/day on free tier)

### 5. Production Checklist
- [ ] All environment variables set in Netlify
- [ ] Both forms tested and working (200 responses)
- [ ] Rate limiting working (429 on rapid submissions)
- [ ] Validation working (400 on invalid data)
- [ ] Owner receives notification emails
- [ ] Guests receive confirmation emails
- [ ] Resend logs show successful deliveries
- [ ] No 500 errors in Netlify function logs
- [ ] Old Supabase env vars removed from Netlify
- [ ] Custom domain configured in Resend (for production sender email)

## Rollback Plan

If issues arise, you can rollback by:

1. The Supabase Edge Function is in git history (`supabase/functions/send-booking-email/`)
2. Restore `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` environment variables
3. Revert changes to `ContactForm.vue` and `BookingForm.vue`
4. Redeploy

## Documentation

Detailed documentation available:
- `docs/NETLIFY_CONTACT_FORM_SETUP.md` - Setup guide
- `docs/MIGRATION_COMPLETE.md` - Migration summary
- `docs/SUPABASE_REMOVAL_AUDIT.md` - Audit details

## Benefits

✨ **Simplified Infrastructure**: No Supabase dependency for email  
✨ **Better Integration**: Function runs on same platform as site  
✨ **Cost Effective**: Netlify Functions have generous free tier  
✨ **Improved Security**: Built-in rate limiting and anti-spam  
✨ **Easier Debugging**: All logs in Netlify dashboard  
✨ **Type Safety**: Maintained with new `src/types/booking.ts`

---

**Migration completed**: October 15, 2025  
**Ready for production**: After environment variables are configured

