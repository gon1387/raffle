'use strict';

// Configuring the Articles module
angular.module('teams').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Teams', 'teams', 'dropdown', '/teams(/create)?', null, null, 3);
		Menus.addSubMenuItem('topbar', 'teams', 'List Teams', 'teams');
		Menus.addSubMenuItem('topbar', 'teams', 'New Team', 'teams/create');
	}
]);