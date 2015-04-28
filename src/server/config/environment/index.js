const path = require('path');
const _  = require('lodash');

function requiredProcessEnv(name) {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV || 'development',
  root: path.normalize(__dirname + '/../../..'),
  port: process.env.PORT || 9000,
  version: require('../../../../package').version,

  appLocales: ['en'],
  defaultLocale: 'en',

  log: {
    streams: [{
      stream: process.stdout,
      level: "debug"
    }]
  },

  webpackStylesExtensions: ['css', 'less', 'sass', 'scss'],

  aws: {
    key: process.env.AWS_ACCESS_KEY,
    secret: process.env.AWS_SECRET,
    bucket: process.env.AWS_BUCKET,
    url: process.env.AWS_S3_URL + process.env.AWS_BUCKET + '/'
  }
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports =  _.merge(
  all,
  require('./' + all.env + '.js') || {});
