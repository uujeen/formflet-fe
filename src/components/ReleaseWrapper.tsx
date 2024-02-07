'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCtaStore, useFontStore, useFormStore } from '@/store/store';

export default function ReleaseWrapper({
  className,
  children,
  page,
}: {
  className: string;
  children: React.ReactNode;
  page: Page;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { setFont } = useFontStore((state) => ({ setFont: state.setFont }));
  const setFormStatus = useFormStore((state) => state.setFormStatus);
  const { setCtaContent, setCtaLink, setCtaFontSize, setCtaFontColor, setCtaBackColor } =
    useCtaStore((state) => ({
      setCtaContent: state.setCtaContent,
      setCtaLink: state.setCtaLink,
      setCtaFontSize: state.setCtaFontSize,
      setCtaFontColor: state.setCtaFontColor,
      setCtaBackColor: state.setCtaBackColor,
    }));
  const route = useRouter();

  useEffect(() => {
    setFont(page.pageFont.type);
    setFormStatus(page.form[0].status);
    setCtaContent(page.cta.content);
    setCtaLink(page.cta.link);
    setCtaFontSize(page.cta.fontSize);
    setCtaFontColor(page.cta.fontColor);
    setCtaBackColor(page.cta.backgroundColor);
    setIsLoaded(true);

    const notionUrl = page.url.split('/')[2];

    const handleLink = (e: MouseEvent) => {
      const clickedTarget = e.target as HTMLElement;
      const anChorElement = clickedTarget.closest('a');
      if (anChorElement && anChorElement.hasAttribute('href')) {
        e.preventDefault();
        const href = anChorElement.getAttribute('href');
        if (href?.includes('https')) {
          window.open(href);
        } else {
          const newUrl = `https://${notionUrl}${href}`;

          route.push(newUrl);
        }
      }
    };

    window.addEventListener('click', (e) => handleLink(e));

    return () => window.removeEventListener('click', (e) => handleLink(e));
  }, []);

  return isLoaded && <div className={className}>{children}</div>;
}
