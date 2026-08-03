-- ============================================================================
-- SCWOP NGO Website — Complete Supabase Setup Script
-- ============================================================================
-- Run this ONCE on a fresh Supabase project (SQL Editor → New Query → Run)
-- After running, update your .env.local (or Vercel env vars) with the new
-- project's URL and keys, and the website will be fully functional.
-- ============================================================================


-- ############################################################################
-- PART 1: EXTENSIONS
-- ############################################################################

create extension if not exists "uuid-ossp";


-- ############################################################################
-- PART 2: TABLES
-- ############################################################################

-- 1. Editable text blocks & image URLs (hero headline, mission statement, etc.)
create table if not exists site_content (
  key text primary key,
  value text not null,
  updated_at timestamptz default now()
);

-- 2. Gallery images table
create table if not exists gallery_images (
  id uuid primary key default uuid_generate_v4(),
  image_url text not null,
  title text,
  description text,
  display_order integer default 0,
  created_at timestamptz default now()
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


-- ############################################################################
-- PART 3: ADMIN HELPER FUNCTION
-- ############################################################################

-- Returns true if the current JWT's email is in the admin_users table
create or replace function is_admin() returns boolean as $$
  select exists (
    select 1 from admin_users where email = auth.jwt() ->> 'email'
  );
$$ language sql security definer;


-- ############################################################################
-- PART 4: ROW LEVEL SECURITY (RLS)
-- ############################################################################

-- Enable RLS on all tables
alter table gallery_images enable row level security;
alter table site_content enable row level security;
alter table contact_messages enable row level security;
alter table admin_users enable row level security;

-- ---- site_content ----
drop policy if exists "public read content" on site_content;
create policy "public read content" on site_content
  for select using (true);

drop policy if exists "admin write content" on site_content;
create policy "admin write content" on site_content
  for all using (is_admin()) with check (is_admin());

-- ---- gallery_images ----
drop policy if exists "public read gallery" on gallery_images;
create policy "public read gallery" on gallery_images
  for select using (true);

drop policy if exists "admin write gallery" on gallery_images;
create policy "admin write gallery" on gallery_images
  for all using (is_admin()) with check (is_admin());

-- ---- contact_messages ----
drop policy if exists "public insert contact" on contact_messages;
create policy "public insert contact" on contact_messages
  for insert with check (true);

drop policy if exists "admin read contact" on contact_messages;
create policy "admin read contact" on contact_messages
  for select using (is_admin());

drop policy if exists "admin update contact" on contact_messages;
create policy "admin update contact" on contact_messages
  for update using (is_admin());

-- ---- admin_users ----
drop policy if exists "admin read admin_users" on admin_users;
create policy "admin read admin_users" on admin_users
  for select using (is_admin());


-- ############################################################################
-- PART 5: STORAGE BUCKET
-- ############################################################################

-- Create a public 'gallery' bucket for image uploads
insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true)
on conflict (id) do nothing;

-- Public can read/view images in the gallery bucket
drop policy if exists "Public Access to Gallery Bucket" on storage.objects;
create policy "Public Access to Gallery Bucket" on storage.objects
  for select using (bucket_id = 'gallery');

-- Only admins can upload/modify/delete images in the gallery bucket
drop policy if exists "Admin Access to Gallery Bucket" on storage.objects;
create policy "Admin Access to Gallery Bucket" on storage.objects
  for all using (bucket_id = 'gallery' and is_admin())
  with check (bucket_id = 'gallery' and is_admin());


-- ############################################################################
-- PART 6: SEED DATA — SITE CONTENT (all editable text & image URLs)
-- ############################################################################

