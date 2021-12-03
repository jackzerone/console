/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from '@tkeel/console-components';
import { initGlobalState, MicroAppStateActions } from 'qiankun';

import Layout from '@/containers/Layout';
import Routes from '@/routes';
import { init as initQiankun, menusToApps } from '@/utils/qiankun';

import { fetchMenus } from '@/mock';
import { IMenu } from '@/mock/types';
import theme from '@/theme';

function App() {
  const [menus, setMenus] = useState<IMenu[]>([]);

  const actions: MicroAppStateActions = initGlobalState({ app: '' });

  const fetchData = async () => {
    try {
      const data = await fetchMenus();
      setMenus(data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const init = async () => {
    await fetchData();
    actions.onGlobalStateChange((state, prev) => {
      // eslint-disable-next-line no-console
      console.log('main-app-onGlobalStateChange', state, prev);
    });
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    initQiankun({ menus });
  }, [menus]);

  return (
    <Provider theme={theme}>
      <Router>
        <Layout menus={menus}>
          {menus.length > 0 && <Routes data={menusToApps({ menus })} />}
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
