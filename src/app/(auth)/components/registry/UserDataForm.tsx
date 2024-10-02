'use client';

//import { useState } from 'react';
import { useState } from 'react';
import { DropzoneOptions } from 'react-dropzone';
// import { DropzoneOptions } from 'react-dropzone';
import { useForm, useWatch } from 'react-hook-form';

import {
  ACCEPTED_PHOTO_TYPES_CONFIG,
  MAX_FILE_SIZE,
} from '@/data/filesInputValidations/acceptedtypes';
import {
  UserDataType,
  userDataSchema,
} from '@/schemas/auth/userDataForm.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';

// import { useRouter } from 'next/navigation';
import { CheckboxGroupField } from '@/components/common/shadcn_extentions/inputs/CheckboxInput';
import { SelectInputField } from '@/components/common/shadcn_extentions/inputs/SelectInput';
import { TextInputField } from '@/components/common/shadcn_extentions/inputs/TextInput';
import { FileUploaderField } from '@/components/common/shadcn_extentions/inputs/file-uploader/FileUploaderInput';
// import { FileUploaderField } from '@/components/common/shadcn_extentions/inputs/file-uploader/FileUploaderInput';
import { PhoneInputField } from '@/components/common/shadcn_extentions/inputs/phone-input/PhoneInputField';
import { EyeIcon } from '@/components/icons/EyeIcon';
import { EyeLineIcon } from '@/components/icons/EyeLineIcon';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

export const UserDataForm = () => {
  // const router = useRouter();
  const form = useForm<UserDataType>({
    resolver: zodResolver(userDataSchema),
    defaultValues: {
      filePhoto: [],
      phoneNumber: '',
      firstName: '',
      lastName: '',
      zipCode: '',
      selectCompany: '',
      companyName: null,
      companyOwnership: null,
      companyRole: '',
      howYouFindUs: '',
      otherSource: null,
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
  const filePhoto = useWatch({ control: form.control, name: 'filePhoto' });
  const companySelect = form.watch('selectCompany');
  const whereDidYouHearOfUs = form.watch('howYouFindUs');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  // const phone = form.watch('phoneNumber');
  // console.log(phone);
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

  const onSubmit = async (data: UserDataType) => {
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
    setTimeout(() => {
      setIsRequestinPrcoess(!isRequestinPrcoess);
      setIsButtonDisabled(!isButtonDisabled);
      setIsDisabledButton(!isDisabledButton);
    }, 1000);
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
  const dropzone = {
    multiple: false,
    maxFiles: 1,
    maxSize: MAX_FILE_SIZE,
    accept: ACCEPTED_PHOTO_TYPES_CONFIG,
  } satisfies DropzoneOptions;
  const {
    formState: { errors },
  } = form;
  const companyOptions = [
    { id: 'company1', name: 'Company 1' },
    { id: 'company2', name: 'Company 2' },
    { id: 'company3', name: 'Company 3' },
    { id: 'other', name: 'OTHER' },
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
  const howYouFindUsOptions = [
    { id: 'facebook', name: 'Facebook' },
    { id: 'instagram', name: 'Instagram' },
    { id: 'linkedin', name: 'Linkedin' },
    { id: 'other', name: 'Other' },
  ];
  return (
    <>
      <div className='mx-auto flex w-full flex-col items-center gap-2'>
        <div className='w-full py-4'>
          <div className='w-full text-start text-sm font-medium leading-7 text-[#99A0AE]'>
            {2}/{4}
          </div>
          <h2 className='text-start text-2xl font-semibold leading-8 tracking-tighter'>
            Let’s get to know yo
          </h2>
          <p className='mt-7 w-full text-start text-lg font-normal leading-7'>
            We&rsquo;re excited to have you! Please share a few details so we
            can create your account.
          </p>
        </div>
        <div className='w-full border border-dotted'></div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='mt-4 w-full'>
          <div className='grid grid-cols-1 gap-7 md:grid-cols-2'>
            <div className='col-span-1 md:col-span-2 xl:col-span-2'>
              <FileUploaderField
                control={form.control}
                name='filePhoto'
                label='Profile picture'
                description='*png, *jpeg files up to 10MB at least 400px by 400px'
                dropzoneOptions={dropzone}
                value={filePhoto as unknown as File[]}
                onValueChange={(files) => form.setValue('filePhoto', files)}
                error={errors.filePhoto}
              />
            </div>
            <TextInputField
              control={form.control}
              name='firstName'
              className='col-span-1'
              label='First Name'
              placeholder='Enter your first name...'
              error={errors.firstName}
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
              error={errors.phoneNumber}
            />
            <SelectInputField
              control={form.control}
              name='selectCompany'
              label='Select your company'
              className='col-span-1 md:col-span-2'
              placeholder='Select'
              options={companyOptions}
              error={errors.selectCompany}
              isOptional
            />
            {companySelect === 'other' && (
              <TextInputField
                control={form.control}
                name='companyName'
                className='col-span-1 md:col-span-2'
                label='Company Name'
                placeholder='Enter your company name'
                error={errors.companyName}
              />
            )}
            <CheckboxGroupField
              control={form.control}
              name='companyOwnership'
              className='col-span-1 md:col-span-2 lg:col-span-1 xl:col-span-2'
              label='Company ownership'
              items={items}
              // description='Select the items you want to display in the sidebar.'
              error={errors.companyOwnership}
              isOptional
            />
            <SelectInputField
              control={form.control}
              name='companyRole'
              label='What is your role?'
              className='col-span-1 md:col-span-2'
              placeholder='Select'
              options={companyRolesOptions}
              error={errors.companyRole}
              isOptional
            />
            <TextInputField
              control={form.control}
              name='password'
              className='col-span-1 md:col-span-2 lg:col-span-1'
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
              className='col-span-1 md:col-span-2 lg:col-span-1'
              label='Confirm Password'
              placeholder='Enter your password'
              type={isConfirmPasswordVisible ? 'text' : 'password'}
              suffix={isConfirmPasswordVisible ? <EyeLineIcon /> : <EyeIcon />}
              toggle={() =>
                setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
              }
              error={errors.confirmPassword}
            />
            <SelectInputField
              control={form.control}
              name='howYouFindUs'
              label='Where did you hear about us?'
              className='col-span-1 md:col-span-2'
              placeholder='Select'
              options={howYouFindUsOptions}
              error={errors.howYouFindUs}
            />
            {whereDidYouHearOfUs === 'other' && (
              <TextInputField
                control={form.control}
                name='otherSource'
                className='col-span-1 md:col-span-2'
                label='Name of the source'
                placeholder='Write the name of the source'
                error={errors.otherSource}
              />
            )}
            <div className='col-span-1 md:col-span-2'>
              <div className='flex flex-col items-center justify-center gap-4 md:flex-row md:justify-end'>
                <Button
                  type='button'
                  variant={'secondary'}
                  className='font-inter order-2 w-full !border !border-[#D3D3D3] font-medium shadow-sm hover:opacity-75 md:order-1 md:w-fit'
                  // onClick={handleCompleteLater}
                >
                  Back
                </Button>
                <Button
                  type='submit'
                  className='font-inter order-1 w-full font-medium shadow-sm md:order-2 md:w-fit'
                  disabled={isButtonDisabled}
                >
                  Continue
                  {isRequestinPrcoess && (
                    <Loader2 className='ml-2 h-4 w-4 animate-spin md:order-1' />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};
