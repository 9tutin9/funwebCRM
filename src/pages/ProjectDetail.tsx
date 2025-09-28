import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUpdatesForProject } from '../services/updatesService';
import { createSignedUrl } from '../services/storageService';

type Update = {
  id: string;
  title: string | null;
  description: string | null;
  files: string[] | null;
  created_at: string;
};

export default function ProjectDetail() {
  const { id } = useParams();
  const [updates, setUpdates] = useState<Update[]>([]);

  useEffect(() => {
    if (!id) return;
    getUpdatesForProject(id).then(setUpdates);
  }, [id]);

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-semibold mb-4">Detail projektu</h1>
      <div className="space-y-4">
        {updates.map((u) => (
          <div key={u.id} className="border rounded p-4">
            <div className="font-medium">{u.title}</div>
            <div className="text-sm text-gray-700 whitespace-pre-wrap">{u.description}</div>
            {u.files && u.files.length > 0 && (
              <div className="mt-3 space-y-2">
                {u.files.map((path) => (
                  <FileLink key={path} path={path} />
                ))}
              </div>
            )}
          </div>
        ))}
        {updates.length === 0 && <div>Žádné updaty zatím.</div>}
      </div>
    </div>
  );
}

function FileLink({ path }: { path: string }) {
  const [url, setUrl] = useState<string>('');
  useEffect(() => {
    createSignedUrl(path, 3600).then(setUrl);
  }, [path]);
  return (
    <a className="text-blue-600 underline" href={url} target="_blank" rel="noreferrer">
      {path.split('/').pop()}
    </a>
  );
}
