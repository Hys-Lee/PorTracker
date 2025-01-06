import { atom } from 'jotai';

type FlowMode = 'actual' | 'preset' | 'comparison';

const FlowModeAtom = atom<FlowMode>('actual');

export { FlowMode };
export { FlowModeAtom };