insert into site_content (key, value) values

  -- Hero Section
  ('hero_title', 'Support for Children, Women and Older People (SCWOP)'),
  ('hero_tagline', 'Driving sustainable transformation and bringing lasting solutions for children, women, and the elderly through holistic care, strategic partnerships, and community empowerment.'),
  ('hero_cta_primary', 'Explore Our Programs'),
  ('hero_cta_secondary', 'Get Involved'),
  ('hero_image_url', '/Children%20gathered%20and%20standing%20together.JPG'),

  -- Impact Stats
  ('stat_1_number', '1,100+'),
  ('stat_1_label', 'Elders Provided Monthly Cash Transfers'),
  ('stat_2_number', '130+'),
  ('stat_2_label', 'Orphan & Vulnerable Children (OVC) Supported'),
  ('stat_3_number', '6+'),
  ('stat_3_label', 'Key Project Interventions Active'),
  ('stat_4_number', '100%'),
  ('stat_4_label', 'Dignified & Non-Discriminatory Service'),

  -- Mission & CTA Banner
  ('mission_excerpt_title', 'Our Holistic Community Mandate'),
  ('mission_excerpt_body', 'SCWOP works hand in hand with local communities, government bodies, and key stakeholders to deliver direct relief—from healthcare and cash transfers to home repairs and income-generating seed capital—ensuring children, mothers, and elders thrive with dignity.'),
  ('cta_banner_title', 'Join SCWOP in Driving Sustainable Community Transformation'),
  ('cta_banner_subtitle', 'Partner with us to protect vulnerable children, empower women, and honor our senior citizens across every community we serve.'),

  -- About Page
  ('about_mission', 'To bring about lasting solutions for children, women, and the elderly by providing holistic support and addressing their specific needs, through strategic partnerships with the community, government, and relevant stakeholders.'),
  ('about_vision', 'To be a robust and impactful organization that drives sustainable and positive transformation in the lives of the community.'),
  ('about_founding_story', 'Established in 2001, this indigenous non-governmental organization was founded by a passionate team of five individuals with a mission to support 30 vulnerable people. Over the years, the organization navigated and overcame numerous operational and financial hurdles. A significant turning point came when they secured partnership with an international donor, boosting their capacity. Today, the organization has scaled its impact significantly, providing essential care, shelter, and support to 1,100 elderly individuals and 130 children in need.'),
  ('about_founding_image_url', '/Founders%20giving%20speach.JPG'),
  ('ovc_section_image_url', '/Children%20gathered%20and%20standing%20together.JPG'),

  -- Strategic Objectives
  ('objective_1_title', 'Elderly Care & Well-being'),
  ('objective_1_desc', 'To provide elderly individuals with love, comprehensive care, and essential basic needs, ensuring they spend their remaining years in dignity.'),
  ('objective_2_title', 'Economic Empowerment'),
  ('objective_2_desc', 'To transition the elderly away from begging by fostering self-reliance, enabling them to sustainably support themselves and their families.'),
  ('objective_3_title', 'Educational Support for OVC'),
  ('objective_3_desc', 'To empower the grandchildren of the elderly by providing access to high-quality education, equipping them to become supportive pillars for their families and impactful citizens for their country.'),

  -- Success Story 1: Home Renovation
  ('story_renovation_title', 'Elderly Home Renovation'),
  ('story_renovation_tagline', 'Restoring dignity and safety for vulnerable seniors'),
  ('story_renovation_desc', 'Restoring dignity and safety by transforming the living homes of vulnerable Elders. SCWOP rehabilitates dilapidated structures, repairs roofs, installs hygienic sanitation facilities, and creates safe, weather-proof living environments.'),
  ('story_renovation_image_url', '/Eldery%20walking%20into%20a%20room.JPG'),

  -- Success Story 2: Eye Care
  ('story_eyecare_title', 'Elderly Eye Care Services'),
  ('story_eyecare_tagline', 'Restoring vision and hope through medical intervention'),
  ('story_eyecare_desc', 'Restoring vision and hope through life-changing cataract surgeries and comprehensive eye exams. SCWOP partners with medical specialists to provide free screenings, prescription eyeglasses, and surgical procedures for elderly community members.'),
  ('story_eyecare_image_url', '/Elderly%20sitting%20together.JPG'),

  -- Success Story 3: Medical Equipment
  ('story_mobility_title', 'Medical Equipment Distribution'),
  ('story_mobility_tagline', 'Enhancing mobility and independence for bedridden & disabled elders'),
  ('story_mobility_desc', 'Enhancing mobility and independence by providing essential aids like wheelchairs, crutches, and blind canes. This initiative enables senior citizens to navigate their homes and communities with confidence and minimal physical assistance.'),
  ('story_mobility_image_url', '/Elderly%20standing%20together.JPG'),

  -- Success Story 4: IGA Livelihoods
  ('story_livelihood_title', 'Income-Generating Activities (IGA)'),
  ('story_livelihood_tagline', 'Empowering individuals to achieve financial independence'),
  ('story_livelihood_desc', 'Empowering individuals and families to build sustainable livelihoods and achieve financial independence. SCWOP provides seed capital, micro-enterprise training, and ongoing mentorship to transition vulnerable households away from begging toward self-reliance.'),
  ('story_livelihood_image_url', '/Founders%20giving%20speach.JPG'),

  -- Contact Info
  ('contact_address', 'Subcity Limi kura woreda 10 around Semit Fiyel Bet, Addis Ababa'),
  ('contact_phone', '+251 11 662 8613 / 14 | +251 91 140 6118'),
  ('contact_email', 'scwop2019@gmail.com'),
  ('contact_hours', 'Monday - Friday: 8:30 AM - 5:30 PM'),
  ('contact_map_url', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.5902397164677!2d38.8499572737006!3d9.009798491050788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b9a8e058e429d%3A0x222a2b149db3b13a!2sSummit%20Fiyel%20Bet!5e0!3m2!1sen!2set!4v1785753524675!5m2!1sen!2set')

on conflict (key) do update set value = excluded.value;


-- ############################################################################
-- PART 7: SEED DATA — GALLERY IMAGES
-- ############################################################################

insert into gallery_images (image_url, title, description, display_order) values
  ('/Founders%20giving%20speach.JPG',
   'SCWOP Leadership & Community Speech',
   'SCWOP leadership addressing community members and partners during an organizational milestone gathering.',
   1),
  ('/Children%20gathered%20and%20standing%20together.JPG',
   'Orphan & Vulnerable Children (OVC) Support',
   'Children receiving educational materials, tuition care, and seasonal clothing support in the community.',
   2),
  ('/Elderly%20sitting%20together.JPG',
   'Monthly Elderly Care & Fellowship',
   'Beneficiary elders gathered during monthly cash transfer and nutritional support distribution.',
   3),
  ('/Elderly%20standing%20together.JPG',
   'Senior Community Members Gathering',
   'Honoring elderly community members as part of SCWOP''s holistic care and dignified support initiatives.',
   4),
  ('/Eldery%20walking%20into%20a%20room.JPG',
   'Healthcare & Home Renovation Visits',
   'Social workers and volunteers providing medical follow-ups and home rehabilitation checkups for elders.',
   5)
on conflict do nothing;


-- ############################################################################
-- PART 8: SEED DATA — ADMIN USERS
-- ############################################################################
-- IMPORTANT: After running this script, you must ALSO create these users
-- in Supabase Authentication (Dashboard → Authentication → Users → Add User)
-- with the same email and a secure password. The table below only authorizes
-- the email — the Auth user must exist separately for login to work.

insert into admin_users (email) values
  ('scwop2019@gmail.com'),
  ('admin@scwop.org')
on conflict (email) do nothing;


-- ############################################################################
-- DONE! Next steps:
-- ############################################################################
-- 1. Go to Supabase Dashboard → Authentication → Users → Add User
--    Create a user with email: scwop2019@gmail.com and a secure password
--
-- 2. Copy your Supabase project URL and anon key from:
--    Supabase Dashboard → Settings → API
--
-- 3. Set these environment variables in your .env.local file (local dev)
--    or in Vercel → Project Settings → Environment Variables (production):
--
--    NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
--    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
--
-- 4. Start the dev server: npm run dev
--    Or redeploy on Vercel if in production
-- ############################################################################
