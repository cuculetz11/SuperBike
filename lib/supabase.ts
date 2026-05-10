import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Get a public URL for a file in the showroom-media bucket.
 * Usage: getStorageUrl('bikes/status160.jpg')
 */
export function getStorageUrl(path: string): string {
  const { data } = supabase.storage
    .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET ?? 'showroom-media')
    .getPublicUrl(path);
  return data.publicUrl;
}
