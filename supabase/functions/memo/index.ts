// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import {
  createSbClient,
  MemoRow,
  MemoInsert,
  MemoUpdate,
  MemoFilter,
} from './types.ts';
import { corsHeaders } from '../_shared/cors.ts';

Deno.serve(async (req) => {
  const supabase = createSbClient();

  // HTTP 메서드 확인
  const method = req.method;

  // cors처리
  if (method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (method === 'GET') {
    try {
      const url = new URL(req.url);
      const params = url.searchParams;
      const filter: MemoFilter = {
        startDate: params.get('startDate') || undefined,
        endDate: params.get('endDate') || undefined,
        asset: params.get('asset') || undefined,
        transactionType: params.get('transactionType') || undefined,
        searchTerm: params.get('searchTerm') || undefined,
      };

      const result = await getMemoData(supabase, filter);
      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  } else if (method === 'POST') {
    try {
      const data: MemoInsert = await req.json();
      const result = await createMemoData(supabase, data);
      return new Response(JSON.stringify(result), {
        status: 201,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  } else if (method === 'PUT') {
    try {
      const data: MemoUpdate = await req.json();
      if (!data.id) {
        throw new Error('ID is required for update operation');
      }
      const result = await updateMemoData(supabase, data);
      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  } else if (method === 'DELETE') {
    try {
      const { id } = await req.json();
      if (!id) {
        throw new Error('ID is required for delete operation');
      }
      const result = await deleteMemoData(supabase, id);
      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  }

  // 지원하지 않는 요청
  return new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
});

// Memo 관련 함수
async function getMemoData(supabase, filter: MemoFilter) {
  let query = supabase.from('Memos').select('*');

  // 필터 적용
  if (filter.startDate) {
    query = query.gte('date', filter.startDate);
  }
  if (filter.endDate) {
    query = query.lte('date', filter.endDate);
  }
  if (filter.asset) {
    query = query.eq('asset', filter.asset);
  }
  if (filter.transactionType) {
    query = query.eq('transaction_type', filter.transactionType);
  }

  // 검색어가 있으면 제목과 내용에서 검색
  if (filter.searchTerm) {
    query = query.or(
      `title.ilike.%${filter.searchTerm}%,content.ilike.%${filter.searchTerm}%`
    );
  }

  const { data, error } = await query.order('date', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return { data };
}

async function createMemoData(supabase, data: MemoInsert) {
  const { data: result, error } = await supabase
    .from('Memos')
    .insert(data)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return { data: result };
}

async function updateMemoData(supabase, data: MemoUpdate) {
  const { data: result, error } = await supabase
    .from('Memos')
    .update(data)
    .eq('id', data.id)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return { data: result };
}

async function deleteMemoData(supabase, id: number) {
  const { data, error } = await supabase
    .from('Memos')
    .delete()
    .eq('id', id)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return { success: true, data };
}

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request GET 'http://127.0.0.1:54321/functions/v1/memo' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0'

*/
