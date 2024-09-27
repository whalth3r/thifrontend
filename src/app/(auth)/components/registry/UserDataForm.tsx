'use client';

//import { useState } from 'react';
import { useState } from 'react';
// import { DropzoneOptions } from 'react-dropzone';
import { useForm } from 'react-hook-form';

// import {
//   // ACCEPTED_PHOTO_TYPES,
//   ACCEPTED_PHOTO_TYPES_CONFIG,
//   MAX_FILE_SIZE,
// } from '@/data/filesInputValidations/acceptedtypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { isValidPhoneNumber } from 'libphonenumber-js';
// import { Paperclip } from 'lucide-react';
import { Loader2 } from 'lucide-react';
// import { useRouter } from 'next/navigation';
import z from 'zod';

import { CheckboxGroupField } from '@/components/common/shadcn_extentions/inputs/CheckboxInput';
import { SelectInputField } from '@/components/common/shadcn_extentions/inputs/SelectInput';
import { TextInputField } from '@/components/common/shadcn_extentions/inputs/TextInput';
// import { FileUploaderField } from '@/components/common/shadcn_extentions/inputs/file-uploader/FileUploaderInput';
import { PhoneInputField } from '@/components/common/shadcn_extentions/inputs/phone-input/PhoneInputField';
import { EyeIcon } from '@/components/icons/EyeIcon';
import { EyeLineIcon } from '@/components/icons/EyeLineIcon';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

