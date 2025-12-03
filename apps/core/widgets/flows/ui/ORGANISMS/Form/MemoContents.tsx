import Text from 'src/shared/ui/ATOMS/Text';
import CompoundForm from 'src/shared/ui/MOLECULES/CompoundForm/CompoundForm';
import { Controller, useFormContext } from 'react-hook-form';
import {
  FormContentsDefaultStyle,
  FormControlDefaultStyle,
} from './commonStyles';

const MemoContents = () => {
  const { register, control } = useFormContext();

  return (
    <section>
      <div style={{ display: 'flex', justifyContent: 'start', width: '100%' }}>
        <Text as="h2" textContent={'메모'} style={{ fontWeight: 'bold' }} />
      </div>
      <div className={FormContentsDefaultStyle}>
        <div>
          <CompoundForm.Input
            {...register('title')}
            placeholder="제목"
            className={FormControlDefaultStyle}
            style={{
              textAlign: 'center',
              outline: 'none',
              borderBottom: '1px solid gray',
              borderRadius: '0',
            }}
            maxLength={20}
          />
        </div>

        <CompoundForm.InputArea
          {...register('content')}
          defaultValue=""
          placeholder="본문"
          maxLength={1000}
        />
        <Controller
          name="tags"
          control={control}
          render={({ field: { value, onChange } }) => {
            const tagValues = (value as string[]).map((eachVal) => ({
              value: eachVal,
              label: eachVal,
            }));
            return (
              <CompoundForm.Tags
                defaultValue={tagValues}
                onChange={(newValue) => onChange(newValue)}
                isLoading={false}
              />
            );
          }}
        />

        {/* <CompoundForm.Rating
            maxRate={5}
            rate={3}
            onClick={() => {
              console.log('레이팅 클릭');
            }}
          /> */}
        {/* </CompoundForm> */}
      </div>
    </section>
  );
};
export default MemoContents;
