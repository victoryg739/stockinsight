# Price Alerts System Setup Guide

This guide will help you set up the price alerts system with email notifications and automated price checking.

## Email Configuration Options

### Option 1: Resend with Testing Domain (Recommended for Development)

This is the easiest option and requires no additional setup:

```bash
# Only need Resend API key
RESEND_API_KEY="your_resend_api_key"
```

The system is already configured to use `onboarding@resend.dev` which works out of the box.

### Option 2: Resend with Your Gmail Address

To use your Gmail address with Resend:

1. Go to [Resend Dashboard](https://resend.com/domains)
2. Click "Add Domain" or "Verify Email"
3. Add `qwerty7391999@gmail.com` as a verified sender
4. Follow Resend's verification process
5. Update the code to use your verified email:

```typescript
from: 'StockInsight Alerts <qwerty7391999@gmail.com>', // Your verified Gmail
```

### Option 3: Direct Gmail SMTP (Alternative)

To use Gmail SMTP directly instead of Resend:

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. **Add environment variables**:

```bash
# Gmail SMTP configuration
GMAIL_USER="qwerty7391999@gmail.com"
GMAIL_APP_PASSWORD="your_16_character_app_password"
```

4. **Update the code**:
   - Uncomment the Gmail function in the cron job
   - Replace the `sendAlertEmail` call with `sendAlertEmailWithGmail`
   - Add the nodemailer import

## Required Environment Variables

### For Resend (Current Setup):

```bash
RESEND_API_KEY="your_resend_api_key"
CRON_SECRET="your_secure_random_string_for_cron_jobs"
FINNHUB_API_KEY="your_finnhub_api_key"
NEXTAUTH_URL="http://localhost:3000"  # or your production URL
```

### For Gmail SMTP (Alternative):

```bash
GMAIL_USER="qwerty7391999@gmail.com"
GMAIL_APP_PASSWORD="your_16_character_app_password"
CRON_SECRET="your_secure_random_string_for_cron_jobs"
FINNHUB_API_KEY="your_finnhub_api_key"
NEXTAUTH_URL="http://localhost:3000"  # or your production URL
```

## Setup Steps

### For Resend (Current Setup)

1. Go to [Resend.com](https://resend.com)
2. Sign up for a free account
3. Create an API key in the dashboard
4. Add it to your environment variables as `RESEND_API_KEY`
5. The system will use `onboarding@resend.dev` automatically

### For Gmail SMTP (Alternative)

1. **Enable 2FA on Gmail**:
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Enable 2-Step Verification

2. **Generate App Password**:
   - In Security settings, go to "App passwords"
   - Select "Mail" and generate password
   - Copy the 16-character password

3. **Update Environment Variables**:

   ```bash
   GMAIL_USER="qwerty7391999@gmail.com"
   GMAIL_APP_PASSWORD="abcd efgh ijkl mnop"  # Your app password
   ```

4. **Update Code**:
   - Uncomment the Gmail function in `/api/cron/check-price-alerts/route.ts`
   - Replace `sendAlertEmail` with `sendAlertEmailWithGmail`
   - Uncomment the nodemailer import

### Generate Cron Secret

Generate a secure random string for the `CRON_SECRET`:

```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Deploy to Vercel

1. Push your code to your repository
2. Deploy to Vercel
3. Add the environment variables in your Vercel dashboard:
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add all the required variables

## Pros and Cons

### Resend (Recommended)

✅ **Pros**:

- Easy setup with testing domain
- Professional email service
- Good deliverability
- Free tier (3,000 emails/month)
- Built for developers

❌ **Cons**:

- Requires account signup
- Limited free tier

### Gmail SMTP

✅ **Pros**:

- Use your existing Gmail account
- No additional service needed
- Familiar sender address

❌ **Cons**:

- Requires app password setup
- Gmail sending limits (500 emails/day)
- Less professional for business use
- Potential deliverability issues

## Recommendation

For development and testing, I recommend using **Resend with the testing domain** (`onboarding@resend.dev`) as it's already configured and works out of the box.

For production, consider:

- **Resend with verified domain** for professional emails
- **Gmail SMTP** if you prefer using your existing email

## Testing

After configuration, test the email system:

1. Create a test alert
2. Click "Test Alerts" button
3. Check your email delivery
4. Verify the email content and styling

## Troubleshooting

### Gmail SMTP Issues

- Ensure 2FA is enabled
- Use app password, not regular password
- Check Gmail's sending limits
- Verify the app password is correct

### Resend Issues

- Check API key validity
- Verify domain/email verification status
- Check Resend dashboard for delivery logs

## Current Configuration

The system is currently set up to use **Resend with testing domain** (`onboarding@resend.dev`). This will work immediately once you add your `RESEND_API_KEY` to the environment variables.
