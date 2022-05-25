import { useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';

import {
  SetPasswordModal,
  useSetPasswordUrl,
} from '@tkeel/console-business-components';
import { CreateButton } from '@tkeel/console-components';
import { AuthType } from '@tkeel/console-types';

import useCreateTenantMutation from '@/tkeel-console-plugin-admin-tenants/hooks/mutations/useCreateTenantMutation';
import { FormValues } from '@/tkeel-console-plugin-admin-tenants/pages/Tenants/components/BaseTenantModal';
import CreateTenantModal from '@/tkeel-console-plugin-admin-tenants/pages/Tenants/components/CreateTenantModal';

type Props = {
  onSuccess: () => void;
};

export default function CreateTenantButton({ onSuccess }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [authType, setAuthType] = useState<AuthType>();
  const {
    isOpen: isSuccessModalOpen,
    onOpen: onSuccessModalOpen,
    onClose: onSuccessModalClose,
  } = useDisclosure();
  const {
    isLoading: isCreateTenantLoading,
    mutate,
    data,
  } = useCreateTenantMutation({
    onSuccess: () => {
      onSuccess();
      onClose();
      onSuccessModalOpen();
    },
  });

  const { isLoading: isSetPasswordUrlLoading, setPasswordUrl } =
    useSetPasswordUrl({
      data: { reset_key: data?.reset_key ?? '' },
    });

  const handleConfirm = (formValues: FormValues) => {
    setAuthType(formValues.auth_type);
    mutate({ data: formValues });
  };

  return (
    <>
      <CreateButton onClick={onOpen}>创建租户空间</CreateButton>
      {isOpen && (
        <CreateTenantModal
          isOpen={isOpen}
          isConfirmButtonLoading={isCreateTenantLoading}
          formFields={{}}
          onClose={onClose}
          onConfirm={handleConfirm}
        />
      )}
      {isSuccessModalOpen && authType === 'internal' && (
        <SetPasswordModal
          isOpen={isSuccessModalOpen}
          title="创建租户空间成功"
          description="123"
          url={setPasswordUrl}
          isLoading={isSetPasswordUrlLoading}
          onClose={onSuccessModalClose}
        />
      )}
    </>
  );
}
