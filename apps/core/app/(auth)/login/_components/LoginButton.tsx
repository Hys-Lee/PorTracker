'use client';

import Button from '@core/components/shared/ATOMS/Button/Button';
import FormActionButton from '@core/components/shared/MOLECULES/FormActionButton/FormActionButton';
import { handleLogin } from '@core/libs/supabase/loginHandler';
import { colors } from '@core/tokens/colors.stylex';

import * as stylex from '@stylexjs/stylex';

const LoginButton = () => {
  return (
    <>
      {/* <button
        onClick={() => {
          //   console.log('누름');
          handleLogin();
        }}
      >
        Continue With Google
      </button> */}
      <Button
        onClick={() => {
          handleLogin();
        }}
        rounded="normal"
        variant="solid"
        buttonStylex={buttonStyles.base}
      >
        {'Continue With Google'}
      </Button>
    </>
  );
};

export default LoginButton;

const buttonStyles = stylex.create({
  base: {
    // backgroundColor: `${colors.primaryVariant900}`,
    backgroundColor: {
      default: 'white',
      // ':hover': `rgb( from ${colors.primary} / r g b 0.3 )`,
      ':hover': `rgb(from ${colors.primary} r g b / 0.1)`,
    },
    fontSize: '14px',
    fontWeight: '500',
    color: `${colors.textNormal}`,
    boxShadow: `0 0 0 1px ${colors.primaryVariant700}`,
  },
});
