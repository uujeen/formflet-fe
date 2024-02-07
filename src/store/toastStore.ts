import { ReactNode } from 'react';
import { create } from 'zustand';

interface ToastStore {
  toast: ReactNode | null;
  setToast: (toast: ReactNode | null) => void;
}

const useToastStore = create<ToastStore>((set) => ({
  toast: null,
  setToast: (toast) => {
    set({ toast });
    setTimeout(() => {
      set({ toast: null });
    }, 2000);
  },
}));

export default useToastStore;
