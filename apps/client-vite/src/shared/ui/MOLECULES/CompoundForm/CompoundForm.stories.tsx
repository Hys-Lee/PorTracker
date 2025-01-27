import CompoundFormRating from './CompoundFormRating';
import CompoundFormTags from './CompoundFormTags';
import CompoundForm from './CompoundForm';
import { flushSync } from 'react-dom';
import CompoundFormButton from './CompoundFormButton';
export default {
  //   component: SegmentControl,
  title: 'CompoundForm',
  tags: ['autodocs'],
  //👇 "Data"로 끝나는 export들은 스토리가 아닙니다.
  excludeStories: /.*Data$/,
  // args: {  },
};

const RatingTemplate = () => (
  <CompoundFormRating
    maxRate={5}
    rate={3}
    onClick={(rate) => {
      alert(rate);
    }}
    allowFraction
  />
);

export const Rating = RatingTemplate.bind({});

const options = [
  {
    value: 'asdf',
    label: 'ASDF',
  },
];

const TagsTemplate = () => (
  <CompoundFormTags isLoading={false} defaultOptions={options} />
);
export const Tags = TagsTemplate.bind({});

const Template = () => (
  <CompoundForm>
    <CompoundForm.Input value={'타이틀'} />
    <div style={{ display: 'flex', gap: '4px' }}>
      <CompoundForm.Label textContent="입력" />
      <CompoundForm.Input value={'입력이에용'} disabled />
    </div>
    <CompoundForm.InputArea
      value={`와우ww 이게 진짜인가? \n 아니면 거짓인가`}
    />
    <CompoundForm.Rating maxRate={5} rate={3} onClick={(rate) => alert(rate)} />
    <CompoundForm.Tags defaultOptions={options} isLoading={false} />
    <CompoundForm.Date selected={new Date(Date.now())} />
    <CompoundForm.Select defaultOptions={options} isLoading={false} />
    <CompoundForm.Button type="button">버튼</CompoundForm.Button>
  </CompoundForm>
);

export const Default = Template.bind({});
