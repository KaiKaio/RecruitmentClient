const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', 
    { libraryName: 
      'antd-mobile',
      libraryDirectory: 'es',
      style: true 
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@brand-primary': '#1196DB',"brand-primary-tap":"#1196B6" },
  }),
);