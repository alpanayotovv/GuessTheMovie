(function() {
	'use strict';

	angular
		.module('app.core')
		.service('teamService', teamService);

	teamService.$inject = ['storageService'];

	function teamService(storageService) {
		var teamService = {
			updateTeam: update,
			getTeam: get
		};

		return teamService;

		////////////////

		function update(name, score, index){
			storageService.getGame().then( function(game){

				var game = game;
				game.teams[index].name = name;
				game.teams[index].score = score;

				storageService.setGame(game);
			});
		}

		function get(index){
			return storageService.getGame().then( function(game){
				return game.teams[index];
			});
		}
	}
})();