'use client';

import { useEffect, useState } from 'react';
import DataItem from '@/containers/mypage/data/DataItem';
import pages from '@/services/api/pages/pages';
import EmptyDataList from './EmptyPageList';

export default function DataListContainer() {
  const [pageList, setPageList] = useState<PageList[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await pages();

      return response.data.data;
    };
    fetchData()
      .then((result) => {
        setPageList(result);
      })
      .catch((e) => console.error(e));
  }, []);
  return (
    <div className="py-[40px] w-[850px] space-y-[20px]">
      {pageList.length ? (
        pageList.map((item) => <DataItem key={item.id} data={item} />)
      ) : (
        <EmptyDataList />
      )}
    </div>
  );
}
