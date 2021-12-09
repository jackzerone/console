import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from '@/containers/Layout/Header';
import Menus from '@/containers/Layout/Menus';

import { IMenu } from '@/mock/types';

import { Content, Main, Wrapper } from './index.styled';

type Props = {
  menus: IMenu[];
};

function Layout({ menus }: Props): JSX.Element {
  return (
    <Wrapper>
      <Menus data={menus} />
      <Main>
        <Header />
        <Content>
          <Outlet />
        </Content>
      </Main>
    </Wrapper>
  );
}

export default Layout;
