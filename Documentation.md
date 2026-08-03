# SCWOP NGO Website — Developer Documentation

> **Support for Children, Women and Older People (SCWOP)**
> Full-stack Next.js website with Supabase backend and Vercel deployment.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Getting Started](#3-getting-started)
4. [Environment Variables](#4-environment-variables)
5. [Project Structure](#5-project-structure)
6. [Database (Supabase)](#6-database-supabase)
7. [Authentication & Admin Access](#7-authentication--admin-access)
8. [Public Pages](#8-public-pages)
9. [Admin Dashboard](#9-admin-dashboard)
10. [Reusable Components](#10-reusable-components)
11. [Service Layer](#11-service-layer)
12. [Content Management System (CMS)](#12-content-management-system-cms)
13. [Image Management](#13-image-management)
14. [Contact Form](#14-contact-form)
15. [SEO & Metadata](#15-seo--metadata)
16. [Styling & Design System](#16-styling--design-system)
17. [Deployment (Vercel)](#17-deployment-vercel)
18. [Common Tasks & Recipes](#18-common-tasks--recipes)
19. [Troubleshooting](#19-troubleshooting)

---

## 1. Project Overview

This is the official website for **SCWOP**, an indigenous NGO based in **Addis Ababa, Ethiopia** (est. 2001). The site serves as a public-facing platform to showcase the organization's mission, programs, success stories, and community impact. It includes a full admin dashboard for content management.

### What the website does:
- **Public website** — Home, About Us, Photo Gallery, Contact pages
- **Admin dashboard** — Authenticated staff portal for editing site text, uploading images, managing gallery photos, and reading contact form submissions
- **CMS** — All text content and images on the site are editable from the admin dashboard without touching code
- **Contact form** — Public visitors can send messages that are stored in the database and viewable by admins

---

## 2. Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Framework** | Next.js (App Router) | 16.2.11 |
| **Language** | TypeScript | 5.x |
| **UI Library** | React | 19.2.4 |
| **Styling** | Tailwind CSS | 4.x |
| **Animation** | GSAP (GreenSock) | 3.15.0 |
| **Database & Auth** | Supabase (PostgreSQL + Auth) | @supabase/supabase-js 2.110.8 |
| **SSR Auth** | @supabase/ssr | 0.12.3 |
| **Hosting** | Vercel | — |
| **Image Storage** | Supabase Storage (`gallery` bucket) | — |

---

## 3. Getting Started

### Prerequisites
- **Node.js** >= 18.x
- **npm** (comes with Node.js)
- A **Supabase** project (free tier works fine)

### Installation

```bash
# 1. Clone the repository
git clone <repo-url>
cd NGO-Website

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.local.example .env.local
# Then edit .env.local with your Supabase credentials (see Section 4)

# 4. Set up the database
# Go to your Supabase project -> SQL Editor
# Run supabase/schema.sql first, then supabase/seed.sql

# 5. Create an admin user in Supabase Auth
# Go to Supabase Dashboard -> Authentication -> Users -> Add User
# Email: scwop2019@gmail.com, Password: (choose a secure password)

# 6. Start the dev server
npm run dev
# Opens at http://localhost:3000
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (http://localhost:3000) |
| `npm run build` | Create optimized production build |
| `npm start` | Serve production build locally |
| `npm run lint` | Run ESLint code checks |

---

## 4. Environment Variables

Create a `.env.local` file in the project root (never commit this file):

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

**Where to find these values:**
1. Go to your Supabase project dashboard
2. Click **Settings** then **API**
3. Copy the **Project URL**, **anon/public** key, and **service_role** key

**For Vercel deployment:** Add these same variables in Vercel Project Settings under Environment Variables.

**Optional:** `NEXT_PUBLIC_SITE_URL` — set to your production domain (e.g. `https://scwop.org`) for SEO canonical URLs and sitemap generation.

---

## 5. Project Structure

```
NGO-Website/
|-- public/                          # Static assets (images, logo, favicon)
|   |-- Logo.png                     # Organization logo
|   |-- Logo.ico                     # Favicon
|   |-- Children gathered and standing together.JPG
|   |-- Elderly sitting together.JPG
|   |-- Elderly standing together.JPG
|   |-- Eldery walking into a room.JPG
|   +-- Founders giving speach.JPG
|
|-- src/
|   |-- app/                         # Next.js App Router pages
|   |   |-- layout.tsx               # Root layout (fonts, metadata, JSON-LD, Navbar, Footer)
|   |   |-- page.tsx                 # Home page (/)
|   |   |-- globals.css              # Global styles and Tailwind design tokens
|   |   |-- sitemap.ts               # Dynamic XML sitemap generator
|   |   |-- robots.ts                # Search engine crawler directives
|   |   |-- manifest.ts              # PWA web app manifest
|   |   |-- HomeGalleryPreview.tsx    # Gallery preview carousel for home page
|   |   |
|   |   |-- about/
|   |   |   +-- page.tsx             # About Us page (/about)
|   |   |
|   |   |-- gallery/
|   |   |   |-- page.tsx             # Gallery page (/gallery) - server component
|   |   |   |-- GalleryGridClient.tsx # Client-side masonry grid with filters
|   |   |   +-- Lightbox.tsx         # Full-screen image lightbox modal
|   |   |
|   |   |-- contact/
|   |   |   |-- page.tsx             # Contact page (/contact) - server component
|   |   |   +-- ContactForm.tsx      # Client-side contact form with validation
|   |   |
|   |   +-- admin/
|   |       |-- layout.tsx           # Admin dashboard shell (sidebar, topbar, auth guard)
|   |       |-- page.tsx             # Admin overview dashboard (/admin)
|   |       |-- login/
|   |       |   +-- page.tsx         # Admin login page (/admin/login)
|   |       |-- content/
|   |       |   +-- page.tsx         # Site content and image editor (/admin/content)
|   |       |-- gallery/
|   |       |   +-- page.tsx         # Gallery image manager (/admin/gallery)
|   |       +-- messages/
|   |           +-- page.tsx         # Contact messages inbox (/admin/messages)
|   |
|   |-- components/
|   |   |-- layout/
|   |   |   |-- Navbar.tsx           # Site-wide navigation bar
|   |   |   +-- Footer.tsx           # Site-wide footer with links and contact info
|   |   |
|   |   +-- ui/
|   |       |-- ScrollReveal.tsx     # Scroll-triggered animation wrapper (GSAP)
|   |       |-- EmbraceMotif.tsx     # Decorative SVG background patterns
|   |       |-- ImpactGraphicsHub.tsx # Animated donut chart and community estimator
|   |       +-- SuccessStoriesSection.tsx # Interactive success stories showcase
|   |
|   |-- lib/
|   |   |-- supabase/
|   |   |   |-- client.ts            # Browser-side Supabase client (createBrowserClient)
|   |   |   |-- server.ts            # Server-side Supabase client (createServerClient)
|   |   |   +-- middleware.ts        # Supabase auth session refresh middleware
|   |   |
|   |   |-- services/
|   |   |   |-- content.ts           # Site content CRUD + image upload helper
|   |   |   |-- gallery.ts           # Gallery images CRUD + storage upload
|   |   |   +-- contact.ts           # Contact messages CRUD + honeypot validation
|   |   |
|   |   +-- types/
|   |       +-- database.ts          # TypeScript interfaces for all DB tables
|   |
|   +-- middleware.ts                # Next.js middleware entry (delegates to Supabase)
|
|-- supabase/
|   |-- schema.sql                   # Full database schema + RLS policies + storage bucket
|   +-- seed.sql                     # Default content data, gallery images, admin emails
|
|-- .env.local.example               # Template for environment variables
|-- package.json                     # Dependencies and scripts
|-- tsconfig.json                    # TypeScript configuration
+-- Documentation.md                 # This file
```

---

## 6. Database (Supabase)

### Tables

The database has **4 tables**, all defined in `supabase/schema.sql`:

#### `site_content`
Stores all editable text and image URLs for the website.

| Column | Type | Description |
|--------|------|-------------|
| `key` | `text` (PK) | Unique identifier for the content block (e.g. `hero_title`, `story_renovation_image_url`) |
| `value` | `text` | The content value (text string or image URL) |
| `updated_at` | `timestamptz` | Last modification timestamp |

#### `gallery_images`
Stores photo gallery entries.

| Column | Type | Description |
|--------|------|-------------|
| `id` | `uuid` (PK) | Auto-generated unique ID |
| `image_url` | `text` | Path or URL to the image |
| `title` | `text` | Display title |
| `description` | `text` | Caption/description |
| `display_order` | `integer` | Sort order (lower = first) |
| `created_at` | `timestamptz` | Creation timestamp |

#### `contact_messages`
Stores messages submitted via the public contact form.

| Column | Type | Description |
|--------|------|-------------|
| `id` | `uuid` (PK) | Auto-generated unique ID |
| `name` | `text` | Sender's name |
| `email` | `text` | Sender's email |
| `message` | `text` | Message body |
| `is_read` | `boolean` | Whether an admin has marked it as read |
| `created_at` | `timestamptz` | Submission timestamp |

#### `admin_users`
Whitelist of emails allowed to access the admin dashboard.

| Column | Type | Description |
|--------|------|-------------|
| `email` | `text` (PK) | Authorized admin email address |
| `created_at` | `timestamptz` | When the admin was added |

### Row Level Security (RLS)

All tables have RLS enabled. The key rules are:

- **Public visitors** can: `SELECT` from `site_content` and `gallery_images`, `INSERT` into `contact_messages`
- **Authenticated admins** (email in `admin_users` table) can: full CRUD on all tables
- **Admin check**: uses a PostgreSQL function `is_admin()` that checks if the current JWT email exists in `admin_users`

### Storage

A Supabase Storage bucket named `gallery` is created by `schema.sql`. It stores uploaded images (gallery photos and section images). Public read access is enabled; write access requires admin authentication.

### Database Setup

1. Go to **Supabase Dashboard, SQL Editor**
2. Run `supabase/schema.sql` — creates all tables, RLS policies, and storage bucket
3. Run `supabase/seed.sql` — populates default content, gallery images, and admin emails

---

## 7. Authentication & Admin Access

### How it works

Authentication uses **Supabase Auth** with email/password sign-in.

**Flow:**
1. User navigates to `/admin/login`
2. Enters email + password
3. Supabase Auth validates credentials and issues a JWT
4. Next.js middleware (`src/middleware.ts`) refreshes the session on every request
5. The admin layout (`src/app/admin/layout.tsx`) checks the session
6. RLS policies on the database use the JWT email to verify admin access

### Creating an Admin User

1. Go to **Supabase Dashboard, Authentication, Users**
2. Click **Add User, Create New User**
3. Enter the email and a password
4. Make sure the same email exists in the `admin_users` database table

**Default admin emails** (from `seed.sql`):
- `scwop2019@gmail.com`
- `admin@scwop.org`

### Session Management

- Sessions are managed via cookies using `@supabase/ssr`
- The middleware at `src/middleware.ts` calls `updateSession()` on every request to refresh tokens
- Sign-out clears the session and redirects to `/admin/login`

---

## 8. Public Pages

### Home Page (`/`) — `src/app/page.tsx`

The main landing page. Sections (top to bottom):
1. **Hero** — Full-width headline, tagline, CTA buttons, and featured image
2. **Impact Stats** — 4 metric cards (1,100+ Elders, 130+ OVC, etc.)
3. **Gallery Preview** — Horizontal scrolling photo carousel
4. **OVC Program** — 5-pillar educational support breakdown with image
5. **Success Stories** — Interactive tabbed showcase of 4 field interventions
6. **Impact Graphics Hub** — Animated donut chart + community impact estimator
7. **Mission Excerpt** — Mission statement and CTA banner

All text and images are dynamically loaded from the `site_content` database table.

### About Page (`/about`) — `src/app/about/page.tsx`

1. **Hero** — Page header with vision and mission statements
2. **Strategic Objectives** — 3 cards: Elderly Care, Economic Empowerment, OVC Education
3. **Impact Graphics Hub** — Same donut chart and estimator widget
4. **Success Stories** — Same interactive showcase
5. **Core Values** — 4 cards: Humanitarianism, Transparency, Integrity, Gender Equality
6. **Founding Story** — History narrative with founders photo

### Gallery Page (`/gallery`) — `src/app/gallery/page.tsx`

- Server-rendered page that fetches images from `gallery_images` table
- Client-side masonry grid layout with hover effects (`GalleryGridClient.tsx`)
- Full-screen lightbox modal with navigation arrows (`Lightbox.tsx`)
- Revalidates every 30 seconds

### Contact Page (`/contact`) — `src/app/contact/page.tsx`

- Organization contact details (address, phone, email, hours)
- Embedded Google Maps iframe showing Summit Fiyel Bet location
- Client-side contact form (`ContactForm.tsx`) with:
  - Input validation (name, email format, message length)
  - Honeypot anti-spam field
  - Rate limiting (prevents rapid re-submissions)
  - Saves messages to `contact_messages` table

---

## 9. Admin Dashboard

Access at `/admin/login`. All admin routes are protected by authentication middleware.

### Overview (`/admin`) — `src/app/admin/page.tsx`
- Dashboard with metric cards showing: total gallery images, content keys count, unread messages
- Quick-link cards to each management module

### Site Content Editor (`/admin/content`) — `src/app/admin/content/page.tsx`
The main CMS interface. Organized into sections:
1. **Hero Section & Visual Image** — headline, tagline, CTA text, hero image
2. **Impact Stats & Metric Cards** — 4 stat numbers and labels
3. **Primary Strategic Objectives** — 3 objective titles and descriptions
4. **Success Stories & Field Interventions** — 4 stories with titles, taglines, narratives, and images
5. **About Us & Program Section Images** — mission, vision, founding story, section images
6. **Contact Info & Location Google Map** — address, phone, email, hours, map embed URL

Each image field has:
- **Upload from Device** button — opens native file picker
- **Preset Photo Dropdown** — select from existing project photos
- **URL Input** — paste any external URL
- **Live Thumbnail Preview** — shows current image

### Gallery Manager (`/admin/gallery`) — `src/app/admin/gallery/page.tsx`
- View all gallery images in a grid
- Upload new images (to Supabase Storage or as URL)
- Edit titles, descriptions, and display order
- Delete images

### Contact Messages (`/admin/messages`) — `src/app/admin/messages/page.tsx`
- View all submitted contact form messages
- Mark messages as read/unread
- See sender name, email, message body, and timestamp

### Admin Layout (`/admin/layout.tsx`)
- Desktop: sidebar navigation with logo, nav links, "View Live Website" link, sign-out button
- Mobile: hamburger menu with slide-down navigation
- Login page (`/admin/login`) bypasses the admin layout wrapper

---

## 10. Reusable Components

### Layout Components (`src/components/layout/`)

**`Navbar.tsx`** — Responsive navigation bar
- Desktop: horizontal links (Home, About, Gallery, Contact)
- Mobile: hamburger menu with slide-down drawer
- Active page highlighting
- Logo and organization name

**`Footer.tsx`** — Full site footer
- 4-column grid: About SCWOP, Quick Links, Key Interventions, Contact Details
- Bottom copyright bar with discreet admin portal link

### UI Components (`src/components/ui/`)

**`ScrollReveal.tsx`** — GSAP-powered scroll animation wrapper
- Wraps any content to animate it when it scrolls into view
- Supports animations: `fade-up`, `slide-right`, `slide-left`, `scale-up`, `stagger-children`
- Props: `animation`, `duration`, `delay`, `stagger`, `threshold`

**`EmbraceMotif.tsx`** — Decorative SVG background patterns
- Variants: `hero-bg` (large background pattern), `divider` (section divider line), `bullet` (small dot)
- Used as background decoration throughout sections

**`ImpactGraphicsHub.tsx`** — Animated statistics visualization
- **Animated Donut Dial**: SVG circle showing 89.4% Elders / 10.6% Children distribution with stroke animation on load
- **Community Impact Estimator**: Interactive calculator — select number of families to see projected outcomes (cash aid, food packages, school sponsorships, health checkups)
- Fully responsive with mobile-optimized layouts

**`SuccessStoriesSection.tsx`** — Interactive success stories showcase
- Accepts `content` prop to render dynamic text/images from the CMS
- 4 stories: Home Renovation, Eye Care, Medical Equipment, IGA Livelihoods
- Tabbed category selector, featured showcase card with image, and 4 mini-cards grid
- Full-screen lightbox modal for detailed story view

---

## 11. Service Layer

All database interactions go through service functions in `src/lib/services/`. This provides a clean abstraction over Supabase queries.

### `content.ts`
| Function | Description |
|----------|-------------|
| `getAllSiteContent()` | Fetches all key-value pairs from `site_content`. Returns defaults if DB is empty. |
| `updateSiteContent(key, value)` | Upserts a single content key-value pair. |
| `uploadContentImage(file)` | Uploads a File to Supabase Storage (`gallery/site-content/`). Falls back to base64 data URL if storage fails. |

### `gallery.ts`
| Function | Description |
|----------|-------------|
| `getGalleryImages()` | Fetches all gallery images ordered by `display_order`. Returns defaults if DB is empty. |
| `uploadGalleryImage(file, title, description)` | Uploads image to Supabase Storage and creates a `gallery_images` record. |
| `updateGalleryImage(id, updates)` | Updates title, description, or display order. |
| `deleteGalleryImage(id)` | Deletes a gallery image record. |

### `contact.ts`
| Function | Description |
|----------|-------------|
| `submitContactMessage(name, email, message, honeypot?)` | Validates and inserts a contact message. Silently rejects spam (honeypot filled). |
| `getContactMessages()` | Fetches all messages ordered by newest first. |
| `toggleMessageReadStatus(id, currentStatus)` | Toggles the `is_read` boolean. |

### Supabase Clients (`src/lib/supabase/`)

| File | Usage |
|------|-------|
| `client.ts` | Browser-side client using `createBrowserClient()` — used in client components and services |
| `server.ts` | Server-side client using `createServerClient()` with cookie access — used in server components |
| `middleware.ts` | Session refresh logic called by `src/middleware.ts` on every request |

**Important:** Services cast the Supabase client as `any` (`const supabase: any = createClient()`) to bypass strict TypeScript generated CLI typings during build. This is intentional to avoid needing `supabase gen types` after every schema change.

---

## 12. Content Management System (CMS)

### How content flows from database to page:

1. **Server component** (e.g. `page.tsx`) calls `getAllSiteContent()` at render time
2. `getAllSiteContent()` queries the `site_content` table for all key-value pairs
3. If the DB returns data, it merges with `DEFAULT_SITE_CONTENT` (fallback defaults defined in `content.ts`)
4. The merged content map is passed to JSX and client components via props
5. Content is rendered using `{content.hero_title}` style access

### Content Keys Reference

Below is the complete list of content keys used across the site. Edit these in the admin dashboard at `/admin/content`:

**Hero Section:**
`hero_title`, `hero_tagline`, `hero_cta_primary`, `hero_cta_secondary`, `hero_image_url`

**Impact Stats:**
`stat_1_number`, `stat_1_label`, `stat_2_number`, `stat_2_label`, `stat_3_number`, `stat_3_label`, `stat_4_number`, `stat_4_label`

**Mission and CTA:**
`mission_excerpt_title`, `mission_excerpt_body`, `cta_banner_title`, `cta_banner_subtitle`

**About Page:**
`about_mission`, `about_vision`, `about_founding_story`, `about_founding_image_url`, `ovc_section_image_url`

**Strategic Objectives:**
`objective_1_title`, `objective_1_desc`, `objective_2_title`, `objective_2_desc`, `objective_3_title`, `objective_3_desc`

**Success Stories (x4):**
`story_renovation_title`, `story_renovation_tagline`, `story_renovation_desc`, `story_renovation_image_url`
`story_eyecare_title`, `story_eyecare_tagline`, `story_eyecare_desc`, `story_eyecare_image_url`
`story_mobility_title`, `story_mobility_tagline`, `story_mobility_desc`, `story_mobility_image_url`
`story_livelihood_title`, `story_livelihood_tagline`, `story_livelihood_desc`, `story_livelihood_image_url`

**Contact Info:**
`contact_address`, `contact_phone`, `contact_email`, `contact_hours`, `contact_map_url`

### Adding a new content field:

1. Add the key with a default value to `DEFAULT_SITE_CONTENT` in `src/lib/services/content.ts`
2. Add the field to the appropriate section in `CONTENT_SECTIONS` array in `src/app/admin/content/page.tsx`
3. Use `content.your_new_key` in the page/component where you need it
4. Optionally add it to `supabase/seed.sql` for fresh database setups

---

## 13. Image Management

### Image sources (3 methods):

1. **Static files** — Images in the `public/` folder, referenced as `/filename.JPG` (URL-encoded for spaces)
2. **Supabase Storage** — Uploaded via admin dashboard to the `gallery` bucket, referenced as full Supabase CDN URLs
3. **External URLs** — Any `https://...` image URL pasted into a content field

### How image upload works (admin dashboard):

1. Admin clicks "Upload Photo from Device" next to any image field
2. Browser opens native file picker
3. Selected file is sent to `uploadContentImage()` in `content.ts`
4. Function attempts to upload to Supabase Storage (`gallery/site-content/`)
5. If successful, returns the public CDN URL
6. If Storage fails (bucket not configured, permissions issue), falls back to base64 data URL
7. The URL is saved to the `site_content` table

### Next.js Image Optimization:

The site uses `next/image` for optimized image rendering. For images with spaces in filenames, URL encoding is used (e.g. `/Children%20gathered%20and%20standing%20together.JPG`).

---

## 14. Contact Form

The contact form (`src/app/contact/ContactForm.tsx`) provides:

- **Client-side validation**: Required fields, email format regex
- **Honeypot anti-spam**: Hidden field — if filled by bots, submission is silently accepted but not saved
- **Rate limiting**: Prevents multiple rapid submissions
- **Database storage**: Messages saved to `contact_messages` table
- **Admin inbox**: View and manage messages at `/admin/messages`

Messages are intentionally saved even if the Supabase connection has issues (the function returns `{ success: true }` to avoid exposing errors to visitors).

---

## 15. SEO & Metadata

### Global Metadata (`src/app/layout.tsx`)

- `metadataBase` — Set from `NEXT_PUBLIC_SITE_URL` env variable
- Title template: `"%s | SCWOP NGO"` (pages provide their own title)
- Rich `description` with relevant keywords
- `keywords` array targeting Ethiopia NGO searches
- OpenGraph tags for Facebook/LinkedIn/WhatsApp sharing
- Twitter Card (`summary_large_image`) for X/Twitter sharing
- Robot directives allowing full indexing with large image/video previews

### JSON-LD Structured Data

Embedded in `layout.tsx` as a `<script type="application/ld+json">` tag:
- Schema.org type: `NGO`
- Organization name, alternate name, founding date
- Physical address and GPS coordinates (Summit Fiyel Bet)
- Contact point with phone and email
- Available languages: English, Amharic

### Per-Page Metadata

Each page exports its own `metadata` object:
- **Home**: Default from layout
- **About**: `"About Us | SCWOP NGO"` with description
- **Gallery**: `"Photo Gallery | SCWOP NGO"` with description
- **Contact**: `"Contact Us | SCWOP NGO"` with description

### Generated Files

| File | Route | Source |
|------|-------|--------|
| `sitemap.ts` | `/sitemap.xml` | Lists all public pages with priorities and change frequencies |
| `robots.ts` | `/robots.txt` | Allows crawling of public pages, disallows `/admin/` and `/api/` |
| `manifest.ts` | `/manifest.webmanifest` | PWA manifest with app name, colors, and icons |

---

## 16. Styling & Design System

### Brand Colors (defined in `globals.css`)

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-ink` | `#0B284C` | Primary text, dark backgrounds |
| `--color-paper` | `#F0F5F9` | Page background, light surfaces |
| `--color-primary` | `#0B284C` | Deep navy — headings, buttons, nav |
| `--color-accent` | `#0284C7` | Water blue — highlights, links, CTAs |
| `--color-secondaryAccent` | `#E63946` | Red accent — alerts, emphasis |
| `--color-mutedBorder` | `#D4DDE6` | Borders, dividers |

### Typography

- **Display font** (`--font-fraunces`): Fraunces — used for headings via `font-display` class
- **Body font** (`--font-work-sans`): Work Sans — used for body text via `font-body` class
- Both loaded from Google Fonts with `display: swap`

### CSS Classes and Utilities

| Class | Description |
|-------|-------------|
| `glass-card` | Frosted glass card with backdrop blur and subtle border |
| `glass-card-hover` | Adds hover lift and shadow animation |
| `btn-shimmer` | Animated shimmer/shine effect on buttons |
| `animate-fade-in` | Fade-in animation for modals and overlays |

### Responsive Breakpoints

Standard Tailwind breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px). The site is mobile-first — base styles target small screens, with `sm:`, `lg:` prefixes for larger viewports.

---

## 17. Deployment (Vercel)

### Initial Deployment

1. Push the repository to GitHub
2. Import the project in [Vercel Dashboard](https://vercel.com/dashboard)
3. Add environment variables in Vercel, Project Settings, Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL` (your production domain, e.g. `https://scwop.org`)
4. Deploy — Vercel auto-detects Next.js and builds

### Subsequent Deployments

Push to the `main` branch and Vercel auto-deploys.

### Custom Domain

1. Go to Vercel, Project Settings, Domains
2. Add your custom domain
3. Update DNS records as instructed by Vercel
4. Update `NEXT_PUBLIC_SITE_URL` environment variable to match

### Important Vercel Notes

- The `.env.local` file does NOT exist on Vercel — all env vars must be added in the Vercel dashboard
- If you see `placeholder.supabase.co` errors, it means the Supabase env vars are not set on Vercel
- After changing env vars, you must **redeploy** for changes to take effect

---

## 18. Common Tasks & Recipes

### Add a new page

1. Create `src/app/your-page/page.tsx`
2. Export a `metadata` object for SEO
3. Add the route to `sitemap.ts` if it should be indexed
4. Add a link to `Navbar.tsx` and/or `Footer.tsx`

### Add a new editable content field

1. Add default value to `DEFAULT_SITE_CONTENT` in `src/lib/services/content.ts`
2. Add field definition to `CONTENT_SECTIONS` in `src/app/admin/content/page.tsx`
3. Use `content.your_key` in the target page component
4. Add to `seed.sql` for fresh DB setups

### Add a new admin module

1. Create `src/app/admin/your-module/page.tsx`
2. Add nav entry to `ADMIN_NAV` array in `src/app/admin/layout.tsx`
3. Create any needed service functions in `src/lib/services/`

### Change the Google Maps location

1. Go to [Google Maps](https://www.google.com/maps)
2. Find the location, click **Share**, then **Embed a map**, copy the `src` URL from the iframe
3. Update the `contact_map_url` field via admin dashboard at `/admin/content`, or edit `DEFAULT_SITE_CONTENT` in `content.ts`

### Add a new admin user

1. Create the user in **Supabase Dashboard, Authentication, Users, Add User**
2. Insert their email into the `admin_users` table: `INSERT INTO admin_users (email) VALUES ('new@email.com');`

### Change brand colors

Edit the CSS custom properties in `src/app/globals.css` under the `@theme` block.

---

## 19. Troubleshooting

### "Authentication Error: Failed to fetch" on Vercel
**Cause:** Supabase environment variables not set on Vercel.
**Fix:** Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Vercel Project Settings under Environment Variables, then redeploy.

### Login keeps saying "Authenticating..." and never completes
**Cause:** The user email exists in Supabase Auth but not in the `admin_users` database table, or the Supabase Auth user was not created.
**Fix:** Ensure the email exists in both Supabase Auth users AND the `admin_users` table.

### Images with spaces in filename not loading
**Cause:** Filenames with spaces need URL encoding.
**Fix:** Use `%20` for spaces (e.g. `/Elderly%20sitting%20together.JPG`).

### Port 3000 already in use
**Cause:** A previous dev server process is still running.
**Fix (Windows):** `netstat -ano | findstr :3000` to find the PID, then `taskkill /PID <PID> /F`.

### Build fails with "Module not found: font"
**Cause:** Intermittent network issue downloading Google Fonts during build.
**Fix:** Run `npm run build` again. This is a transient network error.

### Content changes not showing on the live site
**Cause:** Pages use ISR (Incremental Static Regeneration) with revalidation intervals.
**Fix:** Wait for the revalidation period (60s for Home/About/Contact, 30s for Gallery) or redeploy to force a full rebuild.

---

## Architecture Diagram

```
+-----------------------------------------------------+
|                    VERCEL (Host)                      |
|  +------------------------------------------------+  |
|  |           Next.js App Router (v16)             |  |
|  |                                                |  |
|  |  +---------+ +----------+ +--------------+    |  |
|  |  |  Public | |  About   | |   Gallery    |    |  |
|  |  |  Home / | |  /about  | |   /gallery   |    |  |
|  |  +----+----+ +----+-----+ +------+-------+    |  |
|  |       |            |             |             |  |
|  |  +----+----+ +----+-----+ +-----+--------+    |  |
|  |  | Contact | |  Admin   | |  Admin CMS   |    |  |
|  |  | /contact| |  /admin  | |  /admin/*    |    |  |
|  |  +----+----+ +----+-----+ +-----+--------+    |  |
|  |       |            |             |             |  |
|  |  +----+------------+-------------+----------+  |  |
|  |  |         Service Layer (lib/services)      |  |  |
|  |  |   content.ts | gallery.ts | contact.ts    |  |  |
|  |  +----------------------+--------------------+  |  |
|  |                         |                       |  |
|  |  +----------------------+--------------------+  |  |
|  |  |       Supabase Client (lib/supabase)      |  |  |
|  |  |   client.ts | server.ts | middleware.ts   |  |  |
|  |  +----------------------+--------------------+  |  |
|  +-------------------------+------------------------+  |
+----------------------------+-------------------------+
                             | HTTPS
                             v
                +------------------------+
                |    SUPABASE (BaaS)     |
                |                        |
                |  +------------------+  |
                |  |   PostgreSQL DB  |  |
                |  |  - site_content  |  |
                |  |  - gallery_imgs  |  |
                |  |  - contact_msgs  |  |
                |  |  - admin_users   |  |
                |  +------------------+  |
                |                        |
                |  +------------------+  |
                |  |  Auth (JWT)      |  |
                |  |  Email/Password  |  |
                |  +------------------+  |
                |                        |
                |  +------------------+  |
                |  |  Storage Bucket  |  |
                |  |  "gallery"       |  |
                |  +------------------+  |
                +------------------------+
```

---

*Last updated: August 2026*
*Built with Next.js 16, Supabase, Tailwind CSS 4, and GSAP*
