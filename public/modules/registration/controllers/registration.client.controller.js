'use strict';

// Participants controller
angular.module('registration').controller('RegistrationController', ['$scope', '$state', '$stateParams', '$location', 'Async', 'Authentication','Participants', 'Teams',
	function($scope, $state, $stateParams, $location, Async,Authentication, Participants, Teams) {

		$scope.init = function(){
			if(!$stateParams.teamId){
				$scope.teams = Teams.query();
			} else {
				$scope.teams = Teams.query();
				Teams.get({teamId: $stateParams.teamId})
					.$promise.then(function(team){
						$scope.team = team;
						Teams.participants({teamId: team._id})
							.$promise.then(function(participants){
								$scope.participants = participants;
							});
					});
			}
		};

		$scope.selectTeam = function(team){
			$scope.team = team;
			$state.go('initParticipantRegistration', {teamId: team._id});
		};

		$scope.updateParticipant = function(participant){
			participant = new Participants(participant);
			participant.$update();
			$state.reload();
		};
	}
]);