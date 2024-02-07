import { Metadata } from 'next';
import { ReleaseInstance } from '@/services/api/Instance';
import NotionComponent from '@/components/notion/NotionComponent';
import ReleaseWrapper from '@/components/ReleaseWrapper';
import CtaComponent from '@/components/cta/CtaComponent';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const pageDomain = params.subdomain;

  const response = await ReleaseInstance.get<{
    statusCode: number;
    message: string;
    data: Page;
  }>(`/api/pages/release/${pageDomain}`);
  if (response.data.data.pageOg) {
    return {
      title: response.data.data.pageOg.title,
      description: response.data.data.pageOg.description,
      openGraph: {
        type: 'website',
        url: response.data.data.domain,
        title: response.data.data.pageOg.title,
        description: response.data.data.pageOg.description,
        images: [
          {
            url: response.data.data.pageOg.imgUrl,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: response.data.data.pageOg.title,
        description: response.data.data.pageOg.description,
        images: {
          url: response.data.data.pageOg.imgUrl,
        },
      },
    };
  }

  return {
    openGraph: {
      type: 'website',
      url: response.data.data.domain,
    },
  };
}

interface PageProps {
  params: {
    subdomain: string;
  };
}

export default async function NotionPage({ params }: PageProps) {
  const pageDomain = params.subdomain;

  const response = await ReleaseInstance.get<{
    statusCode: number;
    message: string;
    data: Page;
  }>(`/api/pages/release/${pageDomain}`);
  const page = response.data.data;
  const ctaStatus = page.cta.status;

  return (
    <ReleaseWrapper className="relative" page={page}>
      <NotionComponent recordMap={page.pageDetail.content} />
      <div className="fixed transform -translate-x-1/2 bottom-10 left-1/2">
        {ctaStatus && <CtaComponent params={params} />}
      </div>
    </ReleaseWrapper>
  );
}
