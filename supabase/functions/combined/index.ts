// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import {
  createSbClient,
  CombinedFilter,
  CombinedUpdateData,
  MemoUpdate,
  RealPortfolioUpdate,
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
      const filter: CombinedFilter = {
        date: params.get('date') || undefined,
        asset: params.get('asset') || undefined,
        transactionType: params.get('transactionType') || undefined,
      };

      const result = await getCombinedData(supabase, filter);
      return new Response(JSON.stringify(result), {
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
      const updateData: CombinedUpdateData = await req.json();
      const result = await updateCombinedData(supabase, updateData);
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

// RealPortfolio와 Memo 데이터 통합 조회 함수
async function getCombinedData(supabase, filter: CombinedFilter) {
  // 병렬로 두 데이터를 조회하여 성능 최적화
  const [portfolioResult, memoResult] = await Promise.all([
    getFilteredPortfolio(supabase, filter),
    getFilteredMemo(supabase, filter),
  ]);

  return {
    portfolio: portfolioResult.data,
    memo: memoResult.data,
  };
}

// 통합 조회용 포트폴리오 필터링 함수
async function getFilteredPortfolio(supabase, filter: CombinedFilter) {
  let query = supabase.from('RealPortfolio').select('*');

  // 필터 적용
  if (filter.date) {
    query = query.eq('date', filter.date);
  }
  if (filter.asset) {
    query = query.eq('asset', filter.asset);
  }
  if (filter.transactionType) {
    query = query.eq('transaction_type', filter.transactionType);
  }

  const { data, error } = await query
    .order('date', { ascending: true })
    .order('id', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return { data };
}

// 통합 조회용 메모 필터링 함수
async function getFilteredMemo(supabase, filter: CombinedFilter) {
  let query = supabase.from('Memos').select('*');

  // 필터 적용
  if (filter.date) {
    query = query.eq('date', filter.date);
  }
  if (filter.asset) {
    query = query.eq('asset', filter.asset);
  }
  if (filter.transactionType) {
    query = query.eq('transaction_type', filter.transactionType);
  }

  const { data, error } = await query.order('date', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return { data };
}

// RealPortfolio와 Memo 데이터 통합 업데이트 함수
async function updateCombinedData(supabase, updateData: CombinedUpdateData) {
  const results: {
    portfolio?: any;
    memo?: any;
  } = {};

  // 포트폴리오 데이터 업데이트
  if (updateData.portfolioId && updateData.portfolioData) {
    try {
      const allowedFields = [
        'price',
        'shares',
        'currency',
        'exchange_rate',
        'transaction_type',
      ];
      // 허용된 필드만 추출
      const portfolioUpdateData: RealPortfolioUpdate = {
        id: updateData.portfolioId,
      };

      // TS 에러 해결: Object.keys로 접근하기 전에 nullish 체크
      const portfolioData = updateData.portfolioData;
      if (portfolioData) {
        Object.keys(portfolioData).forEach((key) => {
          if (allowedFields.includes(key) && portfolioData[key] !== undefined) {
            portfolioUpdateData[key] = portfolioData[key];
          }
        });
      }

      const { data, error } = await supabase
        .from('RealPortfolio')
        .update(portfolioUpdateData)
        .eq('id', updateData.portfolioId)
        .select();

      if (error) {
        throw new Error(`Portfolio update error: ${error.message}`);
      }

      results.portfolio = data;
    } catch (error) {
      throw new Error(`Portfolio update failed: ${error.message}`);
    }
  }

  // 메모 데이터 업데이트
  if (updateData.memoId && updateData.memoData) {
    try {
      const allowedFields = [
        'content',
        'custom_template_type',
        'custom_template_value',
        'tags',
        'title',
        'transaction_type',
      ];
      // 허용된 필드만 추출
      const memoUpdateData: MemoUpdate = {
        id: updateData.memoId,
      };

      // TS 에러 해결: Object.keys로 접근하기 전에 nullish 체크
      const memoData = updateData.memoData;
      if (memoData) {
        Object.keys(memoData).forEach((key) => {
          if (allowedFields.includes(key) && memoData[key] !== undefined) {
            memoUpdateData[key] = memoData[key];
          }
        });
      }

      const { data, error } = await supabase
        .from('Memos')
        .update(memoUpdateData)
        .eq('id', updateData.memoId)
        .select();

      if (error) {
        throw new Error(`Memo update error: ${error.message}`);
      }

      results.memo = data;
    } catch (error) {
      throw new Error(`Memo update failed: ${error.message}`);
    }
  }

  return results;
}

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request GET 'http://127.0.0.1:54321/functions/v1/combined?date=2023-01-01&asset=a' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0'

*/
