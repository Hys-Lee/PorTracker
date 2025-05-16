import { FormProvider, useForm } from 'react-hook-form';
import ActualTile from './ActualTile';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default {
  component: ActualTile,
  title: 'Widgets/Flows/ORGANISMS/ActualTile',
  tags: ['autodocs'],
  //👇 "Data"로 끝나는 export들은 스토리가 아닙니다.
  excludeStories: /.*Data$/,
  // args: {  },
};

const Template = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <ActualTile defaultTransactionType="withdrawal" />
      </div>
    </QueryClientProvider>
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
