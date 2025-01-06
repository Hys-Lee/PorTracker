import InputLine from '../../ATOMS/InputLine';
import CompoundFormInputArea from './CompoundFormInputArea';
import CompoundFormLabel from './CompoundFormLabel';
import CompoundFormMain from './CompoundFormMain';
import CompoundFormRating from './CompoundFormRating';
import CompoundFormTags from './CompoundFormTags';

const CompoundForm = Object.assign(CompoundFormMain, {
  Label: CompoundFormLabel,
  InputArea: CompoundFormInputArea,
  Rating: CompoundFormRating,
  Tags: CompoundFormTags,
  Input: InputLine,
});
export default CompoundForm;
