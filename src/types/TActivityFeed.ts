export interface ActivityFeed {
  id: number;
  status: 'approved' | 'renewed' | 'pending' | 'revoked' | 'newCompany';
  activity: string;
  companyName: string;
  state: string;
  date: string;
}
