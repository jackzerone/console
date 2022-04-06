import { useQuery } from '@tkeel/console-hooks';
import { AttributeItem } from '@tkeel/console-types';

const url = '/tkeel-device/v1/search';
const method = 'POST';

export interface TemplateItem {
  configs: {
    attributes: { [propName: string]: AttributeItem };
  };
  id: string;
  properties: {
    basicInfo: {
      name: string;
      description: string;
    };
    sysField: {
      _createdAt: string | number;
      _updatedAt: string | number;
    };
  };
}

type RequestParams = {
  page_name?: number;
  page_size?: number;
  order_by?: string;
  is_descending?: boolean;
  query?: string;
  condition: { field: string; operator: string; value: string }[];
};
interface ApiData {
  '@type': string;
  listDeviceObject: {
    items: TemplateItem[];
  };
}

export interface KeyDataType {
  title: string;
  description: string;
  id: string;
  key?: string;
  updatedAt: string;
}

export default function useTemplateQuery({
  params,
  enabled = true,
}: {
  params: RequestParams;
  enabled?: boolean;
}) {
  const { data, ...rest } = useQuery<ApiData, undefined, RequestParams>({
    url,
    method,
    data: params,
    reactQueryOptions: {
      enabled,
    },
  });
  const items = data?.listDeviceObject?.items ?? [];
  return { items, data, ...rest };
}
