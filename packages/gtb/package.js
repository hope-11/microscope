Package.describe({
  name: 'houpeng:gtb',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.5.1');
  api.use('ecmascript');
  api.addFiles('gtb.js', 'client');
  //api.mainModule('gtb.js');
    api.export('SVG', 'client');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('houpeng:gtb');
  api.mainModule('gtb-tests.js');
});

Npm.depends({
    'svg.js': '2.6.3'
});


//Npm.require('svg.js@2.6.3');