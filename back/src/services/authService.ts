import { createClient } from '@supabase/supabase-js';
const supabase= createClient(
    'https://tafnoqvfojluvdtyumas.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRhZm5vcXZmb2psdXZkdHl1bWFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA2OTM0NjcsImV4cCI6MjAxNjI2OTQ2N30.r4lQtdAlOmLkrrdbtuCs2JZbXaCj3YMn_GtLU3Bof2w'
  );

  export const signInWithPassword = async (email: string, senha: string) => {
    return supabase.auth.signInWithPassword({ email, password: senha });
  };

  export const signUp = async (email: string, senha: string) => {
    return supabase.auth.signUp({ email, password: senha });
  };