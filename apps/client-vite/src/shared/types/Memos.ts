interface MemoOriginal {
  id: number;
  date: string;
  tags: string[];
  type: 'actual' | null;
  title: string;
  content: string;
  asset_id: number;
  linked_id: number;
  memo_type: 'real_portfolio' | 'event' | null;
  created_at: string;
  transaction_type: 'allocation' | 'withdrawal' | null;
  custom_template_type: null;
  custom_template_value: null;
}
export { MemoOriginal };
