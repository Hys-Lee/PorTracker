import LayeredErrorBoundary from './LayeredErrorBoundary';

export default {
  component: LayeredErrorBoundary,
  title: 'LayeredErrorBoundary',
  tags: ['autodocs'],
  //👇 "Data"로 끝나는 export들은 스토리가 아닙니다.
  excludeStories: /.*Data$/,
  // args: {  },
};

const Template = (args) => {
  const ThrowError = () => {
    throw new Error('에러') as Error;
    return <>에러를 던집니다</>;
  };

  return (
    <LayeredErrorBoundary {...args}>
      <ThrowError />
    </LayeredErrorBoundary>
  );
};
export const Default = Template.bind({});
