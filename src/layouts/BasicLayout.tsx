/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */

import ProLayout, {
  MenuDataItem,
  BasicLayoutProps as ProLayoutProps,
  Settings,
} from '@ant-design/pro-layout';
import React, { useEffect } from 'react';
import Link from 'umi/link';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';

import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import { ConnectState } from '@/models/connect';
import logo from '../assets/logo.png';

export interface BasicLayoutProps extends ProLayoutProps {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
  settings: Settings;
  dispatch: Dispatch;
}
export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
};

/**
 * use Authorized check all menu item
 */

// const menuDataRender = { () => menuData}

const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] =>
  menuList.map(item => {
    const localItem = {
      ...item,
      children: item.children ? menuDataRender(item.children) : [],
    };
    return Authorized.check(item.authority, localItem, null) as MenuDataItem;
  });

const footerRender: BasicLayoutProps['footerRender'] = (_, defaultDom) => {
  return (
    <>

      <div
        style={{
          padding: '0px 24px 24px',
          textAlign: 'center',
        }}
      >
        Powered by Texting.co.nz 2019
      </div>
    </>
  );
};

const BasicLayout: React.FC<BasicLayoutProps> = props => {
  const { dispatch, children, settings } = props;
  /**
   * constructor
   */

  useEffect(() => {

    const menuData = [
      {
        path: '/',
        redirect: '/dashboard',
      },
      {
        name: 'dashboard',
        path: '/dashboard',
        icon: 'smile',
        component: './dashboard',
      },
      {
        name: 'upload-data',
        path: '/upload-data',
        icon: 'upload',
        component: './uploaddata',
      },
      {
        name: 'appointment',
        path: '/appointment',
        icon: 'calendar',
        component: './appointment',
      },
      {
        path: '/appointment/create',
        component: './appointment/create',
      },
      {
        path: '/appointment/edit',
        component: './appointment/edit',
      },
      {
        name: 'sending-a-sms',
        path: '/sendingsms',
        icon: 'mail',
        component: './sendingsms',
      },
      {
        name: 'batch-sending',
        path: '/batch-sending',
        icon: 'table',
        component: './batchsending',
      },
      {
        name: 'sms',
        path: '/sm',
        icon: 'inbox',
        component: './sm',
      },
      {
        name: 'setting',
        path: '/setting',
        icon: 'setting',
        component: './setting',
      },
      {
        name: 'usertemplate',
        path: '/template',
        icon: 'switcher',
        component: './usertemplate',
      },
      {
        name: 'members',
        path: '/member',
        icon: 'team',
        component: './member',
      },
      {
        path: '/member/create',
        component: './member/create',
      },
      {
        path: '/member/edit',
        component: './member/edit',
      },
      {
        name: 'management',
        path: '/management',
        icon: 'file',
        routes: [
          {
            name: 'users',
            path: '/management/users',
            component: './management/users',
            icon: 'file',
          },
          {
            name: 'template',
            path: '/management/template',
            icon: 'file',
            component: './management/template',
          },
          {
            path: '/management/template/create',
            component: './management/template/create',
          },
          {
            path: '/management/template/edit',
            component: './management/template/edit',
          },
          {
            name: 'company',
            path: '/management/company',
            icon: 'file',
            component: './management/company',
          },
          {
            path: '/management/company/create',
            component: './management/company/create',
          },
          {
            path: '/management/company/edit',
            component: './management/company/edit',
          },
          {
            name: 'role',
            path: '/management/role',
            icon: 'file',
            component: './management/role',
          },
          {
            path: '/management/role/create',
            component: './management/role/create',
          },
          {
            path: '/management/role/edit',
            component: './management/role/edit',
          },
        ],
      },

      {
        component: './404',
      },
    ]
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
      dispatch({
        type: 'settings/getSetting',
      });
    }
  }, []);

  /**
   * init variables
   */
  const handleMenuCollapse = (payload: boolean): void => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  };



  return (
    <ProLayout
      logo={logo}
      onCollapse={handleMenuCollapse}


      menuItemRender={(menuItemProps, defaultDom) => {
        if (menuItemProps.isUrl) {
          return defaultDom;
        }
        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}
      breadcrumbRender={(routers = []) => [
        {
          path: '/',
          breadcrumbName: formatMessage({
            id: 'menu.home',
            defaultMessage: 'Home',
          }),
        },
        ...routers,
      ]}
      itemRender={(route, params, routes, paths) => {
        const first = routes.indexOf(route) === 0;
        return first ? (
          <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
        ) : (
            <span>{route.breadcrumbName}</span>
          );
      }}
      footerRender={footerRender}
      menuDataRender={menuDataRender}
      formatMessage={formatMessage}
      rightContentRender={rightProps => <RightContent {...rightProps} />}
      {...props}
      {...settings}
    >
      {children}
    </ProLayout>
  );
};

export default connect(({ global, settings }: ConnectState) => ({
  collapsed: global.collapsed,
  settings,
}))(BasicLayout);
