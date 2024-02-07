'use client';

import { useState } from 'react';
import { useParams, usePathname } from 'next/navigation';
import axios from 'axios';
import PATH from '@/constants/path/Path';
import Button from './Button';
import CopyIcon from '../../../public/svg/CopyIcon';
import SaveIcon from '../../../public/svg/SaveIcon';
import ReloadIcon from '../../../public/svg/ReloadIcon';
import pageSave from '@/services/api/pages/pageSave';
import { useCtaStore, usePageStore, useFontStore, useFormStore, useOgStore } from '@/store/store';
import EditPageRefreshModal from '../modal/edit/EditPageRefreshModal';
import useModalStore from '@/store/modalStore';
import { getAmplitudeUserId, trackAmplitude } from '@/lib/amplitude';
import Spinner from '../common/Spinner';

export default function NavHeader() {
  const pathName = usePathname();
  const params = useParams();
  const path = params.pageId as string;
  const navList = PATH.ROUTE.NAV_LIST;
  let currentPath = '';
  const setModal = useModalStore((state) => state.setModal);
  const [isSaving, setIsSaving] = useState(false);

  if (pathName.startsWith('/mypage/edit')) {
    currentPath = 'edit';
  } else if (pathName.startsWith('/mypage/data') && path) {
    currentPath = 'data';
  } else {
    currentPath = 'mypage';
  }

  let navItem = '';
  navList.forEach((item) => {
    if (item.href === pathName) {
      navItem = item.text;
    }
  });

  const { domain, url, pageContent, setPageContent } = usePageStore((state) => ({
    domain: state.domain,
    url: state.url,
    pageContent: state.pageContent,
    setPageContent: state.setPageContent,
  }));
  const { font } = useFontStore((state) => ({ font: state.font }));
  const { formStatus, formTitle, form, createForm } = useFormStore((state) => ({
    formStatus: state.formStatus,
    formTitle: state.formTitle,
    form: state.form,
    createForm: state.createForm,
  }));
  const { ctaStatus, ctaContent, ctaLink, ctaFontSize, ctaFontColor, ctaBackColor } = useCtaStore(
    (state) => ({
      ctaStatus: state.ctaStatus,
      ctaContent: state.ctaContent,
      ctaLink: state.ctaLink,
      ctaFontSize: state.ctaFontSize,
      ctaFontColor: state.ctaFontColor,
      ctaBackColor: state.ctaBackColor,
    }),
  );
  const ogStore = useOgStore();

  const handleWindowOpen = () => {
    window.open(`https://${domain}`);
  };

  const handleRefresh = async (): Promise<void> => {
    await axios
      .post<{ page: Record<string, object> }>('/api/notion', {
        url,
      })
      .then((response) => {
        const content = JSON.stringify(response.data.page);
        setPageContent(content);
      });
  };

  const handleSave = async (): Promise<void> => {
    const fontData = { type: font };
    const formData = {
      status: formStatus,
      title: formTitle,
      guide: form,
      createForm,
    };
    const ctaData = {
      status: ctaStatus,
      content: ctaContent,
      link: ctaLink,
      fontSize: ctaFontSize,
      fontColor: ctaFontColor,
      backgroundColor: ctaBackColor,
    };
    const ogData = {
      title: ogStore.ogTitle,
      description: ogStore.ogDescription,
    };

    const data = new FormData();
    data.append('content', pageContent);
    data.append('font', JSON.stringify(fontData));
    data.append('form', JSON.stringify(formData));
    data.append('cta', JSON.stringify(ctaData));
    data.append('og', JSON.stringify(ogData));
    if (ogStore.ogImage) {
      data.append('image', ogStore.ogImage, ogStore.ogName);
    }

    setIsSaving(true);
    await pageSave(path, data).then(() => {
      setIsSaving(false);
      const userId = getAmplitudeUserId();
      if (formStatus && userId) {
        trackAmplitude('formflet_edit_form_create', { is_form: true, user_id: userId });
      } else if (ctaStatus && userId) {
        trackAmplitude('formflet_edit_cta_create', { is_cta: true, user_id: userId });
      }
      alert('성공!');
    });
  };

  return (
    <header className="w-full top-[64px] h-[64px] fixed flex flex-col justify-between items-center shrink-0 z-10 bg-white">
      {currentPath === 'edit' && (
        <div className="w-[850px] justify-center items-center flex gap-5 pt-[12px]">
          <Button
            className="flex w-[544px] h-10 justify-between items-center shrink-0 border border-gray-light-active hover:border-gray-normal-normal box-shadow-normal px-5 py-4 rounded-lg border-solid b1-bold text-gray-dark-active"
            onClick={handleWindowOpen}
          >
            {domain}
            <CopyIcon />
          </Button>
          <Button
            className="flex h-10 items-center gap-2.5 border border-purple-normal-normal box-shadow-normal px-5 py-4 rounded-lg border-solid"
            onClick={() => setModal(<EditPageRefreshModal onClick={handleRefresh} />)}
          >
            <p className="b1 text-purple-normal-normal whitespace-nowrap">불러오기</p>
            <ReloadIcon color="#8000FF" />
          </Button>
          <Button
            className="flex h-10 items-center gap-2.5 border border-purple-normal-normal box-shadow-normal px-5 py-4 rounded-lg border-solid bg-purple-normal-normal"
            onClick={() => handleSave()}
          >
            <p className="text-white b1 whitespace-nowrap">저장하기</p>
            {isSaving ? <Spinner /> : <SaveIcon color="#FFFFFF" />}
          </Button>
        </div>
      )}
      {currentPath === 'mypage' && (
        <div className="w-[850px] h-9 flex justify-between items-center shrink-0 pt-[22px]">
          <p className="b1-bold text-gray-dark-active">{navItem}</p>
        </div>
      )}
      <hr className="self-stretch text-gray-light-active" />
    </header>
  );
}
