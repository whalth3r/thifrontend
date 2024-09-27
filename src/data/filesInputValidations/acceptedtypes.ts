export const ACCEPTED_FILE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
];

export const ACCEPTED_PHOTO_TYPES_CONFIG = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  'image/jpeg': ['.jpeg', '.jpg'],
  // eslint-disable-next-line @typescript-eslint/naming-convention
  'image/png': ['.png'],
};

export const ACCEPTED_PHOTO_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

export const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const MAX_DROPZONE_FILES = 10 * 1024 * 1024;
