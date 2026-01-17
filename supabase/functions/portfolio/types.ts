import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import type { Database } from '../../../api/database.d.ts';

// 타입 정의
export type RealPortfolioRow =
  Database['public']['Tables']['RealPortfolio']['Row'];
export type RealPortfolioInsert =
  Database['public']['Tables']['RealPortfolio']['Insert'];
export type RealPortfolioUpdate =
  Database['public']['Tables']['RealPortfolio']['Update'];

export type MemoRow = Database['public']['Tables']['Memos']['Row'];
export type MemoInsert = Database['public']['Tables']['Memos']['Insert'];
export type MemoUpdate = Database['public']['Tables']['Memos']['Update'];

// 필터 타입 정의
export interface RealPortfolioFilter {
  startDate?: string;
  endDate?: string;
  assetIds?: number[]; // ids로 수정
  transactionType?: string;
  size?: number; // 체크하기.
  page?: number; // 체크하기.
  id?: number; // 체크하기.
}

export interface MemoFilter {
  startDate?: string;
  endDate?: string;
  asset?: string;
  transactionType?: string;
  searchTerm?: string; // 제목과 내용 검색을 위한 필드
}

export interface CombinedFilter {
  date?: string;
  asset?: string;
  transactionType?: string;
}

export interface CombinedUpdateData {
  portfolioId?: number;
  portfolioData?: {
    price?: number;
    shares?: number;
    currency?: string;
    exchange_rate?: number;
    transaction_type?: string;
  };
  memoId?: number;
  memoData?: {
    content?: string;
    custom_template_type?: string;
    custom_template_value?: number;
    tags?: string[];
    title?: string;
    transaction_type?: string;
  };
}

// Supabase 클라이언트 생성
export const createSbClient = () => {
  return createClient<Database>(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? ''
  );
};
