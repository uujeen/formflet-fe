import { useCallback } from 'react';
import useRouteChangeEvents from '@/lib/RouteChangeProviders';
import useModalStore from '@/store/modalStore';
import LeaveModal from '@/components/modal/edit/LeaveModal';

export default function useLeaveConfirm(shouldPreventRouteChange: boolean) {
  const setModal = useModalStore((state) => state.setModal);
  useRouteChangeEvents({
    onBeforeRouteChange: useCallback(
      (targetUrl: string) => {
        if (shouldPreventRouteChange) {
          setModal(<LeaveModal targetUrl={targetUrl} />);
          return false;
        }
        return true;
      },
      [shouldPreventRouteChange],
    ),
  });
}
