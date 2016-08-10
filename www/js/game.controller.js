(function() {
	'use strict';

	angular
		.module('app.core')
		.controller('GameCtrl', GameCtrl);

	GameCtrl.$inject = ['gameService', 'currentGame'];

	function GameCtrl(gameService, currentGame) {
		var vm             = this;
		vm.currentGame     = currentGame;
		vm.start           = start;
		vm.end             = end;
		vm.removeTeam = removeTeam;

		function start() {
			gameService.start(vm.currentGame);
		};

		function end() {
			gameService.end(vm.currentGame);
		};

		function removeTeam(index) {
			gameService.removeTeam(index);
		}
	}
})();