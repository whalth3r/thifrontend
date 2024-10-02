'use client';

import { useState } from 'react';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

interface ItemData {
  id: string;
  label: string;
}

interface CheckBoxFormProps {
  data: {
    [key: string]: {
      categoryName: string;
      items: ItemData[];
    };
  };
}

export function CheckBoxForm({ data }: CheckBoxFormProps) {
  // State to track selected options by category and item id
  const [selectedOptions, setSelectedOptions] = useState<{
    [category: string]: { [itemId: string]: boolean };
  }>({});

  // Handle checkbox change
  const handleCheckboxChange = (category: string, id: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [id]: !prev[category]?.[id], // Toggle selection
      },
    }));
  };

  // Handle submit button click
  const handleSubmit = () => {
    // Log selected options with their categories
    console.warn('Selected Options with Categories:', selectedOptions);

    // Iterate over categories and selected options to display
    Object.entries(selectedOptions).forEach(([category, items]) => {
      const selectedItems = Object.entries(items)
        // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-unused-vars
        .filter(([_, isSelected]) => isSelected)
        .map(([itemId]) => itemId);
      if (selectedItems.length > 0) {
        console.warn(`Category: ${category}, Selected Items: ${selectedItems}`);
      }
    });
  };

  return (
    <>
      <form className='flex flex-col space-y-4'>
        {Object.entries(data).map(([categoryKey, category]) => (
          <div key={categoryKey} className='flex flex-col gap-4 pt-4'>
            <h3 className='py-1 text-lg font-semibold'>
              {category.categoryName}
            </h3>
            <div className='grid grid-cols-2 gap-4'>
              {category.items.map((item, index) => (
                <div key={index} className='flex items-center space-x-2'>
                  <Checkbox
                    id={item.id}
                    checked={selectedOptions[categoryKey]?.[item.id] || false}
                    onClick={() => handleCheckboxChange(categoryKey, item.id)}
                  />
                  <label
                    htmlFor={item.id}
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
      <div className='mt-8 flex flex-col items-center justify-center gap-4 md:flex-row md:justify-end'>
        <Button
          type='button'
          variant={'secondary'}
          className='font-inter order-2 w-full !border !border-[#D3D3D3] font-medium shadow-sm hover:opacity-75 md:order-1 md:w-fit'
        >
          Skip, I’ll do this later
        </Button>
        <Button
          type='submit'
          className='w-max-[6rem] order-1 w-full md:order-2 md:w-[10.18rem]'
          onClick={handleSubmit}
        >
          Save & Continue
        </Button>
      </div>
    </>
  );
}
