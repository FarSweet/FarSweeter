import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

export async function getOrCreateUser(walletAddress, ens) {
  let { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('wallet_address', walletAddress)
    .single();

  if (error && error.code === 'PGRST116') {
    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert([
        {
          wallet_address: walletAddress,
          ens: ens,
          credits: 3,  // Default for free users
          credit_type: 'Free',
        },
      ])
      .single();

    if (insertError) throw insertError;
    return newUser;
  }

  return data;
}

export async function updateUserCredits(walletAddress, credits) {
  const { data, error } = await supabase
    .from('users')
    .update({ credits })
    .eq('wallet_address', walletAddress);

  if (error) throw error;
  return data;
}
