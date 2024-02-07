import type { Metadata } from 'next';
import ToastPortal from '@/components/toast/ToastPortal';
import './globals.css';
import ModalPortal from '@/components/modal/ModalPortal';
import { RouteChangesProvider } from '@/lib/RouteChangeProviders';

export const metadata: Metadata = {
  title: 'Formflet',
  icons: './favicon.ico',
  description:
    '노션 웹사이트 제작부터 폼 빌딩, 데이터 관리까지 해주는 올인원 웹 서비스, 번거롭던 업무 프로세스를 폼플렛으로 스마트하게 해결하세요!',
  openGraph: {
    title: '노션 웹사이트에 폼을 더하다, Formflet',
    description:
      '노션 웹사이트 제작부터 폼 빌딩, 데이터 관리까지 해주는 올인원 웹 서비스, 번거롭던 업무 프로세스를 폼플렛으로 스마트하게 해결하세요!',
    type: 'website',
    images: [
      {
        url: 'https://uploads-ssl.webflow.com/655ae882820be8cb04c8559f/659fbb5e192dbf7d1554c0c5_240109[…]E1%86%B7%E1%84%82%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%AF.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '노션 웹사이트에 폼을 더하다, Formflet',
    description:
      '노션 웹사이트 제작부터 폼 빌딩, 데이터 관리까지 해주는 올인원 웹 서비스, 번거롭던 업무 프로세스를 폼플렛으로 스마트하게 해결하세요!',
    images: {
      url: 'https://uploads-ssl.webflow.com/655ae882820be8cb04c8559f/659fbb5e192dbf7d1554c0c5_240109[…]E1%86%B7%E1%84%82%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%AF.png',
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <RouteChangesProvider>
          {children}
          <ModalPortal />
          <ToastPortal />
        </RouteChangesProvider>
      </body>
    </html>
  );
}
