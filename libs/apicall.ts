import { supabase } from './supabase';

async function getSomeTable() {
  const { data, error } = await supabase.from('RealPortfolio').select('*');
  if (error) {
    console.error('fetch error', error);
    return [];
  }

  console.log('fetch success', data);
  return data;
}

export { getSomeTable };
