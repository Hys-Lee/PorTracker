import { atom } from 'jotai';

interface MarkDataContent {
  type: 'normal' | 'trade-only' | 'memo-only' | 'all';
  assetName: string;
  assetId: number;
  date: string; // x
  value: number; // y
  // chartPos: [string, number];
  viewPos: [number, number];
  seriesIndex: number;
  dataIndex: number;
  accumulatedValue: number;
}

export type FocusContent = MarkDataContent;
// isExist: boolean;
// original: string; // 원본 markdata key값

export const ActualFlowFocusInfoAtomInit: FocusContent = {
  date: '',
  assetName: '',
  assetId: 0,
  type: 'normal',
  value: 0,
  viewPos: [0, 0],
  seriesIndex: 0,
  dataIndex: 0,
  accumulatedValue: 0,
};
const ActualFlowFocusInfoAtom = atom<FocusContent | undefined>();
// ActualFlowFocusInfoAtomInit

export { MarkDataContent, ActualFlowFocusInfoAtom };
