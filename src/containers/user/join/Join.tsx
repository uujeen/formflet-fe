'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AxiosResponse } from 'axios';
import clsx from 'clsx';
import Button from '@/components/basic/Button';
import { JoinFormSchema, joinFormSchema } from '@/types/type';
import userJoin from '@/services/api/users/userJoin';
import userVerifyCode from '@/services/api/users/userVerifyCode';
import userJoinVerifyEmail from '@/services/api/users/userJoinVerifyEmail';
import DropDownGroup from '@/components/common/dropDownGroup';
import JoinAgree from './JoinAgree';
import Input from '@/components/basic/Input';
import Spinner from '@/components/common/Spinner';
import JOB_LIST from '@/constants/jobs/JobList';
import MESSAGE from '@/constants/Messages';
import PATH from '@/constants/path/Path';
import REGEX from '@/constants/Regexs';
import { trackAmplitude } from '@/lib/amplitude';
import useToastStore from '@/store/toastStore';
import FailedVerifyEmailToast from '@/components/toast/FailedVerifyEmailToast';
import SendEmailToast from '@/components/toast/SendEmailToast';
import DenyJoin from '@/components/toast/DenyJoin';

export default function Join() {
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors, touchedFields },
  } = useForm<JoinFormSchema>({
    resolver: zodResolver(joinFormSchema),
  });
  const route = useRouter();
  const [joinButtonState, setJoinButtonState] = useState<boolean>(false);
  const [isMailSent, setIsMailSent] = useState<boolean>(false);
  const [isLoadingMail, setIsLoadingMail] = useState<boolean>(false);
  const [emailState, setEmailState] = useState({
    message: '',
    state: false,
  });

  const setToast = useToastStore((state) => state.setToast);

  const isVaildEmail = async () => {
    const email = getValues('email');
    if (!email) {
      return;
    }
    setIsLoadingMail(true);
    await userJoinVerifyEmail(email)
      .then(() => {
        setToast(<SendEmailToast type="success" />);
        setIsMailSent(true);
        setIsLoadingMail(false);
        setEmailState({ message: '', state: false });
        setTimeout(() => setIsMailSent(false), 300000);
      })
      .catch((error) => {
        const { response }: { response: AxiosResponse } = error;
        setIsLoadingMail(false);
        setToast(<SendEmailToast type="failed" />);
        if (response.status === 409) {
          setEmailState({ message: MESSAGE.JOIN_LOGIN.alreadyUsedEmail, state: false });
        } else {
          setEmailState({ message: MESSAGE.JOIN_LOGIN.serverError, state: false });
        }
      });
  };

  const isVaildCode = async () => {
    const email = getValues('email');
    const code = document.querySelector<HTMLInputElement>('input[id="code"]')?.value;
    const data = {
      email,
      code: Number(code),
    };

    if (code) {
      await userVerifyCode(data)
        .then(() => {
          setEmailState({ message: MESSAGE.JOIN_LOGIN.vaildEmail, state: true });
        })
        .catch(() => setEmailState({ message: MESSAGE.JOIN_LOGIN.inVaildEmailCode, state: false }));
    }
  };

  const handleVaildEmailToast = () => {
    if (!emailState.state) {
      setToast(<FailedVerifyEmailToast />);
    }
  };

  const joinFormSubmit: SubmitHandler<JoinFormSchema> = async (data: JoinFormSchema) => {
    try {
      const response = await userJoin(data);
      if (response) {
        trackAmplitude('formflet_signup_complete_click', { btn_name: '회원가입' });
        route.push(PATH.ROUTE.LOGIN);
      }
    } catch (e) {
      console.error('[ERROR] 회원가입에 실패하셨습니다!', e);
    }
  };

  return (
    <main className="flex flex-col items-center">
      <form
        className="flex flex-col items-center gap-5 mb-[60px]"
        onSubmit={handleSubmit(joinFormSubmit)}
      >
        <div className="flex flex-col items-center gap-2.5 mb-5">
          <p className="t1-bold text-purple-normal-normal">폼플렛</p>
          <p className="h2-bold text-gray-dark-active">회원가입</p>
        </div>
        <div className="flex flex-col justify-center items-start gap-2.5">
          <label className="b1-bold text-gray-dark-active" htmlFor="email">
            이메일 아이디
          </label>
          <div className="flex justify-between gap-3">
            <input
              className="flex w-[332px] h-14 items-center px-8 py-4 shrink-0 border border-gray-normal-normal box-shadow-normal focus:box-active-shadow-normal placeholder:text-gray-light-active text-gray-dark-hover rounded-lg"
              id="email"
              type="text"
              autoComplete="off"
              onInput={() => setToast(<DenyJoin />)}
              placeholder={MESSAGE.JOIN_LOGIN.inputEmail}
              {...register('email')}
            />
            <Button
              className={clsx(
                'flex w-40 h-14 justify-center items-center px-2 py-4 shrink-0 bg-purple-normal-normal box-shadow-normal rounded-lg gap-1.5',
                { 'opacity-30': isMailSent },
              )}
              id="btn-checkEmail"
              type="button"
              disabled
              onClick={() => isVaildEmail()}
            >
              {!isLoadingMail ? <p className="text-white b1-bold">인증 메일 전송</p> : <Spinner />}
            </Button>
          </div>
          {isMailSent && (
            <div className="flex justify-between items-end gap-2.5">
              <input
                className="flex w-[334px] h-14 items-center px-8 py-4 shrink-0 border border-gray-normal-normal box-shadow-normal focus:box-active-shadow-normal placeholder:text-gray-light-active text-gray-dark-hover rounded-lg"
                id="code"
                type="text"
                autoComplete="off"
              />
              <Button
                className={clsx(
                  'flex w-40 h-14 justify-center items-center px-2 py-4 shrink-0 bg-purple-normal-normal box-shadow-normal rounded-lg gap-1.5',
                  { 'opacity-30': emailState.state },
                )}
                id="btn-checkEmail"
                type="button"
                disabled={emailState.state}
                onClick={() => isVaildCode()}
              >
                <p className="text-white b1-bold">인증 확인</p>
              </Button>
            </div>
          )}
          {emailState.message && (
            <p
              className={`b2  ${
                emailState.state === true
                  ? `text-semantic-success-dark`
                  : `text-semantic-danger-normal`
              }`}
            >
              {emailState.message}
            </p>
          )}
        </div>
        <div className="flex flex-col items-start justify-center gap-3">
          <div className="flex flex-col justify-center items-start gap-2.5">
            <label className="b1-bold text-gray-dark-active" htmlFor="password">
              비밀번호
            </label>
            <input
              className="flex w-[504px] h-14 items-center gap-2.5 px-8 py-4 border border-gray-normal-normal text-gray-dark-hover placeholder:text-gray-light-active box-shadow-normal focus:box-active-shadow-normal rounded-lg"
              id="password"
              type="password"
              autoComplete="off"
              placeholder={MESSAGE.JOIN_LOGIN.inputPassword}
              {...register('password')}
              onFocus={handleVaildEmailToast}
            />
          </div>
          {((touchedFields.password && !REGEX.password.test(watch('password'))) ||
            errors.password?.message) && (
            <p className="b2 text-semantic-danger-normal">
              {
                (errors.password?.message,
                '영문, 숫자, 특수문자 포함 8~15자 양식에 맞춰 입력해주세요.')
              }
            </p>
          )}
        </div>
        <div className="flex flex-col items-start justify-center gap-3">
          <div className="flex flex-col items-start gap-2.5">
            <label className="b1-bold text-gray-dark-active" htmlFor="checkPassword">
              비밀번호 확인
            </label>
            <Input
              id="checkPassword"
              type="password"
              placeholder={MESSAGE.JOIN_LOGIN.inputcheckPassword}
              {...register('checkPassword')}
            />
          </div>
          {errors.password?.message && (
            <p className="b2 text-semantic-danger-normal">{errors.checkPassword?.message}</p>
          )}
        </div>
        <div className="flex flex-col items-start gap-2.5">
          <label className="b1-bold text-gray-dark-active" htmlFor="name">
            이름
          </label>
          <Input
            id="name"
            type="text"
            placeholder={MESSAGE.JOIN_LOGIN.inputName}
            {...register('name')}
          />
        </div>
        <div className="flex flex-col items-start gap-2.5">
          <label className="b1-bold text-gray-dark-active" htmlFor="mobile">
            휴대폰
          </label>
          <Input
            id="mobile"
            type="text"
            placeholder={MESSAGE.JOIN_LOGIN.inputMobile}
            {...register('mobile')}
          />
        </div>
        <DropDownGroup id="job" items={JOB_LIST} label="직무" {...register('job')} />
        <JoinAgree setStateBoolean={setJoinButtonState} />
        <Button
          className="flex bg-purple-normal-normal box-shadow-normal w-[502px] h-14 justify-center items-center rounded-lg disabled:bg-gray-normal-normal disabled:text-gray-normal-normal"
          id="btn-join"
          type="submit"
          disabled={
            !emailState.state ||
            getValues('password') === '' ||
            getValues('name') === '' ||
            getValues('mobile').length !== 13 ||
            getValues('job') === '' ||
            !joinButtonState
          }
        >
          <p className="text-white b1-bold">회원가입</p>
        </Button>
      </form>
    </main>
  );
}
