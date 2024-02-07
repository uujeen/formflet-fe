'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import Button from '@/components/basic/Button';
import pageRegister from '@/services/api/pages/pageRegister';
import { PageUrlFormSchema, pageUrlFormSchema } from '@/types/type';
import PlusCircle from '../../../public/svg/PlusCircle';
import Input from '@/components/basic/Input';
import PATH from '@/constants/path/Path';
import Spinner from '@/components/common/Spinner';
import Chevron from '../../../public/svg/Chevron';
import { getAmplitudeUserId, trackAmplitude } from '@/lib/amplitude';

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PageUrlFormSchema>({
    resolver: zodResolver(pageUrlFormSchema),
  });
  const route = useRouter();
  const [loading, setLoading] = useState(false);
  const [domainErrorMessage, setDomainErrorMessage] = useState('');
  const [notionErrorMessage, setNotionErrorMessage] = useState('');

  const pageFormSubmit: SubmitHandler<PageUrlFormSchema> = async (
    data: PageUrlFormSchema,
  ): Promise<void> => {
    setDomainErrorMessage('');
    setNotionErrorMessage('');
    if (loading) return;

    setLoading(true);

    const res = await axios.post<{ page: Record<string, object> }>('/api/notion', {
      url: data.url,
    });
    const content = JSON.stringify(res.data.page);
    await pageRegister({
      ...data,
      content,
    })
      .then((response) => {
        const path = response.data.data.id;
        route.push(`${PATH.ROUTE.EDIT}/${path}`);

        const userId = getAmplitudeUserId();
        if (userId) {
          trackAmplitude('formflet_myweb_add_btn_click', { user_id: userId, btn_name: '추가하기' });
        }
      })
      .catch((error: AxiosError) => {
        if (error.response?.status === 500) {
          setNotionErrorMessage(
            '서버에 예기치 못한 오류가 발생했습니다. 다시 시도해주시기 바랍니다. 에러 반복 시 문의 부탁드리겠습니다.',
          );
        } else if (error.response?.status === 409) {
          setDomainErrorMessage('이미 사용중인 웹페이지 주소입니다.');
        } else {
          setNotionErrorMessage(
            '예기치 못한 오류가 발생했습니다. 화면을 캡쳐 후 문의 해주시면 도와드리겠습니다.',
          );
        }
        setLoading(false);
      });

    setLoading(false);
  };

  return (
    <form
      className="flex w-[850px] flex-col items-end gap-5 border border-gray-light-active box-shadow-normal px-8 py-6 rounded-lg border-solid"
      onSubmit={handleSubmit(pageFormSubmit)}
    >
      <div className="flex flex-col justify-center items-start gap-2.5 self-stretch">
        <p className="b1-bold text-gray-dark-active">웹페이지 이름</p>
        <p className="b2 text-gray-dark-normal">웹페이지를 식별할 수 있는 이름을 지어주세요!</p>
        <Input
          className="flex w-[786px] h-10 justify-end items-center gap-2.5 border border-gray-normal-normal box-shadow-normal focus:box-active-shadow-normal text-gray-dark-hover px-5 py-4 rounded-lg border-solid"
          key="title"
          id="title"
          {...register('title')}
        />
      </div>
      <div className="flex flex-col justify-center items-start gap-2.5 self-stretch">
        <p className="b1-bold text-gray-dark-active">웹페이지 주소</p>
        <p className="b2 text-gray-dark-normal">
          나만의 웹페이지의 주소를 입력해주세요! 이 주소는 한번 설정하면 바꿀 수 없어요.
        </p>
        <div className="flex flex-col items-start gap-2.5">
          <div className="flex items-end gap-2.5">
            <Input
              className="flex w-[677px] h-10 justify-end items-center gap-2.5 border border-gray-normal-normal box-shadow-normal focus:box-active-shadow-normal text-gray-dark-hover placeholder:text-gray-light-active px-5 py-4 rounded-lg border-solid"
              key="domain-url"
              id="domain-url"
              placeholder="영문, 숫자, 하이픈만 사용 가능"
              {...register('domain')}
            />
            <p className="b1 text-gray-normal-normal">.formflet.co/</p>
          </div>
          {(errors.domain?.message || domainErrorMessage) && (
            <p className="b2 text-semantic-danger-normal">
              {errors.domain?.message || domainErrorMessage}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col justify-center items-start gap-2.5 self-stretch">
        <p className="b1-bold text-gray-dark-active">노션 링크</p>
        <div className="flex items-center gap-2.5">
          <p className="b2 text-gray-dark-normal">
            노션에서 공유 버튼을 눌러 &apos;웹에서 공유&apos; 상태로 만들어 주어야 폼플렛이
            웹페이지를 만들 수 있어요!
          </p>
          <Button
            type="button"
            className="flex items-center whitespace-nowrap"
            onClick={() => window.open('https://share.formflet.co/')}
          >
            <p className=" b2-bold tray-gray-dark-active underline">자세히</p>
            <Chevron />
          </Button>
        </div>
        <div className="flex flex-col gap-2.5">
          <Input
            className="flex w-[786px] h-10 justify-end items-center border border-gray-normal-normal box-shadow-normal focus:box-active-shadow-normal text-gray-dark-hover placeholder:text-gray-light-active px-5 py-4 rounded-lg border-solid"
            key="notion-url"
            id="notion-url"
            placeholder="notion.so/formflet/"
            {...register('url')}
          />
          {(errors.url?.message || notionErrorMessage) && (
            <p className="b2 text-semantic-danger-normal">
              {errors.url?.message || notionErrorMessage}
            </p>
          )}
        </div>
      </div>
      <Button
        className="flex w-[133px] justify-center h-10 items-center gap-2.5 box-shadow-normal bg-purple-normal-normal px-5 py-4 rounded-lg"
        type="submit"
      >
        {loading ? (
          <Spinner />
        ) : (
          <>
            <p className="text-white b1-bold whitespace-nowrap">추가하기</p>
            <PlusCircle color="white" />
          </>
        )}
      </Button>
    </form>
  );
}
