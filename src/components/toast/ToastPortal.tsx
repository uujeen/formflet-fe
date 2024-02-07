'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import useToastStore from '@/store/toastStore';

export default function ToastPortal() {
  const pathname = usePathname();
  const { toast, setToast } = useToastStore();

  const closeToast = () => {
    setToast(null);
  };

  useEffect(() => {
    document.body.style.overflow = toast ? 'hidden' : 'auto';
  }, [toast]);

  useEffect(() => {
    closeToast();
  }, [pathname]);

  if (!toast) {
    return null;
  }
  return (
    <div className="fixed -bottom-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-10">
      {toast}
    </div>
  );
}
