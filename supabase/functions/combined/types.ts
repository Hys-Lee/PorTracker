import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import type { Database } from '../../../api/database.d.ts';

// 타입 정의
export type RealPortfolioRow =
  Database['public']['Tables']['RealPortfolio']['Row'];
export type RealPortfolioUpdate =
  Database['public']['Tables']['RealPortfolio']['Update'];

export type MemoRow = Database['public']['Tables']['Memos']['Row'];
export type MemoUpdate = Database['public']['Tables']['Memos']['Update'];

// 필터 타입 정의
export interface CombinedFilter {
  date?: string;
  assetId?: string;
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
