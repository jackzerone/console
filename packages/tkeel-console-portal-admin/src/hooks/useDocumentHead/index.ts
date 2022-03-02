import { useFavicon, useTitle } from 'react-use';

import { usePortalTenantConfigQuery } from '@tkeel/console-request-hooks';

export default function useDocumentHead() {
  const { config } = usePortalTenantConfigQuery();
  const documentTitle = config?.client.documentTitle ?? '';
  const favicon = config?.client.favicon ?? '';

  useTitle(documentTitle);
  useFavicon(favicon);
}
