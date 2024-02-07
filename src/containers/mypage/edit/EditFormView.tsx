'use client';

import { useEffect, useState } from 'react';
import Button from '@/components/basic/Button';
import ArrowRightCircle from '../../../../public/svg/ArrowRightCircle';
import FormRadio from '@/components/form/FormRadio';
import FormCheckbox from '@/components/form/FormCheckbox';
import MadeLogo from '@/components/MadeLogo';
import FormInput from '@/components/form/FormInput';
import { useFormStore } from '@/store/store';

export default function EditFormView() {
  const formStore = useFormStore();
  let formSplit = formStore.form.split('\n');
  let count = 0;
  const [selectedRadio, setSelectedRadio] = useState(new Map<number, string>());

  const handleRadioChange = (cnt: number, value: string) => {
    setSelectedRadio(new Map(selectedRadio.set(cnt, value)));
  };
  const handleInput = (content: string) => {
    return <FormInput content={content} count={count} userPlatForm="pc" />;
  };

  const handleRadio = (text: string) => {
    const items = text.split('_');
    const item = items.map((value) => {
      return (
        <FormRadio
          key={value}
          value={value}
          count={count}
          selectedRadio={selectedRadio}
          onRadioChange={handleRadioChange}
          userPlatForm="pc"
        />
      );
    });
    return <div className="flex flex-col gap-2.5">{item}</div>;
  };

  const handleCheckbox = (text: string) => {
    const items = text.split('_');
    const item = items.map((value) => {
      return <FormCheckbox key={value} value={value} count={count} userPlatForm="pc" />;
    });
    return <div className="flex flex-col gap-2.5">{item}</div>;
  };

  const handleForm = (text: string) => {
    const space = text.indexOf(' ');
    const command = text.substring(0, space);
    const content = text.substring(space + 1);

    switch (command) {
      // Question
      case '[질문]':
        return (
          <div className="w-[677px]">
            <p className="h3-bold text-gray-dark-active">Q. {content}</p>
          </div>
        );
      case '[질문_*]':
        return (
          <div className="w-[677px]">
            <p className="h3-bold text-gray-dark-active">Q. {content}*</p>
          </div>
        );

      // Answer
      case '[주관식]':
        count += 1;
        return handleInput(content);
      case '[객관식]':
        count += 1;
        return handleRadio(content);
      case '[객관식_복수]':
        count += 1;
        return handleCheckbox(content);
      case '[파일]':
        count += 1;
        return <input type="file" accept=".pdf" name={`answer${count}`} />;

      // Text
      case '[텍스트]':
        return (
          <div className="w-[677px]">
            <p className="b1 text-gray-dark-active">{content}</p>
          </div>
        );
      default:
        return null;
    }
  };
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    return null;
  };

  useEffect(() => {
    formSplit = formStore.form.split('\n');
  }, [formStore.form]);

  return (
    <form className="flex flex-col items-start gap-5 flex-[1_0_0] self-stretch rounded-[0px_8px_8px_0px]">
      <div className="w-[677px]">
        <p className="h1-bold text-gray-dark-active">
          {formStore.formTitle ? formStore.formTitle : '제목을 입력해주세요.'}
        </p>
      </div>
      <hr className="self-stretch text-gray-light-active" />
      {formSplit.map((item) => {
        const content = handleForm(item);
        return <div key={item}>{content}</div>;
      })}
      <Button
        type="submit"
        disabled
        onClick={(e) => handleSubmit(e)}
        className="flex h-14 items-center gap-2.5 box-shadow-normal bg-gray-darker px-8 py-4 rounded-lg"
      >
        <p className="text-white b1-bold">제출하기</p>
        <ArrowRightCircle color="white" />
      </Button>
      <MadeLogo />
    </form>
  );
}
