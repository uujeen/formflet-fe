'use client';

import { useEffect, useState } from 'react';
import EditDisplay from './EditDisplay';
import EditSidebar from './EditSidebar';
import pageContent from '@/services/api/pages/pageContent';
import { useCtaStore, useFontStore, useFormStore, useOgStore, usePageStore } from '@/store/store';
import { getAmplitudeUserId, trackAmplitude } from '@/lib/amplitude';
import useLeaveConfirm from './hooks/useLeaveConfirm';

export default function EditPageContainer({ pageId }: PageIdProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const pageStore = usePageStore();
  const ctaStore = useCtaStore();
  const { setFont } = useFontStore((state) => ({ setFont: state.setFont }));
  const { setFormALl } = useFormStore((state) => ({
    setFormALl: state.setFormAll,
  }));
  const ogStore = useOgStore();

  useLeaveConfirm(true);

  useEffect(() => {
    const handleReload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };

    const bindedHandleReload = handleReload;

    window.addEventListener('beforeunload', bindedHandleReload);

    return () => {
      window.removeEventListener('beforeunload', bindedHandleReload);
    };
  }, []);

  useEffect(() => {
    const userId = getAmplitudeUserId();
    if (userId) {
      trackAmplitude('formflet_edit_page_view', { user_id: userId });
    }

    const getPageContent = async () => {
      const response = await pageContent({ pageId });
      return response.data.data;
    };
    const fetchPage = async (): Promise<void> => {
      const pageData = await getPageContent();
      pageStore.setDomain(pageData.domain);
      pageStore.setPageId(pageData.id);
      pageStore.setPageContent(pageData.pageDetail.content);
      pageStore.setUrl(pageData.url);
      setFont(pageData.pageFont.type);
      setFormALl(pageData.form[0]);
      ctaStore.setCtaAll(pageData.cta);
      if (pageData.pageOg) {
        ogStore.setOgTitle(pageData.pageOg.title);
        ogStore.setOgDescription(pageData.pageOg.description);
        ogStore.setOgName(pageData.pageOg.imgName);
        ogStore.setOgSrc(pageData.pageOg.imgUrl);
      }

      setIsLoaded(true);
    };
    fetchPage().catch(() => {});
  }, [pageId]);

  return (
    <div className="fixed flex w-full h-5/6">
      <EditSidebar />
      <EditDisplay isLoaded={isLoaded} />
    </div>
  );
}
