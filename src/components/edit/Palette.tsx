import { PALETTE_COLOR } from '@/constants/editProps/EditPageProps';

export default function Palette({
  onClick,
}: {
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}) {
  return (
    <div className="flex w-[282px] flex-col items-center gap-2.5 p-2.5">
      {PALETTE_COLOR.map((items, idx) => (
        <div key={items[idx].id} className="flex flex-row gap-1">
          {items.map((item) => (
            <div
              key={item.id}
              id={item.id}
              className="cursor-point border border-solid border-gray-light-active w-[22px] h-[22px] rounded-full hover:box-active-shadow-normal"
              style={{ backgroundColor: item.value }}
              onClick={(e) => onClick(e)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
