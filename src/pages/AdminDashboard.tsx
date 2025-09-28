import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function AdminDashboard() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  async function sendInvite() {
    setMessage(null);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/client` },
    });
    setMessage(error ? `Chyba: ${error.message}` : 'Pozvánka odeslána.');
  }

  useEffect(() => {
    // Optional: check admin session here
  }, []);

  return (
    <div className="mx-auto max-w-xl p-6">
      <h1 className="text-2xl font-semibold mb-4">Admin dashboard</h1>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Pozvat klienta (magic link)</label>
          <div className="flex gap-2">
            <input
              className="flex-1 border rounded px-3 py-2"
              placeholder="klient@firma.cz"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={sendInvite}>
              Odeslat
            </button>
          </div>
        </div>
        {message && <p className="text-sm">{message}</p>}
      </div>
    </div>
  );
}
