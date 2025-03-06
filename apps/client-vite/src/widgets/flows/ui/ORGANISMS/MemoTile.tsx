import Text from 'src/shared/ui/ATOMS/Text';
import CompoundForm from 'src/shared/ui/MOLECULES/CompoundForm/CompoundForm';
import CompoundSegmentControl from 'src/shared/ui/MOLECULES/CompoundSegmentControl/CompoundSegmentControl';
import Tile from 'src/shared/ui/ATOMS/Tile';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { css } from '@styled-system/css';
import { useState } from 'react';

const memoSchema = z.object({
  title: z.string().nonempty(),
  asset: z.string().nonempty(),
  transactionType: z.enum(['allocation', 'withdrawal']),
  date:
    // z.string().nonempty()
    z.date(),
  content: z.string(),
  tags: z.array(z.string()),
  customTemplate: z.number(), // 커스텀 텤플릿. 레인지가 있으니까 넘버일 듯?ㄴㄴ
});
type Memo = z.infer<typeof memoSchema>;

const MemoTile = () => {
  const defaultMemoForm: Memo = {
    title: '',
    asset: '',
    transactionType: 'allocation',
    date: new Date(Date.now()),
    content: '',
    tags: [],
    customTemplate: 0,
  };

  const [memoForm, setMemoForm] = useState<Memo>(defaultMemoForm);

  return (
    <>
      <Tile style={{ borderRadius: '16px', padding: '8px' }}>
        <div
          style={{ display: 'flex', justifyContent: 'start', width: '100%' }}
        >
          <Text as="h2" textContent={'메모'} style={{ fontWeight: 'bold' }} />
        </div>
        <CompoundForm
          // onSubmit={handleSubmit((data) => {
          //   console.log('제출: ', data);
          // })}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            width: '100%',
          }}
        >
          <CompoundForm.Input
            placeholder="제목"
            style={{
              outline: 'none',
              borderBottom: '1px solid gray',
              borderRadius: '0',
            }}
          />
          <div className={FieldDefaultStyle}>
            <CompoundForm.Label textContent={'연결 자산'} />
            <div style={{ flexGrow: 1 }}>
              {/* <Controller
                name="asset"
                control={control}
                render={({ field }) => (
                  <CompoundForm.Select
                    {...field}
                    defaultOptions={[{ value: 'deafult', label: '기본' }]}
                    isLoading={false}
                  />
                )}
              /> */}
              <CompoundForm.Select
                onChange={(newValue) => {
                  setMemoForm((prev) => ({ ...prev, asset: newValue }));
                }}
                defaultOptions={[{ value: 'deafult', label: '기본' }]}
                isLoading={false}
              />
            </div>
          </div>
          <CompoundSegmentControl>
            <CompoundSegmentControl.Button
              textContent="투입"
              key={'투입'}
              type="button"
              style={{
                background:
                  memoForm.transactionType === 'allocation'
                    ? 'white'
                    : 'inherit',
              }}
              onClick={() =>
                setMemoForm((prev) => ({
                  ...prev,
                  transactionType: 'allocation',
                }))
              }
            />
            <CompoundSegmentControl.Button
              textContent="인출"
              key={'인출'}
              type="button"
              style={{
                background:
                  memoForm.transactionType === 'withdrawal'
                    ? 'white'
                    : 'inherit',
              }}
              onClick={() =>
                setMemoForm((prev) => ({
                  ...prev,
                  transactionType: 'withdrawal',
                }))
              }
            />
          </CompoundSegmentControl>
          <div className={FieldDefaultStyle}>
            <CompoundForm.Label textContent="날짜" />
            {/* <Controller
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
            /> */}
            <CompoundForm.Date
              value={memoForm.date.toISOString()}
              onChange={(date) => {
                if (!date) return;
                setMemoForm((prev) => ({ ...prev, date }));
              }}
            />

            {/* <CompoundForm.Date selected={new Date(Date.now())} /> */}
          </div>
          <CompoundForm.InputArea defaultValue="" placeholder="본문" />
          <CompoundForm.Tags isLoading={false} />
          {/* <CompoundForm.Rating
            maxRate={5}
            rate={3}
            onClick={() => {
              console.log('레이팅 클릭');
            }}
          /> */}
          <CompoundForm.Button style={{ height: '32px', width: '100%' }}>
            저장
          </CompoundForm.Button>
        </CompoundForm>
      </Tile>
    </>
  );
};
export default MemoTile;

const FieldDefaultStyle = css({
  '& .react-datepicker-wrapper': {
    display: 'flex !important ',
    flexGrow: 1,
    '& > div': {
      display: 'flex !important ',
      flexGrow: 1,
    },
  },
  display: 'flex',
  flexDirection: 'row',
  gap: '4px',
  alignItems: 'center',
});
