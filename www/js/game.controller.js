(function() {
	'use strict';

	angular
		.module('app.core')
		.controller('GameCtrl', GameCtrl);

	GameCtrl.$inject = ['$state', 'gameService', 'storageService'];

	function GameCtrl($state, gameService, storageService) {
		var vm         = this;
		vm.currentGame = {};
		vm.start       = start;
		vm.end         = end;
		vm.resume      = resume;

		activate();

		function activate() {
			storageService.getGame().then( function(game){
				vm.currentGame = game;
			});
		};

		function start() {
			gameService.start();
		};

		function end() {
			vm.currentGame.started = false;
			gameService.end();
			$state.go('app.scores');
		};

		function resume() {
			vm.currentGame.started = start;
			gameService.resume();
		};
	}
})();