
// Configuración de entorno y constantes globales
// En un entorno de producción real, estos valores vendrían de process.env o EAS Secrets

export const ENV = {
    SUPABASE_URL: 'https://wcnqklspvfhnvbwuonro.supabase.co',
    SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjbnFrbHNwdmZobnZid3Vvbnv8byIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzM1NzYyMzk0LCJleHAiOjIwNTEzMzgzOTR9.OOvGY69BTFz1WUZtOmjC9VxkOh_w2OzIBewEwWDo86g',
    // Admin Auth Code - Debería moverse a una tabla de usuarios en DB en el futuro
    ADMIN_CODE: '123456'
};
