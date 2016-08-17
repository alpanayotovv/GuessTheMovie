(function() {
	'use strict';

	angular
		.module('app.core')
		.controller('GameCtrl', GameCtrl);

	GameCtrl.$inject = ['gameService', 'storageService'];

	function GameCtrl(gameService, storageService) {
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
		};

		function resume() {
			vm.currentGame.started = start;
			gameService.resume();
		};
	}
})();