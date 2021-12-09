import styled from '@emotion/styled';
import { Flex, Text } from '@tkeel/console-components';

export const LayoutHeader = styled(Flex)`
  justify-content: space-between;
  height: 22px;
  margin-bottom: 20px;

  a {
    color: #79879c;
    font-size: 14px;
  }
`;

export const IconWrapper = styled(Flex)`
  align-items: center;

  svg {
    margin-left: 18px;
    cursor: pointer;
  }
`;

export const UserNameWrapper = styled(Flex)`
  align-items: center;
  cursor: pointer;
`;

export const UserName = styled(Text)`
  margin-left: 5px;
  color: #718096;
  font-size: 12px;
`;
