interface LicenseType {
  checked: boolean;
  label: string;
}

export interface PreferencesData {
  licensesTypes: {
    transportation: LicenseType;
    cultivation: LicenseType;
    testing: LicenseType;
    productManufacturer: LicenseType;
    retails: LicenseType;
    delivery: LicenseType;
    testing2: LicenseType;
    operators: LicenseType;
  };
  ancillaryBusinessType: {
    pointsOfSales: LicenseType;
    hR: LicenseType;
    nutrients: LicenseType;
    pestControl: LicenseType;
    consulting: LicenseType;
    hVAC: LicenseType;
    lightning: LicenseType;
    technology: LicenseType;
    packaging: LicenseType;
    transportation: LicenseType;
    pPE: LicenseType;
    media: LicenseType;
    security: LicenseType;
    lawyers: LicenseType;
    equipments: LicenseType;
    manufacturers: LicenseType;
    genetics: LicenseType;
  };
}
