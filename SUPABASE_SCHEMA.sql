-- 💎 WELUX ADMIN APP - DATABASE SCHEMA (Production Grade)
-- Auditor: Firebase Architecture Standards
-- Engineer: Antigravity

-- 1. USERS & AUTH (Managed by Supabase Auth, extending profile here)
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) NOT NULL PRIMARY KEY,
    full_name TEXT,
    avatar_url TEXT,
    role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'editor', 'viewer')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. LEADS (CRM Core)
CREATE TABLE public.leads (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    event_type TEXT NOT NULL, -- 'Wedding', 'Corporate', 'Private'
    event_date DATE,
    guest_count INTEGER,
    message TEXT,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'negotiating', 'booked', 'lost')),
    is_archived BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. CONTENT (Vlogs)
CREATE TABLE public.vlogs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    video_url TEXT, -- Link to storage or YouTube
    thumbnail_url TEXT,
    duration TEXT,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'processing', 'published', 'archived')),
    views_count INTEGER DEFAULT 0,
    author_id UUID REFERENCES public.profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. JOBS (Recruitment)
CREATE TABLE public.jobs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    company TEXT DEFAULT 'Welux Events',
    location TEXT,
    description TEXT,
    requirements TEXT[], -- Array of strings
    salary_range TEXT,
    deadline DATE,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'draft', 'filled', 'expired')),
    applicants_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. STREAM CONFIG (Live Control)
CREATE TABLE public.stream_config (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    stream_key TEXT NOT NULL,
    platform TEXT DEFAULT 'youtube',
    is_live BOOLEAN DEFAULT FALSE,
    current_viewers INTEGER DEFAULT 0,
    last_ping TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- SECURITY POLICIES (Row Level Security)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE vlogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE stream_config ENABLE ROW LEVEL SECURITY;

-- Only authenticated users can read/write data
CREATE POLICY "Admin Access Profiles" ON profiles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Access Leads" ON leads FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Access Vlogs" ON vlogs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Access Jobs" ON jobs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Access Stream" ON stream_config FOR ALL USING (auth.role() = 'authenticated');
