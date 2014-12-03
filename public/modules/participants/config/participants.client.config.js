'use strict';

// Configuring the Articles module
angular.module('participants').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Participants', 'participants', 'dropdown', '/participants(/create)?', null, null, 1);
		Menus.addSubMenuItem('topbar', 'participants', 'List Participants', 'participants');
		Menus.addSubMenuItem('topbar', 'participants', 'New Participant', 'participants/create');
		Menus.addSubMenuItem('topbar', 'participants', 'Import', 'import/participants/csv');
	}
]);