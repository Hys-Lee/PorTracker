import {
  MemoEvaluationValue,
  MemoImportanceValue,
  MemoTypeValue,
} from '@core/types';
// import { v4 as uuidv4 } from 'uuid';
import { mockDB as sharedDB } from './sharedDB';

import { faker } from '@faker-js/faker';
faker.seed(Array.from('memo').map((c) => c.charCodeAt(0))); // 서버/클라 환경의 db 모두 동일 값으로 주기 위해
const uuidv4 = faker.string.uuid;

const linkList = sharedDB.linkList;
const initMemo = [
  {
    id: linkList[0].memo,
    createdAt: new Date('2025-12-26').toISOString(),
    importance: 'critical' as MemoImportanceValue,
    title: '메모 타이틀 1',
    content: `줄\n바꿈\n이\n있는\n이런\n컨텐츠\n내용은\n어떻게\n보시는지\n용?\n예?\n장난\n하시는\n거에요\n???\n지금\n님\n큰일\n나게\n생겼\n잖아\n요\n이\n멍\n청\n한\n어\n리\n석\n은\n자식아`,
    tags: [
      '태그1이 엄청나게 길어버리는 이런 상황에선 어케 대처하실지가 심히 궁금하군요',
      '태그2도 또 있는데',
      '태그 3',
    ],
    evaluation: 'better' as MemoEvaluationValue,
    date: new Date('2026-01-25').toISOString(),
    type: 'actual' as MemoTypeValue,
    linkedPortfolio: linkList[0].portfolio,
  },
  {
    id: uuidv4(),
    createdAt: new Date('2026-01-25').toISOString(),
    importance: 'normal' as MemoImportanceValue,
    title: '메모 타이틀 2',
    content: `개 짧을 때`,
    tags: [
      '태그1',
      '태그2도 또 있는데',
      '태그 3',
      '태그4',
      '태그5',
      '태그6',
      '태그7',
    ],
    evaluation: 'worse' as MemoEvaluationValue,
    date: new Date('2026-01-25').toISOString(),
    type: 'target' as MemoTypeValue,
  },
  {
    id: uuidv4(),
    createdAt: new Date('2026-01-25').toISOString(),
    importance: 'normal' as MemoImportanceValue,
    title: '메모 타이틀 3',
    content: `개 짧을 때`,
    tags: ['태그1'],
    evaluation: 'worse' as MemoEvaluationValue,
    date: new Date('2026-01-25').toISOString(),
    type: 'event' as MemoTypeValue,
  },
];

const memoTable = new Map(initMemo.map((data) => [data.id, data]));

export const mockDB = {
  memo: memoTable,
};