const CardForm = z
  .object({
    // filePhoto: z
    //   .array(
    //   // eslint-disable-next-line @typescript-eslint/naming-convention
    //     z.instanceof(File).refine((file) => file.size < MAX_FILE_SIZE, {
    //       message: 'El tamaño del archivo debe ser menor a 10MB',
    //     }),
    //   )
    //   .refine(
    //     (files) =>
    //       files.every((file) => ACCEPTED_PHOTO_TYPES.includes(file.type)),
    //     {
    //       message: 'Solo se aceptan archivos JPG, JPEG y PNG.',
    //     },
    //   ),
    // filePhoto: z
    // .array(
    //   z.custom<File>((file) => {
    //     if (typeof window === 'undefined') {
    //       return true; // Return `true` in the server environment to avoid `File` being undefined
    //     }
    //     return file instanceof File && file.size < MAX_FILE_SIZE;
    //   }, {
    //     message: 'El tamaño del archivo debe ser menor a 10MB',
    //   })
    // )
    // .refine(
    //   (files) =>
    //     files.every((file) =>
    //       ACCEPTED_PHOTO_TYPES.includes(file.type)
    //     ),
    //   {
    //     message: 'Solo se aceptan archivos JPG, JPEG y PNG.',
    //   }
    // ),
    firstName: z
      // eslint-disable-next-line @typescript-eslint/naming-convention
      .string({ required_error: 'First name is required' })
      .max(100, 'Name is too long'),
    lastName: z
      // eslint-disable-next-line @typescript-eslint/naming-convention
      .string({ required_error: 'Last name is required' })
      .max(100, 'Last name is too long'),
    // eslint-disable-next-line @typescript-eslint/naming-convention
    zipCode: z
      // eslint-disable-next-line @typescript-eslint/naming-convention
      .string({ required_error: 'Zip code is required' })
      .max(10, 'Zip code is too long'),
    phoneNumber: z
      // eslint-disable-next-line @typescript-eslint/naming-convention
      .string({ required_error: 'Phone number is required' })
      .refine((value) => isValidPhoneNumber(value), {
        message: 'Invalid phone number',
      }),
    selectCompany: z.string({
      //eslint-disable-next-line @typescript-eslint/naming-convention
      required_error: 'El género es obligatorio.',
      //eslint-disable-next-line @typescript-eslint/naming-convention
      invalid_type_error: 'El género es obligatorio.',
    }),
    companyOwnership: z.enum(['owner', 'affiliated'], {
      //eslint-disable-next-line @typescript-eslint/naming-convention
      required_error: 'Please select at least one item',
    }),
    companyRole: z.string({
      //eslint-disable-next-line @typescript-eslint/naming-convention
      required_error: 'El género es obligatorio.',
      //eslint-disable-next-line @typescript-eslint/naming-convention
      invalid_type_error: 'El género es obligatorio.',
    }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long.' })
      .regex(/[a-zA-Z]/, 'Must contain at least one letter.')
      .regex(/(?=.*[!@#$&*])/, 'Must contain at least one special character.')
      .regex(/[0-9]/, 'Must contain at least one number.'),
    confirmPassword: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long.' })
      .regex(/[a-zA-Z]/, 'Must contain at least one letter.')
      .regex(/(?=.*[!@#$&*])/, 'Must contain at least one special character.')
      .regex(/[0-9]/, 'Must contain at least one number.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match.',
    path: ['confirmPassword'],
  });

type CardFormType = z.infer<typeof CardForm>;

export const UserDataForm = () => {
  // const router = useRouter();
  const form = useForm<CardFormType>({
    resolver: zodResolver(CardForm),
    defaultValues: {
      // filePhoto: undefined,
      phoneNumber: '',
      firstName: '',
      lastName: '',
      zipCode: '',
      selectCompany: '',
      companyOwnership: undefined,
      companyRole: '',
      password: '',
      confirmPassword: '',
    },
  });

  // const { isOpen, onClose, onOpen } = useDialog();
  // Form state management
  const [isRequestinPrcoess, setIsRequestinPrcoess] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  // const [modalMessage, setModalMessage] = useState('');
  // const [modalType, setModalType] = useState<DialogType>('error');
  const [isDisabledButton, setIsDisabledButton] = useState(true);
  // const filePhoto = useWatch({ control: form.control, name: 'filePhoto' });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  //console.log(data);
  // const modalCallToAction = (
  //   message: string,
  //   type: DialogType,
  //   time: number,
  // ) => {
  //   setModalType(type);
  //   setModalMessage(message);
  //   onOpen();
  //   setTimeout(() => {
  //     onClose();
  //   }, time);
  // };

  // Enable button if fileCv or filePhoto has files
  // useEffect(() => {
  //   setIsButtonDisabled(!(filePhoto && filePhoto.length > 0));
  //   setIsDisabledButton(!(filePhoto && filePhoto.length > 0));
  // }, [filePhoto]);

  // useEffect(() => {
  //   if (registerResponse) {
  //     setRegisterResponse(null);
  //   }
  // }, [registerResponse, setRegisterResponse]);

  // useEffect(() => {
  //   if (!editProfile) {
  //     router.push('/login');
  //   }
  // }, [editProfile, router]);

  const onSubmit = async (data: CardFormType) => {
    setIsRequestinPrcoess(!isRequestinPrcoess);
    setIsButtonDisabled(!isButtonDisabled);
    setIsDisabledButton(!isDisabledButton);
    //  formData = new FormData();

    // Append files to formData. Adjust according to your input names and structure
    // formData.append('candidatoId', '0');
    // if (data.filePhoto && data.filePhoto.length > 0) {
    //   data.filePhoto.forEach((file) => formData.append('FotoPerfil', file));
    // }
    console.warn('formData', data);
  };

  // const handleCompleteLater = () => {
  //   setEditProfile(null);
  //   modalCallToAction(
  //     '¡Has completado el registro correctamente! Ahora ingresa tu correo y contraseña para iniciar.',
  //     'success',
  //     5000,
  //   );

  //   setTimeout(() => {
  //     router.push('/login');
  //   }, 5000); // Asegúrate de que este tiempo coincida con el tiempo que el modal estará visible
  // };

  // const dropzone = {
  //   multiple: false,
  //   maxFiles: 1,
  //   maxSize: MAX_FILE_SIZE,
  //   accept: ACCEPTED_PHOTO_TYPES_CONFIG,
  // } satisfies DropzoneOptions;
  const {
    formState: { errors },
  } = form;
  const companyOptions = [
    { id: '1', name: 'Company 1' },
    { id: '2', name: 'Company 2' },
    { id: '3', name: 'Company 3' },
    { id: '4', name: 'OTHER' },
  ];
  const items = [
    {
      id: 'affiliated',
      label: 'Affiliated',
    },
    {
      id: 'owner',
      label: 'Owner',
    },
  ];
  const companyRolesOptions = [
    { id: '1', name: 'Developer' },
    { id: '2', name: 'CTO' },
    { id: '3', name: 'CEO' },
    { id: '4', name: 'Accounting' },
  ];
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
          <div className='grid grid-cols-1 gap-7 md:grid-cols-2'>
            {/* <div className='col-span-1 md:col-span-2 xl:col-span-2'>
              <FileUploaderField
                control={form.control}
                name='filePhoto'
                label='Profile picture'
                description='*png, *jpeg files up to 10MB at least 400px by 400px'
                dropzoneOptions={dropzone}
                value={filePhoto}
                onValueChange={(files) => form.setValue('filePhoto', files)}
                error={errors.filePhoto}
              />
            </div> */}
            <TextInputField
              control={form.control}
              name='firstName'
              className='col-span-1'
              label='First Name'
              placeholder='Enter your first name...'
              error={errors.firstName}
              isOptional
            />
            <TextInputField
              control={form.control}
              name='lastName'
              className='col-span-1'
              label='Last Name'
              placeholder='Enter your last name...'
              error={errors.lastName}
            />

            <TextInputField
              control={form.control}
              name='zipCode'
              className='col-span-1'
              label='Zip Code'
              placeholder='Enter your Zip Code'
              error={errors.zipCode}
              isOptional
            />
            <PhoneInputField
              control={form.control}
              name='phoneNumber'
              className='col-span-1 leading-4'
              label='Phone Number'
              error={form.formState.errors.phoneNumber}
            />
            <SelectInputField
              control={form.control}
              name='selectCompany'
              label='Company Name'
              className='col-span-1 md:col-span-2 lg:col-span-1 xl:col-span-2'
              placeholder='Select'
              options={companyOptions}
              error={errors.selectCompany}
            />
            <CheckboxGroupField
              control={form.control}
              name='items'
              className='col-span-1 md:col-span-2 lg:col-span-1 xl:col-span-2'
              label='Company ownership'
              items={items}
              // description='Select the items you want to display in the sidebar.'
              error={errors.companyOwnership}
            />
            <SelectInputField
              control={form.control}
              name='companyRole'
              label='What is your role?'
              className='col-span-1 md:col-span-2 lg:col-span-1 xl:col-span-2'
              placeholder='Select'
              options={companyRolesOptions}
              error={errors.companyRole}
            />
            <TextInputField
              control={form.control}
              name='password'
              className='col-span-1 md:col-span-2 lg:col-span-1 xl:col-span-2'
              label='Password'
              placeholder='Enter your password'
              type={isPasswordVisible ? 'text' : 'password'}
              suffix={isPasswordVisible ? <EyeLineIcon /> : <EyeIcon />}
              toggle={() => setIsPasswordVisible(!isPasswordVisible)}
              error={errors.password}
            />
            <TextInputField
              control={form.control}
              name='confirmPassword'
              className='col-span-1 md:col-span-2 lg:col-span-1 xl:col-span-2'
              label='Confirm Password'
              placeholder='Enter your password'
              type={isPasswordVisible ? 'text' : 'password'}
              suffix={isPasswordVisible ? <EyeLineIcon /> : <EyeIcon />}
              toggle={() => setIsPasswordVisible(!isPasswordVisible)}
              error={errors.confirmPassword}
            />
            <div className='flex w-full flex-col justify-center gap-2'>
              <Button
                type='submit'
                className='font-inter w-full font-medium shadow-sm'
                disabled={isButtonDisabled}
              >
                Cargar datos
                {isRequestinPrcoess && (
                  <Loader2 className='ml-2 h-4 w-4 animate-spin' />
                )}
              </Button>
              <Button
                type='button'
                variant={'secondary'}
                className='font-inter !border !border-[#D3D3D3] font-medium shadow-sm hover:opacity-75'
                // onClick={handleCompleteLater}
              >
                Completar más tarde
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};
