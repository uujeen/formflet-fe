import Instance from '../Instance';
import PATH from '@/constants/path/Path';

export default async function pageSave(path: string, data: FormData) {
  const response = await Instance.patch(`${PATH.API.PAGES.EDIT}/${path}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response;
}
