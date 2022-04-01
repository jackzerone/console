import { Text, useDisclosure } from '@chakra-ui/react';

import { CreateButton } from '@tkeel/console-components';

import AddDevicesModal from '../AddDevicesModal';

type Props = {
  type?: 'button' | 'link';
  refetchData: () => unknown;
};

export default function AddDeviceButton({
  type = 'button',
  refetchData,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {type === 'button' ? (
        <CreateButton onClick={onOpen}>选择设备</CreateButton>
      ) : (
        <Text
          color="primary"
          fontSize="14px"
          lineHeight="32px"
          fontWeight="500"
          cursor="pointer"
          onClick={onOpen}
        >
          添加设备
        </Text>
      )}
      <AddDevicesModal
        isOpen={isOpen}
        onClose={onClose}
        refetchData={refetchData}
      />
    </>
  );
}
