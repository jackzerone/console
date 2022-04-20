/* eslint-disable eslint-comments/disable-enable-pair, unicorn/filename-case */
import { Base64 } from 'js-base64';

import { AceEditor } from '@tkeel/console-components';
import { plugin } from '@tkeel/console-utils';

import useAuthIdProviderRegisterMutation from '@/tkeel-console-plugin-admin-tenants/hooks/mutations/useAuthIdProviderRegisterMutation';
import useAuthIdProviderTemplateQuery from '@/tkeel-console-plugin-admin-tenants/hooks/queries/useAuthIdProviderTemplateQuery';

import EditorModal from './EditorModal';

type Props = {
  isModalOpen: boolean;
  onModalClose: () => void;
};

export default function OIDC({ isModalOpen, onModalClose }: Props) {
  const { data, refetch } = useAuthIdProviderTemplateQuery({
    params: { type: 'OIDC' },
  });
  const config = data?.config ?? '';
  const yaml = Base64.decode(config);

  const { isLoading, mutate } = useAuthIdProviderRegisterMutation({
    onSuccess: () => {
      const toast = plugin.getPortalToast();
      toast.success('设置成功');
      onModalClose();
      refetch();
    },
  });

  return (
    <>
      <AceEditor
        theme="light"
        value={yaml}
        language="yaml"
        readOnly
        height="300px"
      />
      {isModalOpen && (
        <EditorModal
          isOpen={isModalOpen}
          isConfirmButtonLoading={isLoading}
          value={yaml}
          onClose={onModalClose}
          onConfirm={(value) => {
            mutate({ data: { type: 'OIDC', config: Base64.encode(value) } });
          }}
        />
      )}
    </>
  );
}
