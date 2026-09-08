-- =====================================================
-- VitaNova Clinic — Seed Data for Supabase
-- Run AFTER schema.sql in the SQL Editor
-- =====================================================

-- ── CLINICIANS ────────────────────────────────────────────────────────────────
INSERT INTO clinicians (id, name, profession, specialty, experience_years, verified, available, fee_ugx, avatar_url, bio, languages, rating, review_count)
VALUES
  (
    'doc_mukasa',
    'Dr. Ronald Mukasa',
    'Doctor',
    'Cardiologist & Internal Medicine',
    14,
    true, true, 45000,
    'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    'Senior Consultant at VitaNova Nakawa. Specialist in hypertension and diabetes management for Ugandan patients.',
    ARRAY['English', 'Luganda'],
    4.9, 128
  ),
  (
    'nurse_florence',
    'Sister Florence Nabatanzi',
    'Nurse',
    'Community Health & Wound Care',
    9,
    true, true, 25000,
    'https://images.unsplash.com/photo-1594824813593-1b7776510344?auto=format&fit=crop&w=400&q=80',
    'Certified community health nurse covering Wakiso and Kampala districts. Expert in post-operative care and chronic wound management.',
    ARRAY['English', 'Luganda', 'Runyankole'],
    4.8, 94
  ),
  (
    'midwife_grace',
    'Grace Namukasa (Midwife)',
    'Midwife',
    'Maternal & Reproductive Health',
    11,
    true, true, 35000,
    'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
    'Certified Ugandan midwife with 11 years helping mothers in Kampala and Wakiso. Specialises in antenatal care and safe delivery.',
    ARRAY['English', 'Luganda'],
    4.9, 77
  ),
  (
    'physio_david',
    'David Ssemakula (Physiotherapist)',
    'Physiotherapist',
    'Musculoskeletal & Stroke Rehab',
    7,
    true, true, 40000,
    'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80',
    'Physiotherapist specialising in post-stroke rehabilitation, back pain, and sports injuries. Available for home visits in Kampala.',
    ARRAY['English', 'Luganda'],
    4.7, 55
  )
ON CONFLICT (id) DO UPDATE SET
  available = EXCLUDED.available,
  rating = EXCLUDED.rating;

-- ── HEALTH EDUCATION ARTICLES ─────────────────────────────────────────────────
INSERT INTO education_articles (id, title, category, summary, video_url, thumbnail_url, duration_mins, author_name, author_avatar)
VALUES
  (
    'edu_malaria',
    'Malaria in Uganda: Causes, Prevention & Treatment',
    'Infectious Disease',
    'Dr. Mukasa explains how malaria spreads through mosquito bites, how to protect your family, and when to go to hospital vs treat at home.',
    'https://www.youtube.com/watch?v=example_malaria',
    'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=400&q=80',
    18,
    'Dr. Ronald Mukasa',
    'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80'
  ),
  (
    'edu_hypertension',
    'High Blood Pressure: A Silent Killer in Uganda',
    'Cardiovascular',
    'Learn why so many Ugandans have high BP, what foods and stress cause it, and how to control it with or without medicines.',
    'https://www.youtube.com/watch?v=example_hbp',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&q=80',
    22,
    'Dr. Ronald Mukasa',
    'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80'
  ),
  (
    'edu_diabetes',
    'Diabetes & Sugar in the Blood: What Ugandans Must Know',
    'Endocrine',
    'Sister Florence explains the difference between Type 1 and Type 2 diabetes, how to test blood sugar at home, and Ugandan foods that help.',
    'https://www.youtube.com/watch?v=example_diabetes',
    'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=400&q=80',
    25,
    'Sister Florence Nabatanzi',
    'https://images.unsplash.com/photo-1594824813593-1b7776510344?auto=format&fit=crop&w=200&q=80'
  ),
  (
    'edu_maternal',
    'Antenatal Care: Staying Safe During Pregnancy',
    'Maternal Health',
    'Grace Namukasa walks through every ANC visit, what vaccines to get, danger signs during pregnancy, and how to prepare for a safe delivery.',
    'https://www.youtube.com/watch?v=example_anc',
    'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?auto=format&fit=crop&w=400&q=80',
    30,
    'Grace Namukasa',
    'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80'
  ),
  (
    'edu_typhoid',
    'Typhoid Fever: Clean Water, Safe Food & Recovery',
    'Infectious Disease',
    'How typhoid spreads through contaminated water in Uganda, symptoms to watch for, and treatment options at home and hospital.',
    'https://www.youtube.com/watch?v=example_typhoid',
    'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=400&q=80',
    15,
    'Dr. Ronald Mukasa',
    'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80'
  )
ON CONFLICT (id) DO NOTHING;
