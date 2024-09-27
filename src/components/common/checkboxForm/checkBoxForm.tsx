'use client';

import { Checkbox } from '@/components/ui/checkbox';

// import { useState } from "react";

interface InitialData {
  [key: string]: {
    [key: string]: { checked: boolean; label: string };
  };
}

interface CheckBoxFormProps {
  data: InitialData;
}

export function CheckBoxForm({ data }: CheckBoxFormProps) {
  //   const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleCheckboxChange = (id: string) => {
    // setSelectedOptions((prev) =>
    //   prev.includes(id)
    //     ? prev.filter((option) => option !== id)
    //     : [...prev, id]
    return id;
    // );
  };

  return (
    <form className='flex flex-col space-y-4'>
      {Object.entries(data).map(([category, items]) => (
        <div key={category} className='flex flex-col gap-4'>
          <h3 className='text-lg font-semibold'>{category}</h3>
          <div className='grid grid-cols-2 gap-4'>
            {Object.entries(items).map(([id, item]) => (
              <div key={id} className='flex items-center space-x-2'>
                <Checkbox id={id} onChange={() => handleCheckboxChange(id)} />
                <label
                  htmlFor={id}
                  className='text-sm font-medium leading-none'
                >
                  {item.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </form>
  );
}
