import { supabase } from '../supabaseClient';

export type Project = {
  id: string;
  contact_id: string | null;
  title: string;
  description: string | null;
  status: string;
  updated_at: string;
};

export async function getProjectsForCurrentUser(): Promise<Project[]> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('updated_at', { ascending: false });
  if (error) {
    console.error(error);
    return [];
  }
  return (data ?? []) as Project[];
}

export async function listAllProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('updated_at', { ascending: false });
  if (error) {
    console.error(error);
    return [];
  }
  return (data ?? []) as Project[];
}
