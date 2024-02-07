'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { SidebarMenus } from '@/constants/editProps/EditPageProps';
import DisplaySidebar from '@/containers/mypage/edit/DisplaySidebar';
import FormSidebar from './FormSidebar';
import { useDisplayStore, useFormStore } from '@/store/store';

export default function EditSidebar() {
  const [selected, setSelected] = useState<'display' | 'form'>('display');
  const [isHoverSidebar, setIsHoverSidebar] = useState(false);
  const setDisplay = useDisplayStore((state) => state.setDisplay);
  const formStatus = useFormStore((state) => state.formStatus);
  function onClickMenu(name: 'display' | 'form') {
    setSelected(name);
    if (formStatus) {
      setDisplay(name);
    }
  }

  useEffect(() => {
    setSelected('display');
    setDisplay('display');
  }, []);

  return (
    <aside
      className="w-[362px] shrink-0"
      onMouseEnter={() => setIsHoverSidebar(true)}
      onMouseLeave={() => setIsHoverSidebar(false)}
      style={{ overflowY: isHoverSidebar ? 'scroll' : 'hidden' }}
    >
      <div className="z-20 absolute bg-white w-[362px] flex [&>button]:grow [&>button]:b1-bold [&>button]:py-[6px]">
        {SidebarMenus.map((item) => (
          <button
            key={`sidebar-menu-${item.name}`}
            type="button"
            className={clsx({
              'text-purple-normal-normal border-b-[4px]': selected === item.name,
              'text-gray-dark-active border-b-[1px] border-gray-light-active':
                selected !== item.name,
            })}
            onClick={() => onClickMenu(item.name)}
          >
            <div className="flex items-center justify-center gap-2.5">
              {item.text}
              {selected === item.name ? item.svgSelected : item.svg}
            </div>
          </button>
        ))}
      </div>
      <div className="pt-[40px]">
        {
          {
            display: <DisplaySidebar />,
            form: <FormSidebar />,
          }[selected]
        }
      </div>
    </aside>
  );
}
