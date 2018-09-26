module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  /**
   * 0 - turn the rule off
   * 1 - turn the rule on as a warning
   * 2 - turn the rule on as an error
  */
  rules: {
    // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'semi': ['error', 'always'], // 代码结尾分号
    'eol-last': 0, // 所有代码末添加空行
    'no-useless-escape': 0, // 取消没用的的转义符号
    'one-var': 0, // 可以一个var定义多个变量
    'no-new': 0, // 用变量接收new 对象
    'no-caller': 0, // disallow use of caller/callee
    'comma-dangle': 0, // 不校验末行逗号,推荐加上逗号
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};