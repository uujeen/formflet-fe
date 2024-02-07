'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useCtaStore, useFormStore } from '@/store/store';
import Button from '../basic/Button';
import PATH from '@/constants/path/Path';

interface CtaProps {
  params: {
    subdomain: string;
  };
}

export default function CtaComponent({ params }: CtaProps) {
  const route = useRouter();
  const ctaStore = useCtaStore();
  const formStatus = useFormStore((state) => state.formStatus);
  const pageDomain = params.subdomain;
  const pathName = usePathname();

  const handleRoute = () => {
    if (formStatus && pageDomain) {
      route.push(`/form/${pageDomain}`);
    } else {
      if (pathName.startsWith(PATH.ROUTE.EDIT)) {
        return;
      }
      if (!ctaStore.ctaLink.startsWith('https')) {
        window.open(`https://${ctaStore.ctaLink}`, '_blank');
      }
      window.open(`${ctaStore.ctaLink}`, '_blank');
    }
  };

  return (
    <Button
      type="button"
      className="flex flex-col justify-center items-center gap-2.5 box-shadow-normal px-5 py-2.5 rounded-lg"
      style={{ backgroundColor: ctaStore.ctaBackColor }}
      onClick={handleRoute}
    >
      <p
        className="font-bold"
        style={{ color: ctaStore.ctaFontColor, fontSize: ctaStore.ctaFontSize }}
      >
        {ctaStore.ctaContent}
      </p>
    </Button>
  );
}
