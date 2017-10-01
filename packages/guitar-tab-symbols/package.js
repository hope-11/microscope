Package.describe({
  name: 'houpeng:guitar-tab-symbols',
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
  api.use(['ecmascript', 'jquery']);
  api.addFiles([
        'parameters.js',
        'tab.js',
        'guitar-bar.js',
        'guitar-chord.js',
        'guitar-note.js',
        'numbered-note.js',
        'numbered-bar.js',
        'guitar-wire.js',
        'notation-link.js'
      ], 'client');
  api.export(['SVG', 'parameters'], 'client');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('houpeng:guitar-tab-symbols');
  api.mainModule('guitar-tab-symbols-tests.js');
});

Npm.depends({
    'svg.js': '2.6.3'
});
