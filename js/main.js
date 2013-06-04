/*global require, window */

// Author: Loïc Knuchel <loicknuchel@gmail.com>

// Require.js allows us to configure shortcut alias
require.config({
	paths: {
		knockout: '../bower_components/knockout.js/knockout'
	}
});

require([
    '/webida.js',
	'knockout',
	'config/global',
	'viewmodels/todo',
	'extends/handlers'
], function (webida, ko, g, TodoViewModel) {
	'use strict';

    var fsPath = webida.fs.getFsPathFromPathname(window.location.pathname) + '/data.json';
    var approot = webida.fs.mount(window.location.href);
    approot.readFile(fsPath, 'utf8', function (err, txt) {
        var todos;
        if (err) {
            todos = null;
        } else {
            todos = ko.utils.parseJson(txt);
        }
        ko.applyBindings(new TodoViewModel(todos || []));
    });
  
});
