'use strict';

// Configuring the Articles module
angular.module('registration').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Registration', 'registration', 'dropdown', '/', null, null, 0);
		Menus.addSubMenuItem('topbar', 'registration', 'Dashboard', '');
		Menus.addSubMenuItem('topbar', 'registration', 'New Participant', 'participants/create');
		Menus.addSubMenuItem('topbar', 'registration', 'Import', 'import/participants/csv');
	}
]);