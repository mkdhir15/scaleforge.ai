# ScaleForge.AI — Contact Form Setup Guide

The contact form uses **two services** running in parallel:
1. **Supabase** (free tier) — saves every lead to a PostgreSQL database
2. **EmailJS** (free tier) — sends a notification email to mkdhirsystems@gmail.com

Both are optional during development (the form will simulate success if unconfigured), but **both must be set up for production**.

---

## Step 1: Supabase Setup (Database Persistence)

### 1a. Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and sign up (free tier = 2 projects, 500MB database).
2. Click **New Project**, name it `scaleforge-ai`, set a database password, choose a region close to your audience.
3. Wait for the project to finish provisioning (~2 minutes).

### 1b. Create the Database Table
1. In your Supabase dashboard, go to **SQL Editor**.
2. Run this SQL:

```sql
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  message TEXT NOT NULL,
  service_interested TEXT
);

-- Enable Row Level Security (required by Supabase)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (the website visitor submits without auth)
CREATE POLICY "Allow anonymous inserts"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Only you (authenticated) can read the data
CREATE POLICY "Only authenticated users can read"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);
```

### 1c. Get Your API Keys
1. Go to **Settings → API** in your Supabase dashboard.
2. Copy:
   - **Project URL** → this is `VITE_SUPABASE_URL`
   - **anon public** key → this is `VITE_SUPABASE_ANON_KEY`

---

## Step 2: EmailJS Setup (Email Notifications)

### 2a. Create an EmailJS Account
1. Go to [emailjs.com](https://emailjs.com) and sign up (free tier = 200 emails/month).
2. Verify your email address.

### 2b. Add an Email Service
1. In the EmailJS dashboard, go to **Email Services → Add New Service**.
2. Choose **Gmail** (or whichever provider you want the notification sent FROM).
3. Connect it and note the **Service ID** (e.g., `service_abc123`).

### 2c. Create an Email Template
1. Go to **Email Templates → Create New Template**.
2. Set up the template like this:

**To email:** `mkdhirsystems@gmail.com`  
**From name:** `ScaleForge.AI Contact Form`  
**Subject:** `New Lead: {{from_name}} — {{service}}`  
**Body:**
```
New contact form submission from ScaleForge.AI website:

Name: {{from_name}}
Email: {{from_email}}
Company: {{company}}
Service Interested: {{service}}

Message:
{{message}}

---
Reply directly to: {{from_email}}
```

3. Click **Save** and note the **Template ID** (e.g., `template_xyz789`).

### 2d. Get Your Public Key
1. Go to **Account → General** in EmailJS.
2. Copy your **Public Key** (e.g., `user_AbCdEfGhIjKlMn`).

---

## Step 3: Add Environment Variables

Create a `.env` file in the project root (or rename `.env.example`):

```env
# Supabase (database persistence)
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# EmailJS (email notifications)  
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
VITE_EMAILJS_PUBLIC_KEY=user_AbCdEfGhIjKlMn
```

> **Important:** Never commit `.env` to git. The `.gitignore` should already exclude it.

---

## Step 4: Test

1. Restart the dev server: `npm run dev`
2. Go to `/contact` and submit a test message.
3. Verify:
   - ✅ The form shows "Message sent!" 
   - ✅ Check Supabase dashboard → **Table Editor → contact_submissions** — your lead should be there
   - ✅ Check mkdhirsystems@gmail.com inbox — you should have a notification email

---

## How It Works

On form submit, the frontend fires **both** requests in parallel:

```
User submits form
  ├─→ Supabase REST API (PostgREST) → INSERT into contact_submissions
  └─→ EmailJS API → sends email to mkdhirsystems@gmail.com
```

- If **both succeed**: user sees success message.
- If **one fails**: the other still completes; a console warning is logged.
- If **both fail**: user sees an error message asking them to email directly.
- If **neither is configured**: form simulates success (dev mode only).

---

## Production Deployment (Vercel)

When deploying to Vercel:
1. Go to your Vercel project → **Settings → Environment Variables**.
2. Add all 5 variables listed above.
3. Redeploy.

The `VITE_` prefix ensures Vite includes them in the client bundle — this is safe for:
- `VITE_SUPABASE_URL` (public endpoint)
- `VITE_SUPABASE_ANON_KEY` (public key, rate-limited by Supabase)
- `VITE_EMAILJS_*` (public keys, rate-limited by EmailJS)

No server-side secrets are exposed.
