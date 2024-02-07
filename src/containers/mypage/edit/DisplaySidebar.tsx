import { useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import { FontFamily, Fonts, FONT_SIZE } from '@/constants/editProps/EditPageProps';
import { useFormStore, useFontStore, useCtaStore, useOgStore } from '@/store/store';
import EmptyStar from '../../../../public/svg/EmptyStar';
import Toggle from '@/components/basic/Toggle';
import QuestionCircleSmall from '../../../../public/svg/QuestionCircleSmall';
import GarbageCollectionIcon from '../../../../public/svg/GarbageCollectIcon';
import FileUploadIcon from '../../../../public/svg/FileUploadIcon';
import Tooltip from '@/components/common/Tooltip';
import Palette from '@/components/edit/Palette';
import Button from '@/components/basic/Button';
import SelectOptionIcon from '../../../../public/svg/SelectOptionIcon';

export default function DisplaySidebar() {
  const fontStore = useFontStore();
  function onClickFont(name: string) {
    fontStore.setFont(name);
  }
  const [isVisiblePalette, setIsVisiblePalette] = useState({
    font: false,
    backgroud: false,
  });
  const formStatus = useFormStore((state) => state.formStatus);
  const ctaStore = useCtaStore();
  let ctaLinkPlaceholder = '';
  if (formStatus && ctaStore.ctaStatus) {
    ctaLinkPlaceholder = '폼페이지로 이동';
  }
  const ogStore = useOgStore();

  const handleCta = () => {
    if (formStatus) {
      return;
    }
    ctaStore.setCtaStatus(!ctaStore.ctaStatus);
    if (ctaStore.ctaStatus) {
      ctaStore.resetCta();
    }
  };

  const handleCtaOpen = () => {
    ctaStore.setCtaOpen(!ctaStore.ctaOpen);
    setIsVisiblePalette({ font: false, backgroud: false });
  };

  const handleCtaFontColor = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    ctaStore.setCtaFontColor(e.currentTarget.id);
  };

  const handleCtaBackColor = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    ctaStore.setCtaBackColor(e.currentTarget.id);
  };

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      const file = e.target.files[0];
      ogStore.setOgImage(file);
    }
  };

  const handleDeleteImage = () => {
    ogStore.setOgImage(null);
    ogStore.setOgSrc('');
  };

  return (
    <div className="space-y-[20px] p-[20px]">
      <div
        className={clsx(
          'p-[20px] border border-gray-light-active box-shadow-normal rounded-[8px] flex flex-col gap-5 hover:box-active-shadow-normal',
          {
            'translate h-auto duration-300': ctaStore.ctaOpen,
          },
          { 'translate h-[70px] duration-300': !ctaStore.ctaOpen },
        )}
      >
        <div className="flex justify-between">
          <p className="b1-bold text-gray-dark-active">CTA(Call To Action) 버튼</p>
          <Button onClick={handleCtaOpen}>
            <SelectOptionIcon />
          </Button>
        </div>
        <div
          className={clsx('flex flex-col gap-5', {
            block: ctaStore.ctaOpen,
            hidden: !ctaStore.ctaOpen,
          })}
        >
          <div className="flex flex-col gap-[20px] [&>div]:b2 [&>div]:text-gray-dark-active">
            <div key="page-header-form" className="flex items-center gap-[20px]">
              <div className="w-[20px] h-[20px] p-[2px] rounded-[8px] flex items-center justify-center bg-gray-light-normal">
                <EmptyStar />
              </div>
              <p>CTA 버튼 추가</p>
              <div className="ml-auto">
                <Toggle isChecked={ctaStore.ctaStatus} onClick={handleCta} />
              </div>
            </div>
          </div>
          <div className="flex items-center self-stretch justify-center h-0">
            <hr className="flex w-[282px] h-0 justify-center items-center text-gray-light-active" />
          </div>
          <div className="flex flex-col justify-end items-start gap-2.5 self-stretch pt-1.5">
            <label className="b2-bold text-gray-dark-active">버튼 내용</label>
            <input
              className="flex w-[282px] h-10 items-center shrink-0 border border-gray-normal-normal box-shadow-normal focus:box-active-shadow-normal disabled:bg-gray-light-normal text-gray-dark-hover px-5 py-4 rounded-lg border-solid"
              type="text"
              value={ctaStore.ctaContent}
              disabled={!ctaStore.ctaStatus}
              onChange={(e) => ctaStore.setCtaContent(e.target.value)}
              placeholder="Click me!"
            />
          </div>
          <div className="flex flex-col justify-end items-start gap-2.5 self-stretch pt-1.5">
            <div className="flex items-center gap-1">
              <label className="b2-bold text-gray-dark-active">링크</label>
              <div className="relative flex group">
                <QuestionCircleSmall />
                <Tooltip>폼이 추가되어 있으면 외부 링크는 연결할 수 없어요!</Tooltip>
              </div>
            </div>
            <input
              className="flex w-[282px] h-10 items-center gap-2.5 shrink-0 border border-gray-normal-normal box-shadow-normal focus:box-active-shadow-normal disabled:bg-gray-light-normal text-gray-dark-hover px-5 py-4 rounded-lg border-solid"
              type="text"
              value={ctaStore.ctaLink}
              disabled={!ctaStore.ctaStatus || (ctaStore.ctaStatus && formStatus)}
              placeholder={ctaLinkPlaceholder}
              onChange={(e) => ctaStore.setCtaLink(e.target.value)}
            />
          </div>
          <p className="b2-bold text-gray-dark-active">색상 및 스타일</p>
          <div className="flex flex-col justify-end items-start gap-2.5 self-stretch pt-1.5">
            <label className="b2 text-gray-dark-active">글자 크기</label>
            <select
              className="flex w-[282px] h-10 justify-between items-center shrink-0 border border-gray-normal-normal box-shadow-normal px-5 rounded-lg border-solid"
              value={ctaStore.ctaFontSize}
              disabled={!ctaStore.ctaStatus}
              onChange={(e) => ctaStore.setCtaFontSize(e.target.value)}
            >
              {FONT_SIZE.map((item) => (
                <option key={item.id} value={item.value}>
                  {item.value}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-between">
            <p className="b2 text-gray-dark-active">글자색</p>
            <div className="flex items-center gap-1">
              <input
                className="w-[62px] b2 text-gray-dark-active bg-white"
                value={ctaStore.ctaFontColor}
                onChange={(e) => ctaStore.setCtaFontColor(e.target.value)}
                maxLength={7}
                disabled={!ctaStore.ctaStatus}
              />
              <div
                className="cursor-pointer border border-solid border-gray-normal-normal hover:box-active-shadow-normal w-[22px] h-[22px] rounded-full"
                style={{ backgroundColor: ctaStore.ctaFontColor }}
                onClick={() =>
                  setIsVisiblePalette({
                    font: !isVisiblePalette.font,
                    backgroud: isVisiblePalette.backgroud,
                  })
                }
              />
            </div>
          </div>
          {isVisiblePalette.font && <Palette onClick={handleCtaFontColor} />}
          <div className="flex items-center justify-between">
            <p className="b2 text-gray-dark-active">배경색</p>
            <div className="flex items-center gap-1">
              <input
                className="w-[62px] b2 text-gray-dark-active"
                value={ctaStore.ctaBackColor}
                onChange={(e) => ctaStore.setCtaBackColor(e.target.value)}
                maxLength={7}
                disabled={!ctaStore.ctaStatus}
              />
              <div
                className="cursor-pointer border border-solid border-gray-normal-normal hover:box-active-shadow-normal w-[22px] h-[22px] rounded-full"
                style={{ backgroundColor: ctaStore.ctaBackColor }}
                onClick={() =>
                  setIsVisiblePalette({
                    font: isVisiblePalette.font,
                    backgroud: !isVisiblePalette.backgroud,
                  })
                }
              />
            </div>
          </div>
          {isVisiblePalette.backgroud && <Palette onClick={handleCtaBackColor} />}
        </div>
      </div>
      <div
        className={clsx(
          'p-[20px] border border-gray-light-active box-shadow-normal rounded-[8px] flex flex-col gap-5 hover:box-active-shadow-normal',
          {
            'translate h-auto duration-300': fontStore.fontOpen,
          },
          { 'translate h-[70px] duration-300': !fontStore.fontOpen },
        )}
      >
        <div className="flex justify-between">
          <p className="b1-bold text-gray-dark-active">스타일 설정</p>
          <Button onClick={() => fontStore.setFontOpen(!fontStore.fontOpen)}>
            <SelectOptionIcon />
          </Button>
        </div>
        <div
          className={clsx(
            'flex flex-col gap-5',
            { block: fontStore.fontOpen },
            { hidden: !fontStore.fontOpen },
          )}
        >
          <p className="b2-bold text-gray-dark-active">폰트 스타일</p>
          <div className="flex flex-col gap-[10px]">
            {Fonts.map(({ name, text }) => (
              <button
                key={`font-${name}`}
                type="button"
                className={clsx(
                  `w-full h-[40px] b2-bold flex items-center px-[20px] border hover:border-gray-normal-normal rounded-[8px] box-shadow-normal ${FontFamily[name]}`,
                  {
                    'text-purple-normal-normal bg-purple-light-normal border-purple-normal-normal':
                      fontStore.font === name,
                    'text-gray-dark-active bg-white border-gray-light-active':
                      fontStore.font !== name,
                  },
                )}
                onClick={() => onClickFont(name)}
              >
                {text}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div
        className={clsx(
          'p-[20px] border border-gray-light-active box-shadow-normal rounded-[8px] flex flex-col gap-5 hover:box-active-shadow-normal',
          {
            'translate h-auto duration-300': ogStore.ogOpen,
          },
          { 'translate h-[70px] duration-300': !ogStore.ogOpen },
        )}
      >
        <div className="flex justify-between">
          <div className="flex items-center gap-1">
            <p className="b1-bold text-gray-dark-active">공유 정보</p>
            <div className="relative flex flex-row group">
              <QuestionCircleSmall />
              <Tooltip>공유했을 때 보이는 사진과 설명을 넣을 수 있어요!</Tooltip>
            </div>
          </div>
          <Button onClick={() => ogStore.setOgOpen(!ogStore.ogOpen)}>
            <SelectOptionIcon />
          </Button>
        </div>
        <div
          className={clsx(
            'flex flex-col gap-5',
            { block: ogStore.ogOpen },
            { hidden: !ogStore.ogOpen },
          )}
        >
          <div className="flex flex-col justify-end items-start gap-4 self-stretch pt-1.5">
            <label className="b2-bold text-gray-dark-active">제목</label>
            <input
              className="w-[282px] h-10 items-center gap-2.5 shrink-0 border border-gray-normal-normal box-shadow-normal focus:box-active-shadow-normal text-gray-dark-hover px-5 py-4 rounded-lg border-solid"
              type="text"
              value={ogStore.ogTitle}
              onChange={(e) => ogStore.setOgTitle(e.target.value)}
              placeholder="Title"
            />
          </div>
          <div className="flex flex-col justify-end items-start gap-4 self-stretch pt-1.5">
            <label className="b2-bold text-gray-dark-active">설명</label>
            <input
              className="w-[282px] h-10 items-center gap-2.5 shrink-0 border border-gray-normal-normal box-shadow-normal focus:box-active-shadow-normal text-gray-dark-hover px-5 py-4 rounded-lg border-solid"
              type="text"
              value={ogStore.ogDescription}
              onChange={(e) => ogStore.setOgDescription(e.target.value)}
              placeholder="Description"
            />
          </div>
          <div className="flex flex-col justify-end items-start gap-4 self-stretch pt-1.5">
            <label className="b2-bold text-gray-dark-active">이미지</label>
            <div className="flex flex-row justify-between items-center w-[282px] h-10 border border-gray-normal-normal box-shadow-normal text-gray-dark-hover rounded-lg border-solid px-5 py-1">
              {ogStore.ogName ? (
                <p className="w[182px] cursor-default b1 text-gray-dark-active truncate">
                  {ogStore.ogName}
                </p>
              ) : (
                <p className="w-[182px] cursor-default b1 text-gray-normal-normal truncate">
                  권장 사이즈 1200*630
                </p>
              )}
              {ogStore.ogSrc ? (
                <label htmlFor="file-delete" className="flex cursor-pointer">
                  <div className="relative flex flex-row">
                    <input id="file-delete" className="sr-only" onClick={handleDeleteImage} />
                    <GarbageCollectionIcon />
                  </div>
                </label>
              ) : (
                <label htmlFor="file-upload" className="flex cursor-pointer">
                  <div className="relative flex flex-row">
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/png, image/jpeg, image/jpg"
                      className="sr-only"
                      onChange={(e) => handleUploadImage(e)}
                    />
                    <FileUploadIcon />
                  </div>
                </label>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-4 self-stretch pt-1.5">
            <label className="b2-bold text-gray-dark-active">미리보기</label>
            <div>
              <div className="relative flex w-[282px]  h-[148px] flex-col items-start gap-1 border border-gray-normal-normal rounded-[8px_8px_0px_0px] px-4 py-3">
                {ogStore.ogSrc ? (
                  <Image
                    src={ogStore.ogSrc}
                    alt="preview"
                    layout="fill"
                    style={{ borderRadius: '7px 7px 0px 0px' }}
                  />
                ) : (
                  ''
                )}
              </div>
              <div
                className="flex w-[282px] flex-col items-start gap-1 border border-gray-normal-normal rounded-[0px_0px_8px_8px] px-4 py-3"
                style={{ borderTop: 'none' }}
              >
                <p className="b2-bold text-gray-dark-active">
                  {ogStore.ogTitle ? ogStore.ogTitle : 'OG Title'}
                </p>
                <p className="b2 text-gray-dark-active">
                  {ogStore.ogDescription ? ogStore.ogDescription : 'OG Description'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
