import { useAtom } from 'jotai';
import { relatedMemoDataAtom } from 'src/entities/tmpAtoms/relatedMemoAtom';
import { getAnotherMemo } from 'src/features/tmpFuncs/getMemo';

const RelatedMemoRecordDetail = () => {
  // 상태관리 사용해서 MemoModal에 setValue시키기
  const { content, customTemplate, date, tags, title } = getAnotherMemo();
  const [updateFn, setUpdateFn] = useAtom(relatedMemoDataAtom);
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'start', width: '100%' }}>
        <button
          type="button"
          style={{ width: 'auto' }}
          onClick={() =>
            updateFn.fn({ content, customTemplate, date, tags, title })
          }
        >{`<-참조하기`}</button>
      </div>
      <div>
        <p>{title}</p>
        <div>
          <p>날짜</p>
          <p>{date.toISOString()}</p>
        </div>

        <p>{content}</p>
        <p>{/*그냥 form에서 tag의 디자인을 따라하게 만드는게 맞는 듯*/ tags}</p>
        <div>
          {
            /*커스텀 템플릿 값을 disabled하게 사용하는거로.. 어차피 vip기능이기도
          함.*/
            customTemplate
          }
        </div>
      </div>
    </>
  );
};
export default RelatedMemoRecordDetail;
