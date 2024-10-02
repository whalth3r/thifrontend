// 'use server';
import {
  ACCEPTED_PHOTO_TYPES,
  MAX_FILE_SIZE,
} from '@/data/filesInputValidations/acceptedtypes';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { z } from 'zod';

/* eslint-disable */
const filePhotoSchema = z
  .array(
    z.instanceof(typeof File !== 'undefined' ? File : Object), // Fallback to Object in SSR
  )
  .max(1, 'Only one file is allowed.')
  .refine((files) => files.length > 0, {
    message: 'Photo is required.',
  })
  //@ts-ignore
  .refine((files) => files.every((file) => file.size <= MAX_FILE_SIZE), {
    message: 'File size is too large.',
  })
  .refine(
    //@ts-ignore
    (files) => files.every((file) => ACCEPTED_PHOTO_TYPES.includes(file.type)),
    { message: 'Invalid file type.' },
  );
/* eslint-enable */

export const userDataSchema = z
  .object({
    filePhoto: filePhotoSchema,
    firstName: z
      // eslint-disable-next-line @typescript-eslint/naming-convention
      .string(
        //eslint-disable-next-line @typescript-eslint/naming-convention
        { required_error: 'First name is required' },
      )
      .min(1, { message: 'First name is required' })

      .max(100, 'Name is too long'),
    lastName: z
      // eslint-disable-next-line @typescript-eslint/naming-convention
      .string(
        //eslint-disable-next-line @typescript-eslint/naming-convention
        { required_error: 'Last name is required' },
      )
      .min(1, { message: 'Last name is required' })
      .max(100, 'Last name is too long'),
    // eslint-disable-next-line @typescript-eslint/naming-convention
    zipCode: z
      // eslint-disable-next-line @typescript-eslint/naming-convention
      .string(
        //eslint-disable-next-line @typescript-eslint/naming-convention
        { required_error: 'Zip code is required' },
      )
      .min(1, { message: 'Zip code is required' })
      .max(10, 'Zip code is too long'),
    phoneNumber: z
      // eslint-disable-next-line @typescript-eslint/naming-convention
      .string({ required_error: 'Phone number is required' })
      .refine((value) => isValidPhoneNumber(value), {
        message: 'Invalid phone number',
      }),
    selectCompany: z.string().nullable(),
    companyName: z
      .string({
        //eslint-disable-next-line @typescript-eslint/naming-convention
        required_error: 'The company name is required.',
        //eslint-disable-next-line @typescript-eslint/naming-convention
        invalid_type_error: 'The company name is required.',
      })
      .max(100, 'Company name is too long')
      .nullable(),
    // companyOwnership: z.enum(['owner', 'affiliated'], {
    //   //eslint-disable-next-line @typescript-eslint/naming-convention
    //   required_error: 'Please select at least one item',
    // }),
    companyOwnership: z.string().nullable(),
    // companyOwnership: z.string({
    //   //eslint-disable-next-line @typescript-eslint/naming-convention
    //   required_error: 'Please select at least one item',
    // }),
    companyRole: z.string().nullable(),
    howYouFindUs: z.string(
      //eslint-disable-next-line @typescript-eslint/naming-convention
      { required_error: 'Please select at least one item' },
    ),
    otherSource: z.string().nullable(),
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
  })
  .refine(
    (data) => {
      if (data.selectCompany === 'other') {
        return (
          data.companyName !== null &&
          data.companyName !== '' &&
          data.companyName?.length > 1
        );
      }
      return true;
    },
    {
      message: 'Company name is required',
      path: ['companyName'],
    },
  )
  .refine((data) => {
    if (data.howYouFindUs === 'other')
      return (
        data.otherSource !== null &&
        data.otherSource !== '' &&
        data.otherSource?.length > 1
      );
    return true;
  });

export type UserDataType = z.infer<typeof userDataSchema>;
