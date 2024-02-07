import PATH from '@/constants/path/Path';
import { ReleaseInstance } from '../Instance';

export default async function formReply(formId: number, answer: FormData) {
  const response = await ReleaseInstance.post(`${PATH.API.FORMS.REPLY}/${formId}`, answer, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response;
}
