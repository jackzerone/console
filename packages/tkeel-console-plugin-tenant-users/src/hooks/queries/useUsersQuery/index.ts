import { getLocalUserInfo } from '@tkeel/console-utils';

import useQuery from '@/tkeel-console-plugin-tenant-users/hooks/useQuery';

const method = 'GET';

type RequestParams = {
  page_num?: number;
  page_size?: number;
  order_by?: string;
  is_descending?: boolean;
};

export interface User {
  tenant_id: string;
  user_id: string;
  external_id: string;
  username: string;
  email: string;
  nick_name: string;
  avatar: string;
  create_at: string;
  roles: string[];
}

export interface ApiData {
  '@type': string;
  page_num: number;
  page_size: number;
  total: number;
  users: User[];
}

export default function useUsersQuery({
  params,
}: { params?: RequestParams } = {}) {
  const { tenant_id: tenantId } = getLocalUserInfo();
  const url = `/security/v1/tenants/${tenantId}/users`;

  return useQuery<ApiData, RequestParams>({
    url,
    method,
    params,
  });
}