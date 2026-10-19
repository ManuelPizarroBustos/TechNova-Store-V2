
const webpackConfig = require('./webpack.test.cjs');

module.exports = function (config) {
  config.set({
    frameworks: ['jasmine'],

    files: [
      {
        pattern: 'src/**/*.spec.jsx',
        watched: true,
      },
    ],

    preprocessors: {
      'src/**/*.spec.jsx': ['webpack'],
    },

    webpack: webpackConfig,

    reporters: ['progress', 'coverage'],

    coverageReporter: {
      dir: 'coverage',
      includeAllSources: true,
      reporters: [
        { type: 'text-summary' },
        { type: 'html', subdir: 'html' },
      ],
    },

    browsers: ['Chrome'],
    singleRun: true,

    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-coverage'),
      require('karma-webpack'),
    ],
  });
};
