import Link from 'next/link';
import React from 'react';
import PATH from '@/constants/path/Path';
import Button from '@/components/basic/Button';
import ToolsIcon from '../../../public/svg/ToolsIcon';
import GarbageCollectionIcon from '../../../public/svg/GarbageCollectIcon';
import pageDelete from '@/services/api/pages/pageDelete';

export default function PageList({ pageList }: { pageList: PageList[] }) {
  const handlePageTools = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // 이벤트 드릴링 막기위해 작성
    e.preventDefault();
    e.stopPropagation();
    const FamilyElement = e.currentTarget.parentElement?.children;
    const target = FamilyElement?.item(1);

    if (target?.classList.contains('visible')) {
      target.classList.replace('visible', 'invisible');
    } else {
      target?.classList.replace('invisible', 'visible');
    }
  };

  const onDeletePage = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    const { id } = e.currentTarget;

    await pageDelete(id).then(() => window.location.reload());
  };

  return (
    <div>
      {pageList.map((item) => (
        <div key={item.id}>
          <Link
            className="flex w-[848px] h-[108px] justify-between items-center bg-white border border-gray-light-active hover:box-active-shadow-normal box-shadow-normal px-[64px] py-[26px] mb-4 rounded-lg border-solid "
            key={item.id}
            id={item.id}
            href={`${PATH.ROUTE.EDIT}/${item.id}`}
          >
            <div className="flex flex-col items-start gap-0.5 shrink-0">
              <p className="b1-bold text-gray-dark-active">{item.title}</p>
              <p className="b2 text-gray-dark-active">{item.domain}</p>
            </div>
            <div className="relative">
              <Button id={item.id} onClick={(e) => handlePageTools(e)}>
                <div className="rounded-full hover:box-active-shadow-normal z-10">
                  <ToolsIcon />
                </div>
              </Button>
              <div
                id="tool-box"
                className="absolute top-7 left-7 flex w-[157px] bg-white flex-col items-start border border-gray-light-active box-shadow-normal rounded-2xl border-solid whitespace-nowrap invisible"
              >
                <Button
                  id={item.id}
                  className="flex h-10 items-center gap-2 self-stretch px-4 py-2.5"
                  onClick={(e) => onDeletePage(e)}
                >
                  <GarbageCollectionIcon />
                  <p className="b1 text-gray-dark-active">삭제</p>
                </Button>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
