(function() {
	'use strict';

	angular
		.module('app.core')
		.controller('TeamCtrl', TeamCtrl);

	TeamCtrl.$inject = ['$state', '$stateParams', 'teamService', 'gameService'];
	
	function TeamCtrl($state, $stateParams, teamService, gameService) {
		var vm = this;
		
		vm.teamName;
		vm.addTeam     = addTeam;
		vm.removeTeam  = removeTeam;
		vm.currentTeam = {};
		vm.updateTeam  = updateTeam;
		vm.addPoints  = addPoints;
		vm.points      = 0;

		activate();

		function activate() {
			if ( $stateParams.teamId ) {
				teamService.getTeam($stateParams.teamId).then( function(team){
					vm.currentTeam = team;
				});
			}
		};

		function addTeam() {
			if ( !vm.teamName ) {
				return;
			}

			gameService.addTeam(vm.teamName);
			$state.go('app.index');
		};

		function removeTeam() {

		};

		function updateTeam() {
			teamService.updateTeam(vm.currentTeam.name, vm.currentTeam.score, $stateParams.teamId);		
			$state.go('app.index');	
		};

		function addPoints() {
			teamService.updateTeam(vm.currentTeam.name, vm.currentTeam.score + vm.points, $stateParams.teamId);		
			$state.go('app.index');	
		};
	}
})();