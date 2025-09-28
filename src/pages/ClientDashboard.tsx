import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { getProjectsForCurrentUser } from '../services/projectsService';

type Project = {
  id: string;
  title: string;
  status: string;
  updated_at: string;
};

export default function ClientDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    (async () => {
      const list = await getProjectsForCurrentUser();
      setProjects(list);
    })();

    const channel = supabase
      .channel('projects_updates')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'projects' }, () => {
        getProjectsForCurrentUser().then(setProjects);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-semibold mb-4">Moje projekty</h1>
      <div className="grid gap-3">
        {projects.map((p) => (
          <div key={p.id} className="border rounded p-4">
            <div className="font-medium">{p.title}</div>
            <div className="text-sm text-gray-600">Stav: {p.status}</div>
          </div>
        ))}
        {projects.length === 0 && <div>Žádné projekty k zobrazení.</div>}
      </div>
    </div>
  );
}
