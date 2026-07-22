-- SCWOP NGO Supabase Database Schema & RLS Setup

create extension if not exists "uuid-ossp";

-- 1. Gallery images table
create table if not exists gallery_images (
  id uuid primary key default uuid_generate_v4(),
  image_url text not null,
  title text,
  description text,
  display_order integer default 0,
  created_at timestamptz default now()
);

-- 2. Editable text blocks (hero headline, mission statement, etc.)
create table if not exists site_content (
  key text primary key,
  value text not null,
  updated_at timestamptz default now()
);

-- 3. Contact form submissions
create table if not exists contact_messages (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  message text not null,
  is_read boolean default false,
  created_at timestamptz default now()
);

-- 4. Allow-list of admin emails
create table if not exists admin_users (
  email text primary key,
  created_at timestamptz default now()
);

-- Helper: is the current JWT's email an admin?
create or replace function is_admin() returns boolean as $$
  select exists (
    select 1 from admin_users where email = auth.jwt() ->> 'email'
  );
$$ language sql security definer;

-- Enable Row Level Security
alter table gallery_images enable row level security;
alter table site_content enable row level security;
alter table contact_messages enable row level security;
alter table admin_users enable row level security;

-- Policies for gallery_images
drop policy if exists "public read gallery" on gallery_images;
create policy "public read gallery" on gallery_images for select using (true);

drop policy if exists "admin write gallery" on gallery_images;
create policy "admin write gallery" on gallery_images for all using (is_admin()) with check (is_admin());

-- Policies for site_content
drop policy if exists "public read content" on site_content;
create policy "public read content" on site_content for select using (true);

drop policy if exists "admin write content" on site_content;
create policy "admin write content" on site_content for all using (is_admin()) with check (is_admin());

-- Policies for contact_messages
drop policy if exists "public insert contact" on contact_messages;
create policy "public insert contact" on contact_messages for insert with check (true);

drop policy if exists "admin read contact" on contact_messages;
create policy "admin read contact" on contact_messages for select using (is_admin());

drop policy if exists "admin update contact" on contact_messages;
create policy "admin update contact" on contact_messages for update using (is_admin());

-- Policies for admin_users (Admins can view admin list)
drop policy if exists "admin read admin_users" on admin_users;
create policy "admin read admin_users" on admin_users for select using (is_admin());

-- Storage Bucket Setup for 'gallery'
insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true)
on conflict (id) do nothing;

drop policy if exists "Public Access to Gallery Bucket" on storage.objects;
create policy "Public Access to Gallery Bucket" on storage.objects
  for select using (bucket_id = 'gallery');

drop policy if exists "Admin Access to Gallery Bucket" on storage.objects;
create policy "Admin Access to Gallery Bucket" on storage.objects
  for all using (bucket_id = 'gallery' and is_admin())
  with check (bucket_id = 'gallery' and is_admin());
