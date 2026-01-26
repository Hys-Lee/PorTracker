import { v4 as uuidv4 } from 'uuid';
const linkedList = [
  {
    // acutal - memo
    memo: uuidv4(),
    portfolio: uuidv4(),
  },
];

export const mockDB = { linkList: linkedList };
