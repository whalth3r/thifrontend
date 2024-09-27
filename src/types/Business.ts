export type LicenseStatus = 'Active' | 'Inactive' | 'Pending';

export interface Business {
  id: string | number;
  industry: string;
  licenseType: string;
  licenseStatus: LicenseStatus;
  companyName: string;
  state: string;
  detailsUrl: string;
  coordinates: { lng: number; lat: number };
}

export type QueryObject = Partial<
  Omit<Business, 'id' | 'detailsUrl' | 'coordinates' | 'licenseStatus'>
> & { zipCode: string; licenseStatus?: string };
