import { FC, TextareaHTMLAttributes } from 'react';

type InputAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

const InputArea: FC<InputAreaProps> = ({ ...props }) => {
  return (
    <textarea
      {...props}
      // dangerouslySetInnerHTML={{ __html: innerHTMLContent }}
      // value={value}
      style={{ whiteSpace: 'pre-wrap' }}
      wrap="hard"
    />
  );
};

export default InputArea;
