import PATH from '@/constants/path/Path';
import Instance from '../Instance';

export default async function pageDelete(id: string) {
  const response = await Instance.delete(`${PATH.API.PAGES.DELETE}/${id}`);

  return response;
}
