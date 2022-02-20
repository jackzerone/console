// import { useDisclosure } from '@chakra-ui/react';
import { MoreActionButton, toast } from '@tkeel/console-components';
import { TrashFilledIcon } from '@tkeel/console-icons';

import useDeleteSubscriptionMutation from '@/tkeel-console-plugin-tenant-data-subscription/hooks/mutations/useDeleteSubscriptionMutation';
// import DeleteSubscriptionModal from '@/tkeel-console-plugin-tenant-data-subscription/pages/Index/components/DeleteSubscriptionModal';

type Props = {
  id: string;
  refetchData: () => unknown;
};

function DeleteSubscriptionButton({ id, refetchData }: Props) {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate } = useDeleteSubscriptionMutation({
    id,
    onSuccess() {
      // onSuccess();
      toast({ status: 'success', title: '删除订阅成功' });
      refetchData();
      // onClose();
    },
  });

  // const handleConfirm = () => {
  //   mutate({});
  // };
  return (
    <>
      <MoreActionButton
        icon={<TrashFilledIcon />}
        title="删除订阅"
        onClick={() => {
          // eslint-disable-next-line no-console
          // onOpen();
          // console.log('停用插件');
          mutate({});
        }}
      />
      {/* <DeleteSubscriptionModal
        isOpen={isOpen}
        isConfirmButtonLoading={isLoading}
        onClose={onClose}
        onConfirm={handleConfirm}
      /> */}
    </>
  );
}

export default DeleteSubscriptionButton;