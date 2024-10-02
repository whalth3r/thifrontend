import { useState } from 'react';
import { Control } from 'react-hook-form';

import { Upload } from 'lucide-react';
import Image from 'next/image';

import { EmptyUser } from '@/components/icons/EmptyUserI';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { buttonVariants } from '@/components/ui/button';
import {
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { cn } from '@/lib/utils';

import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from './FileUpload';

interface FileUploaderFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  name: string;
  label: string;
  description?: string;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dropzoneOptions: any;
  value: File[] | undefined;
  onValueChange: (files: File[]) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
  isOptional?: boolean;
}

export const FileUploaderField: React.FC<FileUploaderFieldProps> = ({
  label,
  description,
  dropzoneOptions,
  className,
  value = [],
  onValueChange,
  error,
  isOptional = false,
}) => {
  const [isFileSizeExceeded, setIsFileSizeExceeded] = useState(false);
  const handleUpload = (files: File[] | null) => {
    if (files) {
      const isExceeded =
        files.length < 1 || files.some((file) => file.size < 1);
      setIsFileSizeExceeded(isExceeded);
      onValueChange(files);
    }
  };

  return (
    <FormItem>
      <FileUploader
        value={value || []}
        onValueChange={handleUpload}
        dropzoneOptions={dropzoneOptions}
        reSelect={true}
        className={cn(
          'flex flex-col items-center gap-10 md:flex-row md:justify-between md:gap-4 lg:flex-col lg:items-center 2xl:flex-row 2xl:items-center 2xl:gap-4',
          className,
        )}
      >
        {value && value.length === 0 && (
          <div>
            <EmptyUser />
          </div>
        )}
        {value && value.length > 0 && (
          <div className='avatar-image-displayer'>
            <FileUploaderContent className='w-full flex-row gap-2 rounded-b-none rounded-t-md px-0'>
              {value.map((file, i) => (
                <FileUploaderItem
                  key={i}
                  index={i}
                  aria-roledescription={`file ${i + 1} containing ${file.name}`}
                  className='size-20 !p-0'
                >
                  <AspectRatio className='size-full'>
                    <Image
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className='rounded-[50%] object-cover'
                      fill
                    />
                  </AspectRatio>
                </FileUploaderItem>
              ))}
            </FileUploaderContent>
          </div>
        )}
        <div className='flex w-full flex-col items-center justify-start gap-3 md:flex-row md:items-center md:justify-between'>
          <div className='flex flex-col items-start gap-2'>
            <FormLabel className='font-medium text-blackcustom-900'>
              {label}{' '}
              {isOptional && (
                <span className='ml-2 text-inputs-100'>{'(optional)'}</span>
              )}
            </FormLabel>
            {description && (
              <FormDescription
                className={cn('text-start text-xs font-medium leading-5', {
                  ['text-inputs-100']: !isFileSizeExceeded,
                  ['text-red-500']: isFileSizeExceeded,
                })}
              >
                {description}
              </FormDescription>
            )}
          </div>
          <div className='w-full md:w-[42%]'>
            <FileInput
              className={cn(
                buttonVariants({
                  size: 'icon',
                }),
                'size-8 w-full',
              )}
            >
              <Upload className='size-4' />
              <span className='pl-2 text-sm'>Upload Image</span>
            </FileInput>
          </div>
        </div>
      </FileUploader>
      {error && <FormMessage>{error.message}</FormMessage>}
    </FormItem>
  );
};
