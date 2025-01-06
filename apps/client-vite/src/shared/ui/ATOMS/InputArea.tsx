import { FC, TextareaHTMLAttributes } from 'react';

interface InputAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
}

const InputArea: FC<InputAreaProps> = ({ value, ...props }) => {
  return (
    <textarea
      {...props}
      // dangerouslySetInnerHTML={{ __html: innerHTMLContent }}
      value={value}
      style={{ whiteSpace: 'pre-line' }}
      wrap="hard"
    />
  );
};

export default InputArea;
