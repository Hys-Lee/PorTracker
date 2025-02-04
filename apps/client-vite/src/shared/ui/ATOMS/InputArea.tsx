import { FC, forwardRef, TextareaHTMLAttributes } from 'react';

type InputAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

const InputArea: FC<InputAreaProps> = forwardRef(
  ({ ...props }, ref: React.ForwardedRef<null>) => {
    return (
      <textarea
        ref={ref}
        {...props}
        // dangerouslySetInnerHTML={{ __html: innerHTMLContent }}
        // value={value}
        style={{ whiteSpace: 'pre-wrap' }}
        wrap="hard"
      />
    );
  }
);

export default InputArea;
