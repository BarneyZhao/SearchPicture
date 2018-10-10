const webpack = require('webpack');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const path = require('path');

module.exports = {
  baseUrl: '',
  configureWebpack: {
    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new LodashModuleReplacementPlugin({
        shorthands: true,
        collections: true, // Support objects in “Collection” methods.
      })
    ]
  },
  // a chaining API to generate and simplify the modification of Webpack configurations
  chainWebpack: (config) => {
    // console.log(config);
    config.target('electron-renderer');

    // config.resolve.alias
    //   .set('vue$', 'vue/dist/vue.esm.js')
    //   .set('@', resolve('/client/mymm'))
    //   .set('@s',resolve('/client/shared'));
    // for (let key in envConfig.alias) {
    //   config.resolve.alias.set(key, envConfig.alias[key]);
    // }

    config.resolve.alias
      .set('vue$', 'vue/dist/vue.esm.js')
      .set('~', path.join(__dirname, '/'))
      .set('@', path.join(__dirname, '/src'));

    // config
    //   .plugin(`html-${envConfig.pageName}`) // htmlWebpackPlugin: 'html-mymm' named by pages.mymmm
    //   .tap(args => {
    //     args[0].chunksSortMode = 'none'; // 解决 Cyclic dependency error
    //     args[0].template = envConfig.template;
    //     return args;
    //   });

    // 遇到问题了暂时去掉 preload 和 prefetch
    // config.plugins.delete(`preload-${envConfig.pageName}`);
    // config.plugins.delete(`prefetch-${envConfig.pageName}`);

    // copy files from public folder to dist folder
    // config.plugins.delete('copy');

    // console.log(config);
  },
  devServer: {
    // index: envConfig.devServer.index,
    // historyApiFallback: {
    //   rewrites: [
    //     { from: /.*/, to: '/', },
    //   ]
    // },
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        secure: false,
        ignorePath: false
      }
    },
  },
  productionSourceMap: false,
};