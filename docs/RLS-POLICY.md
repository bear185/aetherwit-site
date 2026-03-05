# Supabase Row Level Security (RLS) Policy Guide

> This document outlines the required Row Level Security policies for the Aetherwit site to ensure data safety.

## Required Tables & Policies

### 1. `profiles` Table

The `profiles` table stores user profile data.

**Required Policies:**

```sql
-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Users can insert their own profile (or use a trigger)
CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);
```

### 2. `beta_signups` Table

Stores beta signup requests. Public insert, admin read.

**Required Policies:**

```sql
ALTER TABLE beta_signups ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a beta signup (rate limited by Server Action)
CREATE POLICY "Public can insert beta_signups" ON beta_signups
  FOR INSERT
  WITH CHECK (true);

-- Only authenticated users (or service role) can read
CREATE POLICY "Service/Admin can read beta_signups" ON beta_signups
  FOR SELECT
  USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- No one can update or delete
CREATE POLICY "No delete beta_signups" ON beta_signups
  FOR DELETE
  USING (false);
```

### 3. `contact_messages` Table

Stores contact form submissions. Public insert, admin read.

**Required Policies:**

```sql
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a contact message
CREATE POLICY "Public can insert contact_messages" ON contact_messages
  FOR INSERT
  WITH CHECK (true);

-- Only authenticated users can read
CREATE POLICY "Service/Admin can read contact_messages" ON contact_messages
  FOR SELECT
  USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- No one can update or delete
CREATE POLICY "No delete contact_messages" ON contact_messages
  FOR DELETE
  USING (false);
```

## Notes

- The Server Actions (`submitBetaSignup`, `submitContactMessage`, `createUserProfile`) use the `service_role` context internally via Supabase Admin to bypass RLS when needed for inserts, but enforce validation in application code.
- For production, consider using Supabase Edge Functions for sensitive operations instead of client-side inserts.
