import InputLine from '../../ATOMS/InputLine';
import CompoundFormButton from './CompoundFormButton';
import CompoundFormDate from './CompoundFormDate';
import CompoundFormInputArea from './CompoundFormInputArea';
import CompoundFormLabel from './CompoundFormLabel';
import CompoundFormMain from './CompoundFormMain';
import CompoundFormRating from './CompoundFormRating';
import CompoundFormSelect from './CompoundFormSelect';
import CompoundFormTags from './CompoundFormTags';

const CompoundForm = Object.assign(CompoundFormMain, {
  Label: CompoundFormLabel,
  InputArea: CompoundFormInputArea,
  Rating: CompoundFormRating,
  Tags: CompoundFormTags,
  Input: InputLine,
  Date: CompoundFormDate,
  Select: CompoundFormSelect,
  Button: CompoundFormButton,
});
export default CompoundForm;
