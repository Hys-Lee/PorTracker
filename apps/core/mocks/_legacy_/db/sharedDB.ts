// import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker';
faker.seed(Array.from('shared').map((c) => c.charCodeAt(0))); // 서버/클라 환경의 db 모두 동일 값으로 주기 위해
const uuidv4 = faker.string.uuid;
const linkedList = [
  {
    // acutal - memo
    memo: uuidv4(),
    portfolio: uuidv4(),
  },
];

export const mockDB = { linkList: linkedList };
