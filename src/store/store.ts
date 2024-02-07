import { create } from 'zustand';

export const useFontStore = create<FontStore>((set) => ({
  font: '',
  fontOpen: false,
  setFont: (font) => set({ font }),
  setFontOpen: (fontOpen) => set({ fontOpen }),
}));

export const useDisplayStore = create<DisplayStore>((set) => ({
  display: 'display',
  setDisplay: (display) => set({ display }),
}));

export const usePageStore = create<PageStore>((set) => ({
  pageId: 0,
  domain: '',
  subdomain: '',
  url: '',
  pageContent: '',
  setPageId: (pageId) => set({ pageId }),
  setDomain: (domain) => set({ domain, subdomain: domain.split('.')[0] }),
  setUrl: (url) => set({ url }),
  setPageContent: (pageContent) => set({ pageContent }),
}));

export const useFormStore = create<FormStore>((set) => ({
  formId: 0,
  formStatus: false,
  formOpen: false,
  formTitle: '',
  form: '',
  replyStatus: false,
  createForm: false,
  setFormId: (formId: number) => set({ formId }),
  setFormStatus: (formStatus: boolean) => set({ formStatus }),
  setFormOpen: (formOpen: boolean) => set({ formOpen }),
  setFormTitle: (formTitle: string) => set({ formTitle }),
  setForm: (form: string) => set({ form }),
  setReplyStatus: (replyStatus: boolean) => set({ replyStatus }),
  setCreateForm: (createForm: boolean) => set({ createForm }),
  setFormAll: (data: PageForm) =>
    set({
      formId: data.id,
      formStatus: data.status,
      formTitle: data.title,
      form: data.guide,
      replyStatus: data.replyStatus,
    }),
  resetForm: () =>
    set({
      formStatus: false,
      form: '[텍스트] 폼 작성을 위한 샘플 양식입니다. 폼 편집 탭에서 자유롭게 수정해주세요.\n[질문_*] 질문을 입력해주세요.\n[주관식] ex) 답변을 입력하세요.\n[질문_*] 두번째 질문을 입력해주세요.\n[객관식] 아시아_유럽\n[질문] 세번째 질문을 입력해주세요.\n[객관식_복수] 태평양_대서양',
      createForm: false,
    }),
}));

export const useCtaStore = create<CtaStore>((set) => ({
  ctaStatus: false,
  ctaOpen: false,
  ctaContent: 'Click Me!',
  ctaLink: '',
  ctaFontSize: '24px',
  ctaFontColor: '#FFFFFF',
  ctaBackColor: '#484848',
  setCtaStatus: (ctaStatus: boolean) => set({ ctaStatus }),
  setCtaOpen: (ctaOpen: boolean) => set({ ctaOpen }),
  setCtaContent: (ctaContent: string) => set({ ctaContent }),
  setCtaLink: (ctaLink: string) => set({ ctaLink }),
  setCtaFontSize: (ctaFontSize: string) => set({ ctaFontSize }),
  setCtaFontColor: (ctaFontColor: string) => set({ ctaFontColor }),
  setCtaBackColor: (ctaBackColor: string) => set({ ctaBackColor }),
  setCtaAll: (data: PageCta) =>
    set({
      ctaStatus: data.status,
      ctaContent: data.content,
      ctaLink: data.link,
      ctaFontSize: data.fontSize,
      ctaFontColor: data.fontColor,
      ctaBackColor: data.backgroundColor,
    }),
  resetCta: () =>
    set({
      ctaStatus: false,
      ctaContent: 'Click Me!',
      ctaLink: '',
      ctaFontSize: '24px',
      ctaFontColor: '#FFFFFF',
      ctaBackColor: '#484848',
    }),
}));

export const useOgStore = create<OgStore>((set) => ({
  ogOpen: false,
  ogTitle: '',
  ogDescription: '',
  ogImage: null,
  ogName: '',
  ogSrc: '',
  setOgOpen: (ogOpen: boolean) => set({ ogOpen }),
  setOgTitle: (ogTitle: string) => set({ ogTitle }),
  setOgDescription: (ogDescription: string) => set({ ogDescription }),
  setOgImage: (ogImage: File | null) => {
    if (ogImage) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const { target } = event;
        if (target) {
          set({ ogImage });
          set({ ogName: ogImage.name });
          set({ ogSrc: target.result as string });
        }
      };
      reader.readAsDataURL(ogImage);
    } else {
      set({ ogImage: null });
      set({ ogName: '' });
      set({ ogSrc: '' });
    }
  },
  setOgSrc: (ogSrc: string) => set({ ogSrc }),
  setOgName: (ogName: string) => set({ ogName }),
}));
