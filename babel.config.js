module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: [
    ['component', {
      libraryName: 'element-ui',
      styleLibraryName: 'theme-chalk'
    }, 'element-ui'],
    'syntax-dynamic-import',
    'lodash'
  ]
};
