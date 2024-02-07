import { useRouter } from 'next/navigation';
// import JWT_EXPIRY_TIME from '@/constants/consts';
import authReissue from '@/services/api/auth/authReissue';
import PATH from '@/constants/path/Path';

export default function useAuthLogin() {
  const route = useRouter();
  function onLoginSuccess(accessToken: string) {
    localStorage.setItem('accessToken', accessToken);
    // setTimeout(onSilentRefresh, JWT_EXPIRY_TIME - 60000); // 만료 1분 전에 재발급
  }

  async function onSilentRefresh() {
    try {
      const response = await authReissue();
      onLoginSuccess(response.data.data.accessToken);
    } catch (e) {
      alert('로그인 정보가 만료되었습니다. 다시 로그인해주시기 바랍니다.');
      route.push(PATH.ROUTE.LOGIN);
    }
  }

  return { onLoginSuccess, onSilentRefresh };
}
