(function() {
	'use strict';

	angular
		.module('app.core')
		.controller('TeamCtrl', TeamCtrl);

	TeamCtrl.$inject = ['$state', '$stateParams', 'teamService', 'gameService', 'storageService'];
	
	function TeamCtrl($state, $stateParams, teamService, gameService, storageService) {
		var vm = this;
		
		vm.teamName;
		vm.addTeam     = addTeam;
		vm.currentTeam = {};
		vm.updateTeam  = updateTeam;
		vm.addPoints   = addPoints;
		vm.points      = 0;
		vm.teams       = [];

		activate();

		function activate() {
			if ( $stateParams.teamId ) {
				teamService.getTeam($stateParams.teamId).then( function(team){
					vm.currentTeam = team;
				});
			}

			storageService.getGame().then( function(game){
				vm.teams = game.teams;
			});
		};

		function addTeam() {
			if ( !vm.teamName ) {
				return;
			}

			gameService.addTeam(vm.teamName);
			$state.go('app.teams');
		};

		function updateTeam() {
			teamService.updateTeam(vm.currentTeam.name, vm.currentTeam.score, $stateParams.teamId);		
			$state.go('app.teams');	
		};

		function addPoints() {
			teamService.updateTeam(vm.currentTeam.name, vm.currentTeam.score + vm.points, $stateParams.teamId);		
			$state.go('app.teams');	
		};

	}
})();