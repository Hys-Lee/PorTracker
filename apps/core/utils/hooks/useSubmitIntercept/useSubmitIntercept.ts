import { useEffect, useRef } from 'react';

/**
 *
 * @param submitInterceptor : 대상 input에 대한 submit 시 액션
 * @param form : 등록할 form id
 * @returns input ref
 */

type SubmitInterceptor = (inputElement: HTMLInputElement) => void;

const useSubmitIntercept = (
  submitInterceptor: SubmitInterceptor,
  form?: string
) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const savedInterseptor = useRef(submitInterceptor);

  useEffect(() => {
    savedInterseptor.current = submitInterceptor;
  }, [submitInterceptor]);

  useEffect(() => {
    const inputElement = inputRef.current;
    if (!inputElement) return;

    const targetForm = form
      ? document.getElementById(form)
      : inputElement.closest('form');

    // form 연결 안된다면 건너뛰기
    if (!targetForm) {
      console.error('연결된 form이 없습니다!');
      return;
    }

    /** 등록 */
    const handleFormSubmit = () => {
      const submitInterseptor = savedInterseptor.current;
      submitInterseptor(inputElement);
    };

    targetForm.addEventListener('submit', handleFormSubmit);

    /** 제거 */
    return () => {
      targetForm.removeEventListener('submit', handleFormSubmit);
    };
  }, [form, inputRef.current]);

  return inputRef;
};

export { useSubmitIntercept };
