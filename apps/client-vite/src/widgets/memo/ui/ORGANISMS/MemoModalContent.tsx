import Text from 'src/shared/ui/ATOMS/Text';
import CompoundForm from 'src/shared/ui/MOLECULES/CompoundForm/CompoundForm';
import CompoundSegmentControl from 'src/shared/ui/MOLECULES/CompoundSegmentControl/CompoundSegmentControl';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import MemoModalSubContent from './MemoModalSubContent';
// 테스트용
import getMemo, { getAnotherMemo } from 'src/features/tmpFuncs/getMemo';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { relatedMemoDataAtom } from 'src/entities/tmpAtoms/relatedMemoAtom';

const memoSchema = z.object({
  title: z.string().nonempty(),
  portfolioType: z.enum(['real', 'config']),
  config: z.string().nonempty().optional(),
  asset: z.string().nonempty().optional(),
  transactionType: z.enum(['allocation', 'withdrawal']).optional(),
  date:
    // z.string().nonempty()
    z.date(),
  content: z.string(),
  tags: z.array(z.string()),
  customTemplate: z.number(), // 커스텀 텤플릿. 레인지가 있으니까 넘버일 듯?ㄴㄴ
});
type Memo = z.infer<typeof memoSchema>;

const MemoModalContent = ({ id }: { id?: number }) => {
  // 데이터 fetch하기 모달 id가 있다면 default값을 가져오고, 아니면 빈거로.
  const defaultData = getMemo(id);
  const [defD, setDefD] = useState(defaultData);
  const {
    register,
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<Memo>({
    resolver: zodResolver(memoSchema),
    defaultValues: defD,
  });
  console.log('본문: ', getValues('content'));
  // 이 안에서 데이터 가져와야 할 듯. id같은것만 뭐 상태관리든 props든으로 가져와서

  const [updateFn, setUpdateFn] = useAtom(relatedMemoDataAtom);
  useEffect(() => {
    setUpdateFn({
      fn: (dataObject) => {
        Object.entries(dataObject).forEach(([key, value]) => {
          setValue(
            key as 'content' | 'customTemplate' | 'date' | 'tags' | 'title',
            value
          );
        });
      },
    });
  }, []);

  return (
    <>
      <CompoundForm
        onSubmit={handleSubmit((data) => {
          console.log('제출: ', data);
        })}
      >
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div>
            <CompoundForm.Input placeholder="제목" {...register('title')} />
            <div>
              <CompoundForm.Label textContent="종류" />
              <CompoundSegmentControl>
                <CompoundSegmentControl.Button
                  textContent="실제"
                  key={'실제'}
                  type="button"
                />
                <CompoundSegmentControl.Button
                  textContent="설정"
                  key={'설정'}
                  type="button"
                />
              </CompoundSegmentControl>
            </div>
            {getValues('portfolioType') === 'config' ? (
              <>
                <div>
                  <CompoundForm.Label textContent={'연결 설정'} />
                  <Controller
                    name="config"
                    control={control}
                    render={({ field }) => (
                      <CompoundForm.Select
                        {...field}
                        defaultOptions={[{ value: 'deafult', label: '기본' }]}
                        isLoading={false}
                      />
                    )}
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <CompoundForm.Label textContent={'연결 자산'} />
                  <div>
                    <Controller
                      name="asset"
                      control={control}
                      render={({ field }) => (
                        <CompoundForm.Select
                          {...field}
                          defaultOptions={[{ value: 'deafult', label: '기본' }]}
                          isLoading={false}
                        />
                      )}
                    />
                    <CompoundSegmentControl>
                      <CompoundSegmentControl.Button
                        textContent="투입"
                        key={'투입'}
                        type="button"
                      />
                      <CompoundSegmentControl.Button
                        textContent="인출"
                        key={'인출'}
                        type="button"
                      />
                    </CompoundSegmentControl>
                  </div>
                </div>
              </>
            )}

            <div>
              <CompoundForm.Label textContent="날짜" />
              <Controller
                name="date"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CompoundForm.Date
                    onChange={(date) => {
                      onChange(date);
                    }}
                    selected={value}
                    onBlur={onBlur}
                  />
                )}
              />

              {/* <CompoundForm.Date selected={new Date(Date.now())} /> */}
            </div>
            <CompoundForm.InputArea
              // defaultValue=""
              placeholder="본문"
              {...register('content')}
            />
            {/** 태그랑 레이팅 전부 Controller달아줘야 함. 이러려면, 각 컴포넌트의 인터페이스 좀 다듬어야 함. 유연하게 사용할 수 있도록. */}
            <CompoundForm.Tags
              isLoading={false}
              defaultOptions={getValues('tags').map((tagValue) => ({
                value: tagValue,
                label: tagValue,
              }))}
            />
            <CompoundForm.Rating
              maxRate={5}
              rate={getValues('customTemplate')}
              onClick={() => {
                console.log('레이팅 클릭');
              }}
            />
          </div>
          <div>
            <MemoModalSubContent />
          </div>
        </div>
        <CompoundForm.Button style={{ width: '100%' }}>
          저장
        </CompoundForm.Button>
      </CompoundForm>
    </>
  );
};
export default MemoModalContent;
