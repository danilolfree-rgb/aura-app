import { createClient } from '@supabase/supabase-js'

// O Vite substitui esses comandos pelos valores que você salvou na Vercel
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY

export const client = createClient(SUPABASE_URL, SUPABASE_KEY)