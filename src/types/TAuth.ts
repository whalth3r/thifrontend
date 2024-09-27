/* eslint-disable @typescript-eslint/naming-convention */
export interface UserAuth {
  name: string | undefined;
  picture: string | undefined;
  iss: string;
  aud: string;
  auth_time: number;
  user_id: string;
  sub: string;
  iat: number;
  exp: number;
  email: string;
  email_verified: boolean;
  firebase: Firebase;
  uid: string;
}

export interface Firebase {
  identities: Identities;
  sign_in_provider: string;
}

export interface Identities {
  [key: string]: string[] | undefined;
  email: string[];
}
