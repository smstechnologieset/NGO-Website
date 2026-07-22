-- Seed data for SCWOP NGO Website

-- Seed default site content keys & values
insert into site_content (key, value) values
  ('hero_title', 'Supporting Children, Empowering Women, Honoring Elders'),
  ('hero_tagline', 'SCWOP builds intergenerational support systems where children thrive, women lead, and older adults are cherished.'),
  ('hero_cta_primary', 'See Our Work'),
  ('hero_cta_secondary', 'Get Involved'),
  
  ('stat_1_number', '12,500+'),
  ('stat_1_label', 'Children & Families Supported'),
  ('stat_2_number', '45+'),
  ('stat_2_label', 'Community Empowerment Centers'),
  ('stat_3_number', '3,200+'),
  ('stat_3_label', 'Elders Receiving Care & Dignity'),
  ('stat_4_number', '98%'),
  ('stat_4_label', 'Direct Program Impact Rate'),
  
  ('mission_excerpt_title', 'Our Intergenerational Commitment'),
  ('mission_excerpt_body', 'At SCWOP (Support for Children, Women and Older People), we believe that no generation stands alone. By surrounding children with educational stability, equipping women with economic tools, and providing older adults with health, companionship, and respect, we weave a resilient safety net for the whole community.'),
  
  ('cta_banner_title', 'Join Us in Creating Lasting Community Impact'),
  ('cta_banner_subtitle', 'Whether through partnership, volunteering, or spreading awareness, your support transforms lives across generations.'),
  
  ('about_mission', 'To protect rights, expand opportunities, and enhance wellbeing for children, women, and older people through integrated community services and advocacy.'),
  ('about_vision', 'A compassionate society where every child is nurtured, every woman is empowered, and every older person lives with dignity and care.'),
  ('about_founding_story', 'Founded with a clear purpose, SCWOP began as a grassroots movement addressing the neglected needs of vulnerable households. Recognizing that children, mothers, and grandparents form an interdependent circle of care, our founders established holistic community centers that serve all three generations under one roof.'),

  ('contact_address', '123 Harmony Way, Community Care District, Cityville'),
  ('contact_phone', '+1 (555) 234-5678 / +1 (555) 876-5432'),
  ('contact_email', 'info@scwop.org / contact@scwop.org'),
  ('contact_hours', 'Monday - Friday: 8:30 AM - 5:00 PM')
on conflict (key) do update set value = excluded.value;

-- Optional initial seed admin user
-- Replace with actual admin email used during login
insert into admin_users (email) values
  ('admin@scwop.org')
on conflict (email) do nothing;
