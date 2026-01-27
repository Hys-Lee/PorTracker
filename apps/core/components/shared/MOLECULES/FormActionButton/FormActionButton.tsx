import Button from '../../ATOMS/Button/Button';
import * as stylex from '@stylexjs/stylex';
import { colors } from '../../../../tokens/colors.stylex';

const FormActionButton = ({
  mode,
  formId,
  name,
}: {
  mode: 'add' | 'modify';
  formId: string;
  name: string;
}) => {
  return (
    <>
      {mode === 'add' ? (
        <Button
          variant="solid"
          rounded="normal"
          type="submit"
          form={formId}
          name={name}
          value={'add'}
        >
          추가
        </Button>
      ) : (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            variant="outlined"
            rounded="normal"
            buttonStylex={{ ...btnStyles.base, ...btnStyles.delete }}
            type="submit"
            form={formId}
            name={name}
            value={'delete'}
          >
            삭제
          </Button>
          <Button
            variant="solid"
            rounded="normal"
            buttonStylex={btnStyles.base}
            type="submit"
            form={formId}
            name={name}
            value={'modify'}
          >
            저장
          </Button>
        </div>
      )}
    </>
  );
};

const btnStyles = stylex.create({
  base: { flexGrow: 1 },
  delete: {
    boxShadow: `inset 0 0 0 1px rgb(from ${colors.loss} r g b / 0.7)`,
    color: `rgb(from ${colors.loss} r g b / 0.7)`,
  },
});

export default FormActionButton;
