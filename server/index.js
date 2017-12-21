require('babel-polyfill')
require('babel-register')({
  ignore: /\/(build|node_modules)\//,
  presets: ['env', 'babel-preset-react', 'stage-0'],
  plugins: ['add-module-exports','syntax-dynamic-import',"dynamic-import-node","react-loadable/babel"]
});


require('./server');
