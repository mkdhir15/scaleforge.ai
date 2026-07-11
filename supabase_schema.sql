-- ScaleForge.AI — Contact Submissions Table
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New Query)

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

-- Allow anonymous inserts (website visitors submit without auth)
CREATE POLICY "Allow anonymous inserts"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Only authenticated users (you, via dashboard) can read submissions
CREATE POLICY "Only authenticated users can read"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);
