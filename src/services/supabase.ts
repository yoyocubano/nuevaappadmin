import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://wcnqklspvfhnvbwuonro.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjbnFrbHNwdmZobnZid3Vvbnv8byIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzM1NzYyMzk0LCJleHAiOjIwNTEzMzgzOTR9.OOvGY69BTFz1WUZtOmjC9VxkOh_w2OzIBewEwWDo86g';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Helper para autenticación
export const AUTH_CODE = '123456'; // Código master de seguridad

export const verifyAdminCode = (code: string): boolean => {
    return code === AUTH_CODE;
};
