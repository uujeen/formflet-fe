'use client';

import clsx from 'clsx';
import RadioCheckIcon from '../../../public/svg/RadioCheckIcon';
import RadioIcon from '../../../public/svg/RadioIcon';

/* eslint-disable react/require-default-props */
interface FormRadioProps {
  count: number;
  value: string;
  userPlatForm: 'pc' | 'mobile';
  selectedRadio?: Map<number, string>;
  onRadioChange?: (cnt: number, value: string) => void;
}

export default function FormRadio({
  count,
  value,
  selectedRadio,
  userPlatForm,
  onRadioChange,
}: FormRadioProps) {
  const handleClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    if (onRadioChange) {
      onRadioChange(count, e.currentTarget.value);
    }
  };

  return (
    <label className="cursor-pointer">
      <div key={value + count} className="relative flex">
        <input
          className="appearance-none"
          type="radio"
          name={`answer${count}`}
          onClick={(e) => handleClick(e)}
          value={value}
        />
        <div
          className={clsx(
            'flex h-10 items-center gap-2.5 self-stretch border border-gray-normal-normal box-shadow-normal px-5 py-4 rounded-lg border-solid',
            userPlatForm === 'pc' ? 'w-[417px]' : 'w-full',
            { 'bg-gray-light-normal': selectedRadio?.get(count) === value },
          )}
        >
          {selectedRadio?.get(count) === value ? <RadioCheckIcon /> : <RadioIcon />}
          <p
            className={
              selectedRadio?.get(count) === value
                ? 'b1-bold text-gray-dark-hover'
                : 'b1 text-gray-normal-normal'
            }
          >
            {value}
          </p>
        </div>
      </div>
    </label>
  );
}
