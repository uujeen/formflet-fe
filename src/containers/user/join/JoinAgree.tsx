'use client';

import React, { useEffect, useState } from 'react';
import Button from '@/components/basic/Button';
import RectangleCheckOn from '../../../../public/svg/RectangleCheckOn';
import RectangleCheckOff from '../../../../public/svg/RectangleCheckOff';
import { SetStateBoolean } from '@/types/type';
import PATH from '@/constants/path/Path';

function JoinAgree({ setStateBoolean }: SetStateBoolean) {
  const [agree, setAgree] = useState<boolean>(false);

  const handleAgree = () => {
    if (agree) {
      setAgree(!agree);
    } else {
      setAgree(!agree);
    }
  };

  useEffect(() => {
    if (agree) {
      setStateBoolean(true);
    } else {
      setStateBoolean(false);
    }
  }, [agree]);

  return (
    <div className="flex justify-start items-center self-stretch gap-2.5">
      <Button onClick={() => handleAgree()}>
        {agree ? <RectangleCheckOn /> : <RectangleCheckOff />}
      </Button>
      <div className="flex">
        <p>전체&nbsp;</p>
        <Button
          className="underline"
          onClick={() => window.open(`${PATH.ROUTE.AGREE_PERSONAL_DOCS}`, '_blank')}
        >
          개인정보 수집
        </Button>
        <p> &nbsp;및&nbsp;</p>
        <Button
          className="underline"
          onClick={() => window.open(`${PATH.ROUTE.AGREE_JOIN}`, '_blank')}
        >
          폼플렛 이용약관에 동의합니다.
        </Button>
      </div>
    </div>
  );
}

export default JoinAgree;
