import { IConfig, IPlugin } from 'umi-types';
import defaultSettings from './defaultSettings'; // https://umijs.org/config/

import slash from 'slash2';
import webpackPlugin from './plugin.config';
const { pwa, primaryColor } = defaultSettings; // preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;
const isAntDesignProPreview = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site';
const plugins: IPlugin[] = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: 'en-US',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
        baseSeparator: '-',
      },
      // dynamicImport: {
      //   loadingComponent: './components/PageLoading/index',
      //   webpackChunkName: true,
      //   level: 3,
      // },
      pwa: pwa
        ? {
          workboxPluginMode: 'InjectManifest',
          workboxOptions: {
            importWorkboxFrom: 'local',
          },
        }
        : false, // default close dll, because issue https://github.com/ant-design/ant-design-pro/issues/4665
      // dll features https://webpack.js.org/plugins/dll-plugin/
      // dll: {
      //   include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
      //   exclude: ['@babel/runtime', 'netlify-lambda'],
      // },
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
]; // 针对 preview.pro.ant.design 的 GA 统计代码

export default {
  plugins,
  block: {
    // 国内用户可以使用码云
    // defaultGitUrl: 'https://gitee.com/ant-design/pro-blocks',
    defaultGitUrl: 'https://github.com/ant-design/pro-blocks',
  },
  hash: true,
  targets: {
    ie: 11,
  },
  devtool: isAntDesignProPreview ? 'source-map' : false,
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: [
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
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': primaryColor,
  },
  define: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (
      context: {
        resourcePath: string;
      },
      _: string,
      localName: string
    ) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map((a: string) => a.replace(/([A-Z])/g, '-$1'))
          .map((a: string) => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/',
  },
  chainWebpack: webpackPlugin,
  proxy: {
    '/api/': {
      target: 'http://www.texting.co.nz/api/',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    },
  },
} as IConfig;
