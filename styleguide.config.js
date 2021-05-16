const path = require('path');

module.exports = {
  title: 'HNRQ',
  components: 'src/components/**/*.jsx',
  require: [path.join(__dirname, 'src/App.scss')],
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'src/styleguide/Wrapper')
  },
  showSidebar: true,
  usageMode: 'expand',
  exampleMode: 'expand',
  theme: {
    font: []
  },
  styles: {},
  ignore: []
};
