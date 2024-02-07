import clsx from 'clsx';
import { useEffect, useState } from 'react';
import SuccessIcon from '../../../public/svg/SuccessIcon';
import FailedIcon from '../../../public/svg/FailedIcon';

export default function SendEmailToast({ type }: { type: 'success' | 'failed' }) {
  const [toastVisiblity, setToastVisiblity] = useState(false);

  useEffect(() => {
    setToastVisiblity(true);
    return () => setToastVisiblity(false);
  }, []);

  return (
    <div
      className={clsx(
        'flex w-[504px] justify-center bg-white border items-center gap-2.5 px-[159px] py-[11px] rounded-lg',
        {
          'translate -translate-y-24 duration-300': toastVisiblity,
        },
        {
          'border-semantic-success-dark': type === 'success',
          'border-semantic-danger-normal': type === 'failed',
        },
      )}
    >
      {type === 'success' ? (
        <div className="flex gap-2.5 items-center">
          <SuccessIcon />
          <p className="b1-bold text-semantic-success-dark whitespace-nowrap">
            인증 메일이 발송되었습니다.
          </p>
        </div>
      ) : (
        <div className="flex gap-2.5 items-center">
          <FailedIcon />
          <p className="b1-bold text-semantic-danger-normal whitespace-nowrap">
            인증 메일 발송에 실패하였습니다.
          </p>
        </div>
      )}
    </div>
  );
}
