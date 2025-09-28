import { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function Login() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  async function submit() {
    setMessage(null);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/client` },
    });
    setMessage(error ? `Chyba: ${error.message}` : 'Zkontroluj e-mail a klikni na odkaz.');
  }

  return (
    <div className="mx-auto max-w-sm p-6">
      <h1 className="text-2xl font-semibold mb-4">Přihlášení</h1>
      <input
        className="w-full border rounded px-3 py-2 mb-2"
        placeholder="e-mail"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="w-full bg-blue-600 text-white px-4 py-2 rounded" onClick={submit}>
        Poslat magic link
      </button>
      {message && <p className="text-sm mt-2">{message}</p>}
    </div>
  );
}
