import Link from 'next/link';
import { ReleaseInstance } from '@/services/api/Instance';
import ReleaseWrapper from '@/components/ReleaseWrapper';
import FormComponent from '@/components/form/FormComponent';
import ChevronLeft from '../../../../../public/svg/ChevronLeft';

interface PageProps {
  params: {
    subdomain: string;
  };
}

export default async function FormPage({ params }: PageProps) {
  const pageSubDomain = params.subdomain;

  const response = await ReleaseInstance.get<{
    statusCode: number;
    message: string;
    data: Page;
  }>(`/api/pages/release/${pageSubDomain}`);
  const page = response.data.data;
  const { title } = page.form[0];
  const form = page.form[0].guide;
  const formId = page.form[0].id;

  return (
    <>
      <header className="flex h-16 flex-col justify-between items-center shrink-0 self-stretch pt-[22px]">
        <Link
          href={`/page/${pageSubDomain}`}
          className="h3-bold flex w-[850px] items-center shrink-0 text-gray-dark-active"
        >
          <ChevronLeft />
          뒤로 가기
        </Link>
        <hr className="self-stretch text-gray-light-active" />
      </header>
      <ReleaseWrapper className="relative flex justify-center my-[60px]" page={page}>
        <FormComponent title={title} form={form} formId={formId} />
      </ReleaseWrapper>
    </>
  );
}
