import { createClient } from '@supabase/supabase-js';

// Misma configuración que el proyecto anterior
const SUPABASE_URL = 'https://wcnqklspvfhnvbwuonro.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IdjbjcxbCBzcHZmaG52Ynd1b25ybyIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzM1NzYyMzk0LCJleHAiOjIwNTEzMzgzOTR9.OOvGY69BTFz1WUZtOmjC9VxkOh_w2OzIBewEwWDo86g';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
