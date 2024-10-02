export interface Item {
  id: number;
  status: 'approved' | 'renewed' | 'pending' | 'revoked' | 'new';
  companyName: string;
  companyState: string;
  createdAt: string;
  licenseType: string;
  title: string;
}

export interface ActivityFeed {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  items: Item[];
  pageIndex: number;
  totalItems: number;
  totalPages: number;
}

export interface Feed {
  data: ActivityFeed;
  message: string;
  status: boolean;
}
