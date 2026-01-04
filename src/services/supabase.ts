import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ENV } from '../config/env';

export const supabase = createClient(ENV.SUPABASE_URL, ENV.SUPABASE_ANON_KEY, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});

/**
 * Signs in a user with their email and password.
 * @param email The user's email.
 * @param password The user's password.
 * @returns The sign-in response from Supabase.
 */
export const signInWithPassword = (email, password) => {
    return supabase.auth.signInWithPassword({ email, password });
};

/**
 * Signs out the currently logged-in user.
 * @returns The sign-out response from Supabase.
 */
export const signOut = () => {
    return supabase.auth.signOut();
};

/**
 * Gets the current user session.
 * Useful for determining if a user is logged in.
 * @returns The session response from Supabase.
 */
export const getSession = () => {
    return supabase.auth.getSession();
};
