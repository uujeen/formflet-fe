'use client';

import { useEffect, useState } from 'react';
import PageList from './PageList';
import RegisterPage from './RegisterPage';
import Button from '@/components/basic/Button';
import PlusCircle from '../../../public/svg/PlusCircle';
import { getAmplitudeUserId, trackAmplitude } from '@/lib/amplitude';
import ArrowDown from '../../../public/svg/ArrowDown';
import pages from '@/services/api/pages/pages';

export default function MyPageContainer() {
  const [openRegisterForm, SetOpenRegisterForm] = useState(false);
  const [isVisibled, setIsVisibled] = useState('visible');
  const [isVisiblityGuide, setIsVisiblityGuide] = useState(false);
  const handleOpenForm = () => {
    const userId = getAmplitudeUserId();
    if (userId) {
      trackAmplitude('formflet_myweb_pageadd_btn_click', {
        user_id: userId,
        btn_name: '웹페이지 추가하기',
      });
    }

    SetOpenRegisterForm(!openRegisterForm);
    setIsVisibled('hidden');
  };

  const [pageList, setPageList] = useState<PageList[]>([]);

  const handleHiddenToolBox = (e: MouseEvent) => {
    const clickedDiv = e.currentTarget;
    const toolBoxes = document.querySelectorAll('div[id="tool-box"]');
    toolBoxes.forEach((toolBox) => {
      if (toolBox !== clickedDiv && toolBox.classList.contains('visible')) {
        if (toolBox.classList.contains('visible')) {
          toolBox.classList.replace('visible', 'invisible');
        }
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await pages();

      const { data } = response.data;

      if (data.length >= 3) {
        setIsVisibled('hidden');
      } else {
        setIsVisibled('visible');
      }

      setPageList(data);
    };

    fetchData().catch(() => {});

    window.addEventListener('click', (e) => handleHiddenToolBox(e));

    return () => {
      window.removeEventListener('click', (e) => handleHiddenToolBox(e));
    };
  }, []);

  useEffect(() => {
    if (pageList.length === 0) {
      setIsVisiblityGuide(true);
    } else {
      setIsVisiblityGuide(false);
    }
  }, [pageList]);

  return (
    <div className="flex flex-col items-center gap-5 px-[87px] py-20">
      {isVisiblityGuide && !openRegisterForm && (
        <div className="flex flex-col items-center gap-5">
          <p className="h2-bold text-gray-normal-normal">폼플렛에 오신 것을 환영합니다</p>
          <p className="b1 text-gray-normal-normal">아직 편집할 수 있는 웹페이지가 없어요!</p>
          <p className="b1 text-gray-normal-normal">
            웹페이지 추가하기 버튼을 눌러 웹페이지를 먼저 생성해주세요.
          </p>
          <ArrowDown />
        </div>
      )}
      <Button
        className={`flex w-[850px] h-[108px] justify-center items-center box-shadow-normal bg-white border border-gray-light-active hover:box-active-shadow-normal px-8 py-4 rounded-lg border-solid gap-2 visiblity: ${isVisibled} text-gray-normal-normal`}
        onClick={() => handleOpenForm()}
      >
        웹페이지 추가하기
        <PlusCircle color="#9FA0A0" />
      </Button>
      {openRegisterForm && <RegisterPage />}
      <PageList pageList={pageList} />
    </div>
  );
}
