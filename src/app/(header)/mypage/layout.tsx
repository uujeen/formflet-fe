import Script from 'next/script';
import NavHeader from '@/components/basic/NavHeader';

export default function MyPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Script src="//embed.typeform.com/next/embed.js" />
      <div data-tf-live="01HMZJRGVR1ES03H98ZZJJW3TB" />
      <NavHeader />
      {children}
    </div>
  );
}
