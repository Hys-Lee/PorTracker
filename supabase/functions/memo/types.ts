import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import type { Database } from '../../../api/database.d.ts';

// 타입 정의
export type MemoRow = Database['public']['Tables']['Memos']['Row'];
export type MemoInsert = Database['public']['Tables']['Memos']['Insert'];
export type MemoUpdate = Database['public']['Tables']['Memos']['Update'];

// 필터 타입 정의
export interface MemoFilter {
  startDate?: string;
  endDate?: string;
  asset?: string;
  transactionType?: string;
  searchTerm?: string; // 제목과 내용 검색을 위한 필드
}

// Supabase 클라이언트 생성
export const createSbClient = () => {
  return createClient<Database>(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? ''
  );
};
