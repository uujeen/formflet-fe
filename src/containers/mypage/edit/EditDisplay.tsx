'use client';

import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import NotionComponent from '@/components/notion/NotionComponent';
import { useCtaStore, useDisplayStore, usePageStore } from '@/store/store';
import EditForm from './EditForm';
import EditFormView from './EditFormView';
import EditFormExample from './EditFormExample';
import CtaComponent from '@/components/cta/CtaComponent';
import { LoadState } from '@/types/type';
import QuestionCircleNormal from '../../../../public/svg/QuestionCircleNormal';
import Tooltip from '@/components/common/Tooltip';

export default function EditDisplay({ isLoaded }: LoadState) {
  const { display } = useDisplayStore((state) => ({
    display: state.display,
    setDisplay: state.setDisplay,
  }));
  const ctaStore = useCtaStore();
  const route = useRouter();
  const pageStore = usePageStore();

  useEffect(() => {
    const notionUrl = pageStore.url.split('/')[2];
    const handleLink = (e: MouseEvent) => {
      const clickedTarget = e.target as HTMLElement;
      const anChorElement = clickedTarget.closest('a');
      if (anChorElement && anChorElement.hasAttribute('href')) {
        e.preventDefault();
        const href = anChorElement.getAttribute('href');
        if (!href?.includes('/mypage')) {
          if (href?.includes('https')) {
            window.open(href);
          } else {
            const newUrl = `https://${notionUrl}${href}`;

            route.push(newUrl);
          }
        }
      }
    };
    window.addEventListener('click', (e) => handleLink(e));

    return () => window.removeEventListener('click', (e) => handleLink(e));
  }, [pageStore.url]);

  const resizer = useRef<HTMLDivElement>(null);
  const leftSide = useRef<HTMLDivElement>(null);
  const rightSide = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const resizerCurrent = resizer.current;

    const mouseMoveHandler = (e: MouseEvent): void => {
      if (!resizerCurrent || !leftSide.current) return;

      const dx = e.clientX - resizerCurrent.getBoundingClientRect().left;
      const parentElement = resizerCurrent.parentNode as HTMLElement;

      if (parentElement) {
        const newLeftWidth =
          ((leftSide.current.getBoundingClientRect().width + dx) * 100) /
          parentElement.getBoundingClientRect().width;
        leftSide.current.style.width = `${newLeftWidth}%`;
      }
    };

    const mouseUpHandler = (): void => {
      document.body.style.removeProperty('cursor');

      if (leftSide.current && rightSide.current) {
        leftSide.current.style.removeProperty('user-select');
        leftSide.current.style.removeProperty('pointer-events');
        rightSide.current.style.removeProperty('user-select');
        rightSide.current.style.removeProperty('pointer-events');
      }

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    const mouseDownHandler = (): void => {
      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    };
    if (resizerCurrent) {
      resizerCurrent.addEventListener('mousedown', mouseDownHandler);
    }

    return () => {
      if (resizerCurrent) {
        resizerCurrent.removeEventListener('mousedown', mouseDownHandler);
      }
    };
  }, [display]);

  return (
    <div className="m-[20px_20px_20px_0] w-full overflow-hidden overflow-y-scroll border rounded-[8px] border-gray-light-active box-shadow-normal">
      {
        {
          display: isLoaded && (
            <div className="flex flex-col w-full">
              <NotionComponent recordMap={pageStore.pageContent} />
              <div className="absolute bottom-10 left-[54%]">
                {ctaStore.ctaStatus && (
                  <CtaComponent
                    params={{
                      subdomain: '',
                    }}
                  />
                )}
              </div>
            </div>
          ),
          form: (
            <div className="flex w-full h-full">
              <div
                ref={leftSide}
                className="flex w-1/2 flex-col items-start gap-5 p-[30px] overflow-hidden overflow-y-scroll"
              >
                <div className="flex items-center gap-1">
                  <div className="w-[3px] h-5 shrink-0 bg-gray-dark-active" />
                  <p className="b1-bold text-gray-dark-active">이곳에서 폼을 만들어요!</p>
                  <div className="relative flex group">
                    <QuestionCircleNormal />
                    <Tooltip>하단 가이드를 참고하여 이곳에 폼을 생성해주세요.</Tooltip>
                  </div>
                </div>
                <EditForm />
                <hr className="self-stretch text-gray-light-active" />
                <EditFormExample />
              </div>
              <div
                ref={resizer}
                className="cursor-ew-resize h-full w-2.5 bg-gray-light-active shrink-0"
              />

              <div
                ref={rightSide}
                className="flex flex-col items-start gap-5 p-[30px] overflow-hidden overflow-y-scroll"
              >
                <div className="flex items-center gap-1">
                  <div className="w-[3px] h-5 shrink-0 bg-gray-dark-active" />
                  <p className="b1-bold text-gray-dark-active">완성된 폼을 미리볼 수 있어요!</p>
                  <div className="relative flex group">
                    <QuestionCircleNormal />
                    <Tooltip>이곳은 미리보기 영역으로 응답 작성 및 제출이 불가합니다.</Tooltip>
                  </div>
                </div>
                <EditFormView />
              </div>
            </div>
          ),
        }[display]
      }
    </div>
  );
}
