const express = require('express');
const config = require('./config/environment/index');

var app = express();

if (config.isProduction || require('piping')(config.piping)) {

  if (!global.Intl) {
    global.Intl = require('intl');
  }

  require('babel/register');

  config.webpackStylesExtensions.forEach(function(ext) {
    require.extensions['.' + ext] = function() {};
  });

  require('./config/express')(app);
  require('./routes')(app);

  app.listen(config.port, config.ip, function (err) {
    if(err) console.err(err);

    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });

}


module.exports = app;
