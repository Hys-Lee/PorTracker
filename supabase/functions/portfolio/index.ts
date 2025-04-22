// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import {
  createSbClient,
  RealPortfolioRow,
  RealPortfolioInsert,
  RealPortfolioUpdate,
  RealPortfolioFilter,
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
      const filter: RealPortfolioFilter = {
        startDate: params.get('startDate') || undefined,
        endDate: params.get('endDate') || undefined,
        assetIds: params.get('asset')
          ? (params.get('asset_ids') as string)
              .split(',')
              .map((id) => parseInt(id, 10))
          : undefined,
        transactionType: params.get('transactionType') || undefined,
        size: params.get('size')
          ? parseInt(params.get('size') as string, 10)
          : undefined, // 체크하기
        page: params.get('page')
          ? parseInt(params.get('page') as string, 10)
          : undefined, // 체크하기
        id: params.get('id')
          ? parseInt(params.get('id') as string, 10)
          : undefined, // 커서 기반 페이징을 위한 id
      };

      const result = await getPortfolioData(supabase, filter);
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
      const data: RealPortfolioInsert = await req.json();
      const result = await createPortfolioData(supabase, data);
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
      const data: RealPortfolioUpdate = await req.json();
      if (!data.id) {
        throw new Error('ID is required for update operation');
      }
      const result = await updatePortfolioData(supabase, data);
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
      const result = await deletePortfolioData(supabase, id);
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

// RealPortfolio 관련 함수
async function getPortfolioData(supabase, filter: RealPortfolioFilter) {
  // 1. 전체 데이터 개수 계산(날짜 외 필터 적용) - 첫 요청에만.

  let latestAssetsData: unknown[] | undefined = undefined;
  // let assetMappingData: unknown | undefined = undefined;
  if (filter.page && filter.page === 1) {
    // Asset id와 name 매핑 정보 찾기

    // if (!filter.assetIds) {
    //   // 페이지 처음 들어가면 asset정보 없이 띄워야 하니까, 이 때 매핑정보 전달
    //   const assetMappingQuery = supabase.from('assets').select('*');
    //   const { data: assetMappingResult, error: assetMappingError } =
    //     await assetMappingQuery;
    //   if (assetMappingError) {
    //     throw new Error(`Error fetching count: ${assetMappingError.message}`);
    //   }
    //   assetMappingData = {
    //     idToName: assetMappingResult.reduce((acc, cur) => {
    //       return { ...acc, [cur.id]: cur.name };
    //     }, {}),
    //     nameToId: assetMappingResult.reduce((acc, cur) => {
    //       return { ...acc, [cur.name]: cur.id };
    //     }, {}),
    //   };
    // }

    // Asset별 최신 값 찾기

    let latestAssetsQuery = supabase
      .from('asset_latest_state')
      .select('*, asset:assets(name)');

    if (filter.assetIds && filter.assetIds?.length > 0) {
      // countQuery = countQuery.eq('asset', filter.asset);
      latestAssetsQuery = latestAssetsQuery.in('asset_id', filter.assetIds);
    }
    const { data: latestAssetsResult, error: latestAssetsError } =
      await latestAssetsQuery;
    if (latestAssetsError) {
      throw new Error(`Error fetching count: ${latestAssetsError.message}`);
    }
    latestAssetsData = latestAssetsResult;
  }
  // let count: number | undefined = undefined;
  // if (filter.page && filter.page === 1) {
  //   let countQuery = supabase
  //     .from('RealPortfolio')
  //     .select('*', { count: 'exact', head: true });

  //   if (filter.asset) {
  //     countQuery = countQuery.eq('asset', filter.asset);
  //   }
  //   if (filter.transactionType) {
  //     countQuery = countQuery.eq('transaction_type', filter.transactionType);
  //   }
  //   const { count: totalCount, error: countError } = await countQuery;
  //   if (countError) {
  //     throw new Error(`Error fetching count: ${countError.message}`);
  //   }
  //   count = totalCount;
  // }

  // 2. 데이터 가져오기

  let query = supabase.from('RealPortfolio').select('*, asset:assets(name)');

  // 필터 적용
  if (filter.startDate) {
    query = query.gte('date', filter.startDate);
  }
  if (filter.endDate) {
    query = query.lte('date', filter.endDate);
  }
  // if (filter.asset) {
  //   query = query.eq('assets.name', filter.asset);
  // }
  if (filter.assetIds && filter.assetIds?.length > 0) {
    query = query.in('asset_id', filter.assetIds);
  }
  if (filter.transactionType) {
    query = query.eq('transaction_type', filter.transactionType);
  }

  if (filter.page && filter.size) {
    // 페이지(offset) 기반
    const offset = (filter.page - 1) * filter.size;
    query = query.range(offset, offset + filter.size - 1);
  } else if (filter.size) {
    // 커서 기반
    if (filter.id) {
      // 커서 사용한 경우 endDate랑 조합
      // query = query.lt(filter.id);
      query = query
        .or(
          `date.lt.${filter.endDate},and(date.eq.${filter.endDate},id.lt.${filter.id})`
        )
        .order('date', { ascending: false }) // date를 1순위로 정렬
        .order('id', { ascending: false }); // id를 2순위로 정렬
    }

    query = query.limit(filter.size);
  }

  // 3. 정렬 및 제한
  query = query.order('date', { ascending: false });

  const { data, error } = await query;

  if (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }

  // 다음 커서 계산 -> 일단 infinite말고도 쓸 수 있으니 남겨둠.
  const nextCursor =
    data.length > 0
      ? {
          ...filter,
          endDate: data[data.length - 1].date, // 가져온 마지막 데이터
          id: data[data.length - 1].id, // 가져온 마지막 데이터터
          size: filter.size, // 위에서 혹시나 에러 나지 말라고..
        }
      : null;
  const ascData = (data as unknown[]).reverse();
  return {
    data: ascData,
    // meta: { total: count, nextCursor },
    meta: {
      latestAssetsData,
      // assetMappingData,
      nextCursor,
    },
  };

  // const { data, error } = await query.order('date', { ascending: true });

  // if (error) {
  //   throw new Error(error.message);
  // }

  // return { data };
}

async function createPortfolioData(supabase, data: RealPortfolioInsert) {
  const { data: result, error } = await supabase
    .from('RealPortfolio')
    .insert(data)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return { data: result };
}

async function updatePortfolioData(supabase, data: RealPortfolioUpdate) {
  const { data: result, error } = await supabase
    .from('RealPortfolio')
    .update(data)
    .eq('id', data.id)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return { data: result };
}

async function deletePortfolioData(supabase, id: number) {
  const { data, error } = await supabase
    .from('RealPortfolio')
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

  curl -i --location --request GET 'http://127.0.0.1:54321/functions/v1/portfolio' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0'

*/
