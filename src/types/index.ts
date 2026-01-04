export type RootStackParamList = {
    Login: undefined;
    MainTabs: undefined;
};

export type MainTabParamList = {
    Dashboard: undefined;
    Leads: undefined;
    Content: undefined;
    Settings: undefined;
};

export type ContentStackParamList = {
    ContentManager: undefined;
    VlogList: undefined;
    VlogAdd: undefined;
    VlogEdit: { id: string };
    JobList: undefined;
    JobAdd: undefined;
    JobEdit: { id: string };
    DealList: undefined;
    StreamControl: undefined;
};

export interface Lead {
    id: string;
    name: string;
    email: string;
    phone?: string;
    event_type: string;
    message: string;
    status: 'new' | 'contacted' | 'booked';
    created_at: string;
}

export interface Vlog {
    id: string;
    title: string;
    description: string;
    thumbnail_url?: string;
    video_url?: string;
    duration?: string;
    status: 'draft' | 'published' | 'processing';
    created_at: string;
    published_at?: string;
}

export interface Job {
    id: string;
    title: string;
    company: string;
    location?: string;
    deadline?: string;
    description: string;
    status: 'active' | 'draft' | 'expired';
    created_at: string;
}

export interface Deal {
    id: string;
    title: string;
    description: string;
    discount: string;
    image_url?: string;
    valid_until?: string;
    status: 'active' | 'inactive';
    created_at: string;
}

export interface StreamConfig {
    id: string;
    youtube_video_id: string;
    stream_title: string;
    is_live: boolean;
    viewer_count?: number;
    updated_at: string;
}
