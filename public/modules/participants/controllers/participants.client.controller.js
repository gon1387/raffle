'use strict';

// Participants controller
angular.module('participants').controller('ParticipantsController', ['$scope', '$stateParams', '$location', 'Authentication','Participants', 'Teams',
	function($scope, $stateParams, $location, Authentication, Participants, Teams) {
		$scope.authentication = Authentication;
		$scope.teams = [];
		$scope.buff = {};

		// Create new Participant
		$scope.create = function() {
			// Create new Participant object
			var participant = new Participants($scope.participant);
			console.log(participant);
			// Redirect after save
			participant.$save(function(response) {
				$location.path('participants/' + response._id);

				// Clear form fields
				$scope.participant = null;
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Participant
		$scope.remove = function(participant) {
			if ( participant ) { 
				participant.$remove();

				for (var i in $scope.participants) {
					if ($scope.participants [i] === participant) {
						$scope.participants.splice(i, 1);
					}
				}
			} else {
				$scope.participant.$remove(function() {
					$location.path('participants');
				});
			}
		};

		// Update existing Participant
		$scope.update = function() {
			var participant = $scope.participant;

			participant.$update(function() {
				$location.path('participants/' + participant._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Participants
		$scope.find = function() {
			$scope.participants = Participants.query();
		};

		// Find existing Participant
		$scope.findOne = function() {
			$scope.participant = Participants.get({ 
				participantId: $stateParams.participantId
			});
		};

		//initialize data
		$scope.initData = function(){
			$scope.teams = Teams.query();
			$scope.buff = {};
		};
	}
]);