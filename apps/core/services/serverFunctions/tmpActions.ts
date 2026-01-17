'use server';

export const tmpAction = async (formData: FormData) => {
  console.log('서버 액션');
  formData.forEach((value, key) => {
    console.log('key,value: ', key, value);
  });
};
