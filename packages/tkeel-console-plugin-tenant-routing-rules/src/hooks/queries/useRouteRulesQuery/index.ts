import { useQuery } from '@tkeel/console-hooks';

export interface RouteItemData {
  created_at: string;
  desc: string;
  id: string;
  name: string;
  status: number;
  type: number;
  updated_at: string;
  devices_status: number;
  targets_status: number;
  sub_id: number | unknown;
  model_id: string;
}

export interface ApiData {
  '@type': string;
  total: number;
  page_num: number;
  page_size: number;
  data: RouteItemData[];
}

const url = '/rule-manager/v1/rules';
const method = 'GET';

type Props = {
  pageNum: number;
  pageSize: number;
  type?: number;
};

type TRequestParams = {
  page_num: number;
  page_size: number;
  type: number;
};

export default function useRouteRulesQuery({ pageNum, pageSize, type }: Props) {
  const { data, ...rest } = useQuery<ApiData, TRequestParams>({
    url,
    method,
    params: {
      page_num: pageNum,
      page_size: pageSize,
      type: type ?? 0,
    },
    // reactQueryOptions: {
    //   queryKey: 'routeRules',
    // },
  });
  const routeRulesData = data?.data || [];

  return { routeRulesData, data, ...rest };
}
