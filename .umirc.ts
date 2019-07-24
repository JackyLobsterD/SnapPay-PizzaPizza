import { IConfig } from 'umi-types';
// @ts-ignore
import pageRoutes from './config/router.config.js';

// ref: https://umijs.org/config/
const config: IConfig =  {

  treeShaking: true,
  history: 'hash',
  publicPath: './',

  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'SnapPay-PizzaPizza',
      dll: false,
      locale: {
        enable: true,
        default: 'en-US',
      },
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  routes: pageRoutes,
}

export default config;
