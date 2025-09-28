import { useEffect, useState } from 'react';
import { listAllProjects, type Project } from '../services/projectsService';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    listAllProjects().then(setProjects);
  }, []);

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="text-2xl font-semibold mb-4">Projekty</h1>
      <ul className="space-y-2">
        {projects.map((p) => (
          <li key={p.id} className="border rounded p-3">
            <div className="font-medium">{p.title}</div>
            <div className="text-sm text-gray-600">{p.status}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
