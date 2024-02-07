interface PageIdProps {
  pageId: string;
}

type PageContent = {
  id: number;
  content: string;
};

type PageFont = {
  id: number;
  type: string;
};

type PageOg = {
  title: string;
  description: string;
  imgName: string;
  imgUrl: string;
};

type PageForm = {
  id: number;
  status: boolean;
  title: string;
  guide: string;
  replyStatus: boolean;
};

type PageCta = {
  status: boolean;
  content: string;
  link: string;
  fontSize: string;
  fontColor: string;
  backgroundColor: string;
};

type Page = {
  id: number;
  title: string;
  domain: string;
  url: string;
  pageDetail: PageContent;
  pageFont: PageFont;
  pageOg: PageOg;
  form: PageForm[];
  cta: PageCta;
};

interface PageList {
  id: string;
  title: string;
  domain: string;
}

interface FormReplies {
  id: string;
  answer: string;
}

interface FormDetail {
  question: string;
  formReplies: Array<FormReplies>;
}

interface FormList {
  id: number;
  status: string;
  title: string;
  guide: string;
  formDetails: FormDetail[];
}
