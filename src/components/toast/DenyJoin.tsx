import clsx from 'clsx';
import { useEffect, useState } from 'react';
import FailedIcon from '../../../public/svg/FailedIcon';

export default function DenyJoin() {
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
          서비스를 종료하여 회원가입을 진행할 수 없습니다. 감사합니다.
        </p>
      </div>
    </div>
  );
}
