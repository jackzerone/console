import React, { useState } from 'react';
import { Box, Flex, Heading, Image } from '@chakra-ui/react';

import { Menu } from '@/hooks/queries/useMenusQuery';

import CustomMenuLink from './CustomMenuLink';
import CustomSubMenuLink from './CustomSubMenuLink';
import MenuTitle from './MenuTitle';

import LogoImg from '@/assets/images/logo.png';

type Props = {
  menus: Menu[];
};

function Menus({ menus: menusData }: Props) {
  const [spreadMenuIds, setSpreadMenus] = useState<string[]>([]);

  const handleMenuClick = (id: string) => {
    if (spreadMenuIds.includes(id)) {
      setSpreadMenus(spreadMenuIds.filter((menuId) => menuId !== id));
    } else {
      setSpreadMenus([...spreadMenuIds, id]);
    }
  };

  return (
    <Box width="250px" backgroundColor="gray.50">
      <Flex
        alignItems="center"
        height="92px"
        paddingLeft="24px"
        borderBottomWidth="1px"
        borderBottomStyle="solid"
        borderBottomColor="grayAlternatives.50"
      >
        <Image htmlWidth="27px" src={LogoImg} alt="" />
        <Heading
          as="h1"
          marginLeft="10px"
          color="grayAlternatives.700"
          fontSize="18px"
        >
          tKeel 管理平台
        </Heading>
      </Flex>
      <Box padding="24px">
        {menusData.map((menu) => {
          const { id, name, icon, path, children } = menu;
          const spread = spreadMenuIds.includes(id);
          return (
            <Box key={id}>
              <Box key={id}>
                {children ? (
                  <MenuTitle
                    {...menu}
                    spread={spread}
                    handleMenuClick={handleMenuClick}
                  />
                ) : (
                  <CustomMenuLink
                    path={path || ''}
                    name={name}
                    icon={icon || ''}
                  />
                )}
                {children && spread && (
                  <Box>
                    {children.map((subMenu) => (
                      <CustomSubMenuLink
                        key={subMenu.id}
                        name={subMenu.name}
                        path={subMenu.path || ''}
                      />
                    ))}
                  </Box>
                )}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default Menus;
