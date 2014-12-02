'use strict';

// Participants controller
angular.module('participants').controller('ParticipantsImportController', ['$scope', '$stateParams', '$location', '$window', 'Authentication', 'PapaParse', 'Async', 'Participants',
	function($scope, $stateParams, $location, $window, Authentication, PapaParse, Async, Participants) {
		$scope.init = function(){
			$scope.config = {
				isLoading: false,
				totalSavedParticipants: 0,
				totalImportedParticipants: 0
			};
		};

		$scope.importCSV = function(file){
			PapaParse.parse(file.files[0], {
				header: true,
				delimiter: ',',
				newline: '\n',
				dynamicTyping: true,
				complete: $scope.resultHandler
			});
		};

		$scope.importParticipantsToServer = function(){
			Async.mapSeries(
				$scope.participants, 
				function(participant, next){
					var newParticipant = new Participants({
						firstname: participant.firstname,
						middlename: participant.middlename, 
						lastname: participant.lastname, 
						isPresent: participant.isPresent, 
					});

					// Redirect after save
					newParticipant.$save(function(response) {
						response.isSaved = true;
						$scope.config.isLoading = true;
						$scope.config.totalSavedParticipants++;
						next(null, response);
					}, function(errorResponse) {
						next(errorResponse.data.message, newParticipant);
					});
				},
				function(err, participants){
					//TODO: Make sure to handle error
					if(err);
					$scope.config.isLoading = false;
					$scope.participants = participants;
				});
		};

		$scope.resultHandler = function(result){
			if(!$scope.import || !$scope.import.csv){
				$scope.import = {};
				$scope.import.csv = {};
			}
			$scope.import.csv.result = result;
			console.log(result);
			$scope.participants = result.data;
			$scope.config.totalImportedParticipants = $scope.participants.length;
			$scope.$apply();
		};

		$scope.reset = function(){
			$window.location.reload();
		};
	}
]);