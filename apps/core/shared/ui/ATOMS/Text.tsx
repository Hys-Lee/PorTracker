import { FC, HTMLAttributes } from 'react';

interface TextProps
  extends HTMLAttributes<HTMLParagraphElement | HTMLHeadElement> {
  as: 'h2' | 'p';
  textContent: string;
}

const Text: FC<TextProps> = ({ as, textContent, ...props }) => {
  return (
    <>
      {as === 'h2' ? (
        <h2 {...props}>{textContent}</h2>
      ) : (
        <p {...props}>{textContent}</p>
      )}
    </>
  );
};

export default Text;
