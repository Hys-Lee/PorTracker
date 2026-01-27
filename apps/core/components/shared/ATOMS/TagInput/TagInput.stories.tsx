import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import TagInput from './TagInput';
import { useState } from 'react';

const meta: Meta<typeof TagInput> = {
  component: TagInput,
  // 앱 내부이므로 title에 앱 이름을 고정하거나 생략해도 됩니다.
  title: 'ProTracker/TagInput',
  parameters: {
    api: {
      // msw vs. Mock Services 직접 사용
      directMock: false,
    },
  },
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof TagInput>;

export const Primary: Story = {
  args: {},
};
export const NonControlled: Story = {
  args: {
    name: '',
  },
  render: (args) => {
    return (
      <form
        action={(formData) => {
          const formDataObj = Object.fromEntries(formData.entries());
          console.log('formDataObj: ', formDataObj);
          Object.entries(formDataObj).forEach(([key, val]) => {
            console.log('form key, val: ', key, val);
          });
        }}
      >
        <TagInput {...args} name="tags" />
        <button>서브밋</button>
      </form>
    );
  },
};
export const Controlled: Story = {
  args: {},
  render: () => {
    const [tags, setTags] = useState<string[]>([]);

    return (
      <TagInput
        value={tags}
        onChange={(tags) => {
          console.log('newtags: ', tags);
          setTags(tags);
        }}
      />
    );
  },
};
