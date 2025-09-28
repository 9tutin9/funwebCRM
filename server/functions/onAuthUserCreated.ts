// Pseudo Edge Function (Supabase) for user.created
// This is a template; adapt to Supabase Edge runtime.
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

export async function handleUserCreated(event: { user: any }) {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseServiceRole = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const supabase = createClient(supabaseUrl, supabaseServiceRole);

  const user = event.user;
  const email = user.email as string;

  const { data: contact } = await supabase
    .from('contacts')
    .select('id, name')
    .eq('email', email)
    .maybeSingle();

  if (contact) {
    await supabase.from('profiles').upsert({
      id: user.id,
      full_name: user.user_metadata?.full_name ?? contact.name ?? email,
      contact_id: contact.id,
      is_admin: false,
    });
  } else {
    await supabase.from('profiles').upsert({
      id: user.id,
      full_name: user.user_metadata?.full_name ?? email,
      is_admin: false,
    });
  }
}


