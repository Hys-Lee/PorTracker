interface BinarySearchProps<T> {
  data: T[];
  l: number;
  r: number;
  findLogic: (target: T) => boolean;
  getNextLR: (target: T, l: number, r: number, m: number) => [number, number];
}

const binarySearch = <T>({
  data,
  l,
  r,
  findLogic,
  getNextLR,
}: BinarySearchProps<T>) => {
  if (l > r) return null;
  const m = Math.floor((l + r) / 2);
  if (findLogic(data[m])) {
    return m;
  }
  const [newL, newR] = getNextLR(data[m], l, r, m);
  return binarySearch({ data, l: newL, r: newR, findLogic, getNextLR });
};

export default binarySearch;
