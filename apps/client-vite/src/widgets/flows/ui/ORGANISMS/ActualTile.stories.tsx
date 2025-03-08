import { FormProvider, useForm } from 'react-hook-form';
import ActualTile from './ActualTile';

export default {
  component: ActualTile,
  title: 'Widgets/Flows/ORGANISMS/ActualTile',
  tags: ['autodocs'],
  //👇 "Data"로 끝나는 export들은 스토리가 아닙니다.
  excludeStories: /.*Data$/,
  // args: {  },
};

const Template = () => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <div
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <ActualTile defaultTransactionType="withdrawal" />
      </div>
    </FormProvider>
  );
};
export const Default = Template.bind({});

// export const Default = {
//   render: (args) => {
//     const methods = useForm();
//     return (
//       <FormProvider {...methods}>
//         <RealPortTile mode="editable" type="buy" {...args} />;
//       </FormProvider>
//     );
//   },
// };
