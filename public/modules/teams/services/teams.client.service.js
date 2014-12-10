'use strict';

//Teams service used to communicate Teams REST endpoints
angular.module('teams').factory('Teams', ['$resource',
	function($resource) {
		return $resource('teams/:teamId', { teamId: '@_id'
		}, {
			update: {
				method: 'PUT'
			},
			participants: {
				url: 'teams/:teamId/participants',
				method: 'GET',
				isArray: true
			}
		});
	}
]);