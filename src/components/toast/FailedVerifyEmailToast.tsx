import clsx from 'clsx';
import { useEffect, useState } from 'react';
import FailedIcon from '../../../public/svg/FailedIcon';

export default function FailedVerifyEmailToast() {
  const [toastVisiblity, setToastVisiblity] = useState(false);

  useEffect(() => {
    setToastVisiblity(true);
    return () => setToastVisiblity(false);
  }, []);

  return (
    <div
      className={clsx(
        'flex w-[504px] justify-center bg-white border border-semantic-danger-normal items-center gap-2.5 px-[159px] py-[11px] rounded-lg',
        {
          'translate -translate-y-24 duration-300': toastVisiblity,
        },
      )}
    >
      <div className="flex gap-2.5 items-center">
        <FailedIcon />
        <p className="b1-bold text-semantic-danger-normal whitespace-nowrap">
          메일 인증을 진행해주세요.
        </p>
      </div>
    </div>
  );
}
