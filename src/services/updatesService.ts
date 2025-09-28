import { supabase } from '../supabaseClient';

export type ProgressUpdate = {
  id: string;
  project_id: string;
  contact_id: string | null;
  title: string | null;
  description: string | null;
  files: string[] | null;
  visibility: string;
  created_at: string;
};

export async function getUpdatesForProject(projectId: string): Promise<ProgressUpdate[]> {
  const { data, error } = await supabase
    .from('progress_updates')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false });
  if (error) {
    console.error(error);
    return [];
  }
  return (data ?? []) as ProgressUpdate[];
}
