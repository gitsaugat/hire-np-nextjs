-- ============================================
-- STEP 1: Create interview_slots table
-- ============================================
CREATE TABLE IF NOT EXISTS interview_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID,
  interviewer_id UUID,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  status TEXT DEFAULT 'available',
  interview_id UUID,
  candidate_email TEXT,
  candidate_name TEXT,
  locked_at TIMESTAMPTZ,
  locked_by UUID,
  lock_token TEXT,
  is_recurring BOOLEAN DEFAULT FALSE,
  recurrence_pattern JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT valid_time_range CHECK (end_time > start_time)
);

-- ============================================
-- STEP 2: Create interviews table
-- ============================================
CREATE TABLE IF NOT EXISTS interviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID,
  company_id UUID,
  candidate_id UUID,
  title TEXT,
  description TEXT,
  interview_type TEXT DEFAULT 'video',
  scheduled_at TIMESTAMPTZ,
  duration_minutes INTEGER DEFAULT 60,
  timezone TEXT DEFAULT 'UTC',
  status TEXT DEFAULT 'scheduled',
  interviewer_id UUID,
  meeting_link TEXT,
  meeting_id TEXT,
  feedback TEXT,
  rating INTEGER,
  result TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- STEP 3: Create scheduling_requests table
-- ============================================
CREATE TABLE IF NOT EXISTS scheduling_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID NOT NULL,
  company_id UUID,
  candidate_email TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  email_sent_at TIMESTAMPTZ,
  email_clicked_at TIMESTAMPTZ,
  scheduled_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  access_token TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- STEP 4: Create email_logs table
-- ============================================
CREATE TABLE IF NOT EXISTS email_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID,
  recipient_email TEXT NOT NULL,
  recipient_name TEXT,
  subject TEXT NOT NULL,
  body_preview TEXT,
  email_type TEXT NOT NULL,
  status TEXT DEFAULT 'queued',
  template_id TEXT,
  variables JSONB,
  sent_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  opened_at TIMESTAMPTZ,
  clicked_at TIMESTAMPTZ,
  error_message TEXT,
  retry_count INTEGER DEFAULT 0,
  external_id TEXT,
  provider_response JSONB,
  related_application_id UUID,
  related_interview_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- STEP 5: Create application_reports table
-- ============================================
CREATE TABLE IF NOT EXISTS application_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID NOT NULL,
  ai_score INTEGER DEFAULT 0,
  ai_score_label TEXT DEFAULT 'Not Evaluated',
  skills_score INTEGER DEFAULT 0,
  experience_score INTEGER DEFAULT 0,
  education_score INTEGER DEFAULT 0,
  culture_fit_score INTEGER DEFAULT 0,
  skills_matched JSONB DEFAULT '[]'::jsonb,
  skills_missing JSONB DEFAULT '[]'::jsonb,
  strengths JSONB DEFAULT '[]'::jsonb,
  weaknesses JSONB DEFAULT '[]'::jsonb,
  recommendation TEXT,
  recommendation_reason TEXT,
  status TEXT DEFAULT 'pending',
  ai_provider TEXT,
  ai_model TEXT,
  analyzed_at TIMESTAMPTZ,
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(application_id)
);

-- ============================================
-- STEP 6: Create pipeline_settings table
-- ============================================
CREATE TABLE IF NOT EXISTS pipeline_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID UNIQUE,
  auto_shortlist_threshold INTEGER DEFAULT 70,
  auto_reject_threshold INTEGER DEFAULT 30,
  default_interview_duration INTEGER DEFAULT 60,
  default_interview_type TEXT DEFAULT 'video',
  scheduling_request_expiry_hours INTEGER DEFAULT 72,
  reminder_hours_before INTEGER DEFAULT 24,
  auto_send_interview_invite BOOLEAN DEFAULT TRUE,
  auto_send_reminders BOOLEAN DEFAULT TRUE,
  working_hours_start TIME DEFAULT '09:00',
  working_hours_end TIME DEFAULT '18:00',
  working_days TEXT[] DEFAULT ARRAY['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
  default_timezone TEXT DEFAULT 'UTC',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- STEP 7: Create indexes
-- ============================================
CREATE INDEX IF NOT EXISTS idx_slots_company ON interview_slots(company_id);
CREATE INDEX IF NOT EXISTS idx_slots_time ON interview_slots(start_time, end_time);
CREATE INDEX IF NOT EXISTS idx_slots_status ON interview_slots(status);
CREATE INDEX IF NOT EXISTS idx_interviews_company ON interviews(company_id);
CREATE INDEX IF NOT EXISTS idx_interviews_application ON interviews(application_id);
CREATE INDEX IF NOT EXISTS idx_scheduling_token ON scheduling_requests(access_token);
CREATE INDEX IF NOT EXISTS idx_scheduling_application ON scheduling_requests(application_id);
CREATE INDEX IF NOT EXISTS idx_email_logs_company ON email_logs(company_id);
CREATE INDEX IF NOT EXISTS idx_email_logs_type ON email_logs(email_type);
CREATE INDEX IF NOT EXISTS idx_email_logs_status ON email_logs(status);
CREATE INDEX IF NOT EXISTS idx_application_reports_app ON application_reports(application_id);
