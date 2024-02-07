interface FontStore {
  fontOpen: boolean;
  font: string;
  setFontOpen: (fontOpen: boolean) => void;
  setFont: (font: string) => void;
}

interface DisplayStore {
  display: 'display' | 'form';
  setDisplay: (display: 'display' | 'form') => void;
}

interface PageStore {
  pageId: number;
  domain: string;
  subdomain: string;
  url: string;
  pageContent: string;
  setPageId: (pageId: number) => void;
  setDomain: (domain: string) => void;
  setUrl: (url: string) => void;
  setPageContent: (pageContent: string) => void;
}

interface FormStore {
  formId: number;
  formStatus: boolean;
  formOpen: boolean;
  formTitle: string;
  form: string;
  replyStatus: boolean;
  createForm: boolean;
  setFormId: (formId: number) => void;
  setFormStatus: (formStatus: boolean) => void;
  setFormOpen: (formOpen: boolean) => void;
  setFormTitle: (formtitle: string) => void;
  setForm: (form: string) => void;
  setReplyStatus: (replyStatus: boolean) => void;
  setCreateForm: (createForm: boolean) => void;
  setFormAll: (data: PageForm) => void;
  resetForm: () => void;
}

interface CtaStore {
  ctaStatus: boolean;
  ctaOpen: boolean;
  ctaContent: string;
  ctaLink: string;
  ctaFontSize: string;
  ctaFontColor: string;
  ctaBackColor: string;
  setCtaStatus: (ctaStatus: boolean) => void;
  setCtaOpen: (ctaOpen: boolean) => void;
  setCtaContent: (ctaContent: string) => void;
  setCtaLink: (ctaLink: string) => void;
  setCtaFontSize: (ctaFontSize: string) => void;
  setCtaFontColor: (ctaFontColor: string) => void;
  setCtaBackColor: (ctaBackColor: string) => void;
  setCtaAll: (data: PageCta) => void;
  resetCta: () => void;
}

interface OgStore {
  ogOpen: boolean;
  ogTitle: string;
  ogDescription: string;
  ogImage: File | null;
  ogName: string;
  ogSrc: string;
  setOgOpen: (ogOpen: boolean) => void;
  setOgTitle: (ogTitle: string) => void;
  setOgDescription: (ogDescription: string) => void;
  setOgImage: (ogImage: File | null) => void;
  setOgName: (ogName: string) => void;
  setOgSrc: (ogSrc: string) => void;
}
