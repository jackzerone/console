import { Box, Button, Divider, Flex, Text } from '@chakra-ui/react';

import { PageHeaderToolbar } from '@tkeel/console-components';
import { plugin } from '@tkeel/console-utils';

export default function ThirdPartyAuth() {
  const documents = plugin.getPortalDocuments();

  return (
    <Flex flexDirection="column" height="100%">
      <PageHeaderToolbar
        name="第三方认证"
        hasSearchInput={false}
        styles={{ wrapper: { margin: '4px 0' } }}
      />
      <Divider />
      <Box paddingTop="20px">
        <Flex>
          <Text fontSize="12px" lineHeight="140%" color="gray.500">
            用户的管理在第三方，用户登录 tkeel 平台需要跳转至第三方登录。
          </Text>
          <Button
            fontSize="12px"
            lineHeight="140%"
            color="primary"
            variant="link"
            onClick={() => documents.open('')}
            // TODO: temp
            display="none"
          >
            查看文档
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
}
