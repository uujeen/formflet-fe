'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/basic/Button';
import { loginFormSchema, LoginFormSchema } from '@/types/type';
import authLogin from '@/services/api/auth/authLogin';
import PATH from '@/constants/path/Path';
import MESSAGE from '@/constants/Messages';
import Input from '@/components/basic/Input';
import { setAmplitudeUserId, trackAmplitude } from '@/lib/amplitude';
import REGEX from '@/constants/Regexs';
import useToastStore from '@/store/toastStore';
import DenyJoin from '@/components/toast/DenyJoin';
import useAuthLogin from './hooks/useAuthLogin';

export default function Login() {
  const { register, handleSubmit, getValues } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
  });

  const route = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const setToast = useToastStore((state) => state.setToast);
  const { onLoginSuccess } = useAuthLogin();

  /**
   * 로그인 실패시 에러 출력
   * 성공 시 Access Token은 localStorage, Refresh Token은 쿠키에 저장한다.
   * 로그인 정보가 필요한 instance의 헤더에 access token을 authorization에 defualt 값으로 저장한다.
   * Access Token이 만료 시간이 되기 전에 refresh token이 있을 경우 Silent Refresh 로직을 실행하여 사용자의 로그인이 유지되도록 한다.
   * @param data email, password
   */
  const loginFormSubmit: SubmitHandler<LoginFormSchema> = async (
    data: LoginFormSchema,
  ): Promise<void> => {
    await authLogin(data)
      .then((response) => {
        const { accessToken } = response.data.data;
        onLoginSuccess(accessToken);

        setAmplitudeUserId(data.email);
        trackAmplitude('formflet_login_btn_click', { btn_name: '로그인', user_id: data.email });
        route.push(PATH.ROUTE.MYPAGE);
      })
      .catch(() => {
        setErrorMessage(MESSAGE.JOIN_LOGIN.inVaildLogin);
      });
  };

  const handleErrorMessage = () => {
    if (!REGEX.email.test(getValues('email'))) {
      setErrorMessage(MESSAGE.JOIN_LOGIN.inVaildEmail);
    } else if (!REGEX.password.test(getValues('password'))) {
      setErrorMessage(MESSAGE.JOIN_LOGIN.inputPassword);
    } else {
      setErrorMessage('');
    }
  };

  useEffect(() => {
    window.open('/popup', 'popup', 'top=50px, left=50px, width=500px, height=600px');
    return () => trackAmplitude('formflet_login_page_view');
  }, []);

  return (
    <main className="flex flex-col items-center">
      <form className="flex flex-col items-center gap-5" onSubmit={handleSubmit(loginFormSubmit)}>
        <div className="flex flex-col items-center gap-2.5 mb-5">
          <p className="t1-bold text-purple-normal-normal">폼플렛</p>
          <p className="h2-bold text-gray-dark-active">노션으로 쉽게 만드는 온라인 전단지</p>
        </div>
        <div className="flex flex-col justify-center items-start gap-2.5">
          <label className="b1-bold text-gray-dark-active" htmlFor="email">
            이메일 아이디
          </label>
          <Input
            id="email"
            type="text"
            placeholder={MESSAGE.JOIN_LOGIN.inputEmail}
            {...register('email')}
          />
        </div>
        <div className="flex flex-col justify-center items-start gap-2.5">
          <label className="b1-bold text-gray-dark-active" htmlFor="password">
            비밀번호
          </label>
          <Input
            id="password"
            type="password"
            placeholder={MESSAGE.JOIN_LOGIN.inputPassword}
            {...register('password')}
          />
          <div className="flex flex-row justify-between w-full">
            {errorMessage ? (
              <span className="b2 text-semantic-danger-normal">{errorMessage}</span>
            ) : (
              <span />
            )}

            <Link className="underline b2 text-gray-normal-normal" href={PATH.ROUTE.PASSWORD}>
              비밀번호 재설정
            </Link>
          </div>
        </div>
        <Button
          className="flex bg-purple-normal-normal box-shadow-normal w-[502px] h-14 justify-center items-center rounded-lg"
          id="btn-login"
          type="submit"
          onClick={() => handleErrorMessage()}
        >
          <p className="text-white b1-bold">로그인</p>
        </Button>
        <hr className="flex items-center self-stretch justify-center h-0 text-gray-light-active " />
        <Button
          className="flex w-[502px] h-14 justify-center items-center border border-purple-normal-normal box-shadow-normal rounded-lg"
          onClick={() => setToast(<DenyJoin />)}
        >
          <p className="b1-bold text-purple-normal-normal">회원가입</p>
        </Button>
      </form>
    </main>
  );
}
