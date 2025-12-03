import { FormProvider, useForm } from 'react-hook-form';
import MemoTile from './MemoContents';

export default {
  component: MemoTile,
  title: 'Widgets/Flows/ORGANISMS/MemoTile',
  tags: ['autodocs'],
  //👇 "Data"로 끝나는 export들은 스토리가 아닙니다.
  excludeStories: /.*Data$/,
  // args: {  },
};

const Template = (args) => {
  const methods = useForm({
    defaultValues: {
      title: '',
      content: '',
      tags: [],
    },
  });

  return (
    <FormProvider {...methods}>
      <div
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <MemoTile {...args} />
      </div>
    </FormProvider>
  );
};
export const Default = Template.bind({});
