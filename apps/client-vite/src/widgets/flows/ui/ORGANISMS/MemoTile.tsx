import Text from 'src/shared/ui/ATOMS/Text';
import CompoundForm from 'src/shared/ui/MOLECULES/CompoundForm/CompoundForm';
import CompoundSegmentControl from 'src/shared/ui/MOLECULES/CompoundSegmentControl/CompoundSegmentControl';
import Tile from 'src/shared/ui/MOLECULES/Tile';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const memoSchema = z.object({
  title: z.string().nonempty(),
  asset: z.string().nonempty(),
  transactionType: z.enum(['allocation', 'withdrawal']),
  date:
    // z.string().nonempty()
    z.date(),
  price: z.number().positive(),
  currency: z.number().optional(),
  shares: z.number().positive(), // 주식 수량
});
type Memo = z.infer<typeof memoSchema>;

const MemoTile = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Memo>({
    resolver: zodResolver(memoSchema),
    defaultValues: {},
  });

  // 이 안에서 데이터 가져와야 할 듯. id같은것만 뭐 상태관리든 props든으로 가져와서
  return (
    <>
      <Tile>
        <Text as="h2" textContent={'메모'} />
        <CompoundForm
          onSubmit={handleSubmit((data) => {
            console.log('제출: ', data);
          })}
        >
          <CompoundForm.Input placeholder="제목" />
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
          <CompoundForm.InputArea defaultValue="" placeholder="본문" />
          <CompoundForm.Tags isLoading={false} />
          <CompoundForm.Rating
            maxRate={5}
            rate={3}
            onClick={() => {
              console.log('레이팅 클릭');
            }}
          />
          <CompoundForm.Button>저장</CompoundForm.Button>
        </CompoundForm>
      </Tile>
    </>
  );
};
export default MemoTile;
