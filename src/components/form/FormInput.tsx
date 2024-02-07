'use client';

import clsx from 'clsx';

interface FormInputProps {
  content: string;
  count: number;
  userPlatForm: 'pc' | 'mobile';
}

export default function FormInput({ content, count, userPlatForm }: FormInputProps) {
  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`; // 콘텐츠 높이에 맞게 조정
  };

  return (
    <textarea
      className={clsx(
        'appearance-none h-[40px] self-stretch resize-none overflow-hidden border border-gray-normal-normal box-shadow-normal focus:outline-none focus:box-active-shadow-normal px-5 py-2 rounded-lg',
        userPlatForm === 'pc' ? 'w-[677px]' : 'w-full',
      )}
      placeholder={content}
      name={`answer${count}`}
      onInput={(e) => handleInput(e)}
    />
  );
}
