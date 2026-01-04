export type RootStackParamList = {
    Login: undefined;
    MainTabs: undefined;
    VlogList: undefined;
    VlogAdd: undefined;
    VlogEdit: { id: string };
    JobList: undefined;
    JobAdd: undefined;
    JobEdit: { id: string };
    StreamControl: undefined;
};

export type MainTabParamList = {
    Dashboard: undefined;
    Leads: undefined;
    Content: undefined;
    Settings: undefined;
};

// Data Models matching SQL Schema

export interface Lead {
    id: string;
    full_name: string; // Changed from name to match SQL
    email: string;
    phone?: string;
    event_type: string;
    event_date?: string; // Added
    guest_count?: number; // Added
    message: string;
    status: 'new' | 'contacted' | 'negotiating' | 'booked' | 'lost'; // Expanded
    is_archived?: boolean; // Added
    created_at: string;
}

export interface Vlog {
    id: string;
    title: string;
    description: string;
    video_url?: string;
    thumbnail_url?: string;
    duration?: string;
    status: 'draft' | 'processing' | 'published' | 'archived'; // Expanded
    views_count?: number; // Added
    created_at: string;
}

export interface Job {
    id: string;
    title: string;
    company: string;
    location?: string;
    description: string;
    requirements?: string[]; // Added
    salary_range?: string; // Added
    deadline?: string;
    status: 'active' | 'draft' | 'filled' | 'expired'; // Expanded
    applicants_count?: number; // Added
    created_at: string;
}

export interface StreamConfig {
    id: string;
    stream_key: string;
    platform: string;
    is_live: boolean;
    current_viewers: number;
    last_ping?: string;
    updated_at: string;
}
