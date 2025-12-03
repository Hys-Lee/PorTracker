import { FormProvider, useForm } from 'react-hook-form';
import ActualPortTile from './ActualPortfolioContents';

export default {
  component: ActualPortTile,
  title: 'Widgets/Flows/ORGANISMS/ActualPortTile',
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
        <ActualPortTile {...args} type="withdrawal" />
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
