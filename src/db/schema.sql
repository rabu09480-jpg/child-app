-- SQL Schema Definition for Child Voice (চাইল্ড ভয়েস)
-- Target: PostgreSQL / Supabase / Neon

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Anonymous Incident Reports Table
CREATE TABLE IF NOT EXISTS child_incident_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tracking_code VARCHAR(32) UNIQUE NOT NULL,
  incident_type VARCHAR(64) NOT NULL,
  urgency_level VARCHAR(32) DEFAULT 'MEDIUM',
  district VARCHAR(64) NOT NULL,
  upazila VARCHAR(64),
  village_or_union VARCHAR(128),
  description TEXT NOT NULL,
  metadata_stripped BOOLEAN DEFAULT TRUE,
  photo_privacy_blurred BOOLEAN DEFAULT TRUE,
  attachment_url TEXT,
  status VARCHAR(32) DEFAULT 'SUBMITTED',
  assigned_volunteer_id UUID,
  investigation_notes TEXT,
  action_taken TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Children's Creative Corner / Voice Wall
CREATE TABLE IF NOT EXISTS creative_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  category VARCHAR(32) NOT NULL,
  author_name VARCHAR(128) NOT NULL,
  author_age INT NOT NULL,
  district VARCHAR(64) NOT NULL,
  content TEXT,
  media_url TEXT,
  audio_narration TEXT,
  likes_count INT DEFAULT 0,
  is_approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Field Volunteers Table
CREATE TABLE IF NOT EXISTS volunteers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(32) NOT NULL,
  email VARCHAR(128),
  district VARCHAR(64) NOT NULL,
  upazila VARCHAR(64) NOT NULL,
  profession VARCHAR(64) NOT NULL,
  specialization TEXT[] NOT NULL,
  availability VARCHAR(32) DEFAULT 'WEEKENDS',
  is_verified BOOLEAN DEFAULT FALSE,
  badge_level VARCHAR(64) DEFAULT 'COMMUNITY_DEFENDER',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Quiz Completions
CREATE TABLE IF NOT EXISTS quiz_completions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  participant_name VARCHAR(128) NOT NULL,
  score INT NOT NULL,
  total_questions INT DEFAULT 5,
  certificate_code VARCHAR(32) UNIQUE NOT NULL,
  badge_awarded VARCHAR(64) NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Safe Web Directory Whitelist
CREATE TABLE IF NOT EXISTS safe_web_directory (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(128) NOT NULL,
  title_bn VARCHAR(128) NOT NULL,
  url TEXT UNIQUE NOT NULL,
  category VARCHAR(64) NOT NULL,
  age_rating VARCHAR(32) DEFAULT 'ALL_AGES',
  description TEXT,
  description_bn TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  verified_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Operational Regions
CREATE TABLE IF NOT EXISTS operational_regions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  district_name VARCHAR(64) UNIQUE NOT NULL,
  district_name_bn VARCHAR(64) NOT NULL,
  division VARCHAR(64) NOT NULL,
  coastal_vulnerability VARCHAR(64) NOT NULL,
  children_benefited INT DEFAULT 0,
  active_volunteers INT DEFAULT 0,
  schools_connected INT DEFAULT 0,
  emergency_contact VARCHAR(32) DEFAULT '1098'
);

-- Indices for rapid querying in rural mobile apps
CREATE INDEX IF NOT EXISTS idx_reports_tracking ON child_incident_reports(tracking_code);
CREATE INDEX IF NOT EXISTS idx_reports_district ON child_incident_reports(district);
CREATE INDEX IF NOT EXISTS idx_creative_approved ON creative_submissions(is_approved);
CREATE INDEX IF NOT EXISTS idx_volunteers_district ON volunteers(district);
