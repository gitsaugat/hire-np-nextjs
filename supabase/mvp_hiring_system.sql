-- HireNP MVP hiring workflow schema
-- Apply this after verifying existing Supabase objects. Existing tables are altered only if present.

create table if not exists public.screening_results (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null unique,
  job_id uuid,
  company_id uuid,
  candidate_id uuid,
  rag_score integer,
  rag_matched_terms jsonb not null default '[]'::jsonb,
  rag_missing_terms jsonb not null default '[]'::jsonb,
  match_score integer not null default 0,
  matched_skills jsonb not null default '[]'::jsonb,
  missing_skills jsonb not null default '[]'::jsonb,
  decision text not null,
  reason text,
  constraint_checks jsonb not null default '{}'::jsonb,
  constraints jsonb not null default '{}'::jsonb,
  model text,
  screened_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table if exists public.screening_results
  add column if not exists rag_score integer,
  add column if not exists rag_matched_terms jsonb not null default '[]'::jsonb,
  add column if not exists rag_missing_terms jsonb not null default '[]'::jsonb;

create table if not exists public.offers (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null,
  interview_id uuid,
  company_id uuid,
  candidate_id uuid,
  candidate_email text,
  candidate_name text,
  job_id uuid,
  role text,
  company_name text,
  compensation text,
  start_date date,
  status text not null default 'pending',
  signature_status text not null default 'pending',
  signature_token text unique,
  access_token text unique,
  letter_html text,
  signature_name text,
  signature_text text,
  signature_ip text,
  signed_at timestamptz,
  accepted_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table if exists public.offers
  add column if not exists interview_id uuid,
  add column if not exists company_id uuid,
  add column if not exists candidate_id uuid,
  add column if not exists candidate_email text,
  add column if not exists candidate_name text,
  add column if not exists job_id uuid,
  add column if not exists role text,
  add column if not exists company_name text,
  add column if not exists compensation text,
  add column if not exists start_date date,
  add column if not exists status text not null default 'pending',
  add column if not exists signature_status text not null default 'pending',
  add column if not exists signature_token text,
  add column if not exists access_token text,
  add column if not exists letter_html text,
  add column if not exists signature_name text,
  add column if not exists signature_text text,
  add column if not exists signature_ip text,
  add column if not exists signed_at timestamptz,
  add column if not exists accepted_at timestamptz,
  add column if not exists metadata jsonb not null default '{}'::jsonb;

create table if not exists public.onboarding (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null,
  offer_id uuid,
  company_id uuid,
  candidate_id uuid,
  candidate_email text,
  candidate_name text,
  status text not null default 'started',
  completion_status text not null default 'in_progress',
  onboarding_token text unique,
  onboarding_link text,
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  completion_notes text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table if exists public.onboarding
  add column if not exists offer_id uuid,
  add column if not exists company_id uuid,
  add column if not exists candidate_id uuid,
  add column if not exists candidate_email text,
  add column if not exists candidate_name text,
  add column if not exists status text not null default 'started',
  add column if not exists completion_status text not null default 'in_progress',
  add column if not exists onboarding_token text,
  add column if not exists onboarding_link text,
  add column if not exists started_at timestamptz not null default now(),
  add column if not exists completed_at timestamptz,
  add column if not exists completion_notes text,
  add column if not exists metadata jsonb not null default '{}'::jsonb;

alter table if exists public.applications
  add column if not exists pipeline_stage text,
  add column if not exists decision_reason text,
  add column if not exists screened_at timestamptz,
  add column if not exists stage_updated_at timestamptz,
  add column if not exists interview_scheduled_at timestamptz,
  add column if not exists interview_status text,
  add column if not exists manual_status_reason text;

alter table if exists public.interviews
  add column if not exists job_id uuid,
  add column if not exists meeting_link text,
  add column if not exists meeting_provider text,
  add column if not exists meeting_code text,
  add column if not exists fireflies_status text,
  add column if not exists fireflies_metadata jsonb,
  add column if not exists transcript text,
  add column if not exists transcript_metadata jsonb,
  add column if not exists notes text,
  add column if not exists completed_at timestamptz,
  add column if not exists metadata jsonb;

alter table if exists public.email_logs
  add column if not exists retry_count integer not null default 0,
  add column if not exists next_retry_at timestamptz,
  add column if not exists last_attempt_at timestamptz,
  add column if not exists template_data jsonb not null default '{}'::jsonb;

alter table if exists public.scheduling_requests
  add column if not exists interview_id uuid,
  add column if not exists email_clicked_at timestamptz,
  add column if not exists scheduled_at timestamptz;

alter table if exists public.interview_slots
  add column if not exists candidate_email text,
  add column if not exists candidate_name text,
  add column if not exists interview_id uuid;

alter table if exists public.pipeline_settings
  add column if not exists location text,
  add column if not exists location_type text,
  add column if not exists visa_policy text,
  add column if not exists visa_requirements text,
  add column if not exists state_rules text,
  add column if not exists federal_rules text,
  add column if not exists constraint_notes text,
  add column if not exists default_interview_duration integer default 60,
  add column if not exists working_hours_start text default '09:00',
  add column if not exists working_hours_end text default '18:00',
  add column if not exists working_days text[] default array['monday','tuesday','wednesday','thursday','friday'],
  add column if not exists auto_shortlist_threshold integer default 75;

alter table if exists public.candidate_profiles
  add column if not exists resume_text text;

alter table if exists public.jobs
  add column if not exists experience_level text,
  add column if not exists location_type text,
  add column if not exists salary_min integer,
  add column if not exists salary_max integer;

create index if not exists screening_results_application_id_idx on public.screening_results (application_id);
create unique index if not exists application_reports_application_id_key on public.application_reports (application_id);
create index if not exists offers_application_id_idx on public.offers (application_id);
create index if not exists offers_signature_token_idx on public.offers (signature_token);
create index if not exists onboarding_application_id_idx on public.onboarding (application_id);
create index if not exists onboarding_token_idx on public.onboarding (onboarding_token);
create index if not exists email_logs_company_status_idx on public.email_logs (company_id, status);
create index if not exists email_logs_retry_idx on public.email_logs (next_retry_at, status);
create index if not exists interviews_job_id_idx on public.interviews (job_id);
create index if not exists scheduling_requests_token_idx on public.scheduling_requests (access_token);
create index if not exists interview_slots_company_status_idx on public.interview_slots (company_id, status);

create table if not exists public.event_logs (
  id uuid primary key default gen_random_uuid(),
  event_type text not null,
  entity_type text not null default 'application',
  entity_id uuid not null,
  payload jsonb not null default '{}'::jsonb,
  status text not null default 'pending',
  attempts integer not null default 0,
  locked_at timestamptz,
  processed_at timestamptz,
  error_message text,
  result jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists event_logs_status_created_idx on public.event_logs (status, created_at);
create index if not exists event_logs_entity_idx on public.event_logs (entity_type, entity_id);
create index if not exists event_logs_event_type_idx on public.event_logs (event_type);

-- Add pipeline_stage column to applications if not present
alter table if exists public.applications
  add column if not exists pipeline_stage text default 'applied',
  add column if not exists stage_updated_at timestamptz,
  add column if not exists ai_score integer,
  add column if not exists screening_reason text,
  add column if not exists decision_reason text,
  add column if not exists screened_at timestamptz,
  add column if not exists interview_scheduled_at timestamptz,
  add column if not exists rejection_reason text;

-- Add missing application_references columns 
alter table if exists public.application_reports
  add column if not exists application_id uuid REFERENCES applications(id) ON DELETE CASCADE;

drop table if exists public.application_ai_data cascade;
