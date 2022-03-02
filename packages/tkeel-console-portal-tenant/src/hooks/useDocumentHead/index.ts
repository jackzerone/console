import { useFavicon, useTitle } from 'react-use';

import { usePortalAdminConfigQuery } from '@tkeel/console-request-hooks';

export default function useDocumentHead() {
  const { config } = usePortalAdminConfigQuery();
  const documentTitle = config?.client.documentTitle ?? '';
  const favicon = config?.client.favicon ?? '';

  useTitle(documentTitle);
  useFavicon(favicon);
}
