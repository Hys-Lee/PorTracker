import binarySearch from './binarySearch';
describe('binary Search 테스트', () => {
  test('가장 간단한 상황. data타입이 정렬된 number[]일 때', () => {
    const data: number[] = [1, 2, 3, 4, 5, 6, 7];
    const answer1 = 5;
    const answer2 = 0;
    const makeFindLogic = (answer: number) => (target: number) => {
      if (target === answer) return true;
      return false;
    };
    const findLogic1 = makeFindLogic(answer1);
    const findLogic2 = makeFindLogic(answer2);

    const makeGetNextLR =
      (answer: number) =>
      (target: number, l: number, r: number, m: number): [number, number] => {
        //test
        console.log('answer, m,l,r: ', answer, m, l, r);
        if (target < answer) return [m + 1, r];
        else if (target > answer) return [l, m - 1];
        throw new Error('target===answer일 때가 처리되지 않았음.');
      };
    const getNextLr1 = makeGetNextLR(answer1);
    const getNextLr2 = makeGetNextLR(answer2);

    const res1 = binarySearch<number>({
      data,
      l: 0,
      r: data.length,
      findLogic: findLogic1,
      getNextLR: getNextLr1,
    });
    const res2 = binarySearch({
      data,
      l: 0,
      r: data.length,
      findLogic: findLogic2,
      getNextLR: getNextLr2,
    });

    const expectation1 = 4;
    const expectation2 = null;
    expect(res1).toBe(expectation1);
    expect(res2).toBe(expectation2);
  });
});
