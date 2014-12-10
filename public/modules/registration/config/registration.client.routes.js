'use strict';

//Setting up route
angular.module('registration').config(['$stateProvider',
	function($stateProvider) {
		$stateProvider.
		state('initTeamSelection', {
			url: '/registration',
			templateUrl: 'modules/registration/views/team.selection.registration.client.view.html'
		}).
		state('initParticipantRegistration', {
			url: '/registration/:teamId',
			templateUrl: 'modules/registration/views/participant.registration.client.view.html'
		});
	}
]);