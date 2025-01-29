import { FormProvider, useForm } from 'react-hook-form';
import RealFlow from './RealFlow';

export default {
  component: RealFlow,
  title: 'RealFlow',
  tags: ['autodocs'],
  //👇 "Data"로 끝나는 export들은 스토리가 아닙니다.
  excludeStories: /.*Data$/,
  // args: {  },
};

const Template = (args) => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <div
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <RealFlow {...args} />
      </div>
    </FormProvider>
  );
};
export const Default = Template.bind({});
