import { Atom, useAtom, SetStateAction } from 'jotai';
import { useSearchParams } from 'react-router';

const useAtomicInputControl = <T>({
  atom,
  searchParamInfo,
}: {
  atom: Atom<T>;
  searchParamInfo?: { name: string; makeSearchParam: (value: T) => string };
}) => {
  const [searchParams] = useSearchParams();
  const [value, setValue] = useAtom(atom);

  if (searchParamInfo)
    searchParams.set(
      searchParamInfo.name,
      searchParamInfo.makeSearchParam(value)
    );

  return { value, setValue };
};
export default useAtomicInputControl;
