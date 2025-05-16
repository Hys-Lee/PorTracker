import Text from 'src/shared/ui/ATOMS/Text';
import CompoundForm from 'src/shared/ui/MOLECULES/CompoundForm/CompoundForm';
import CompoundSegmentControl from 'src/shared/ui/MOLECULES/CompoundSegmentControl/CompoundSegmentControl';
import Tile from 'src/shared/ui/ATOMS/Tile';
import { Controller, useForm, useFormContext } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { css } from '@styled-system/css';
import { useState } from 'react';
import { memoMinSchema } from 'src/shared/forms/memoSchema';
import {
  FieldDefaultStyle,
  FormContentsDefaultStyle,
  FormControlDefaultStyle,
  LabelDefaultStyle,
} from './commonStyles';

const MemoContents = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <section>
      <div style={{ display: 'flex', justifyContent: 'start', width: '100%' }}>
        <Text as="h2" textContent={'메모'} style={{ fontWeight: 'bold' }} />
      </div>
      {/* <CompoundForm
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            width: '100%',
          }}
        > */}
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
            console.log('TAGSVALEU: ', value);
            return (
              <CompoundForm.Tags
                // value={value}
                // value={['1', '2']}
                defaultValue={[{ value, label: value }]}
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
