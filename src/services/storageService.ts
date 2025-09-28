import { supabase } from '../supabaseClient';

const BUCKET = 'progress-files';

export async function uploadFile(path: string, file: File) {
  const { data, error } = await supabase.storage.from(BUCKET).upload(path, file);
  if (error) throw error;
  return data;
}

export async function createSignedUrl(path: string, expiresInSec: number) {
  const { data, error } = await supabase.storage.from(BUCKET).createSignedUrl(path, expiresInSec);
  if (error) throw error;
  return data.signedUrl as string;
}
