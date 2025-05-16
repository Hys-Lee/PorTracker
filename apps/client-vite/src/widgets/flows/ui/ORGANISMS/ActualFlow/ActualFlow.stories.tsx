import { FormProvider, useForm } from 'react-hook-form';
import ActualFlow from './ActualFlow';
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from '@tanstack/react-query';

export default {
  component: ActualFlow,
  title: 'Widgets/Flows/ORGANISMS/ActualFlow',
  tags: ['autodocs'],
  //👇 "Data"로 끝나는 export들은 스토리가 아닙니다.
  excludeStories: /.*Data$/,
  // args: {  },
};

const Template = (args) => {
  const methods = useForm();
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <FormProvider {...methods}>
        <div
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <ActualFlow {...args} />
        </div>
      </FormProvider>
    </QueryClientProvider>
  );
};
export const Default = Template.bind({});
