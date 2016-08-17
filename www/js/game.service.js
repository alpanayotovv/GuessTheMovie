(function() {
	'use strict';

	angular
		.module('app.core')
		.service('gameService', gameService);

	gameService.$inject = ['$state', 'storageService'];

	function gameService($state, storageService) {
		var newTeamModal;

		var gameService = {
			addTeam: addTeam,
			start: start,
			resume: resume,
			end: end,
			removeTeam: removeTeam,
			getGame: getGame
		};
		
		return gameService;

		////////////////

		function addTeam(teamName) {
			getGame().then( function(game){
				var team = {
					name: teamName,
					score: parseInt(0)
				};

				game.teams.push(team);
				setGame(game);
			});
		};

		function start() {
			getGame().then( function(game) {
				game = storageService.newGame(true);
				setGame(game);
				$state.go('app.teams');
			});
		}

		function resume(){
			getGame().then( function(game) {  
				game.started = true;
				setGame(game);
			});
		};

		function end(){
			getGame().then( function(game) {
				game.started = false;
				setGame(game);
			});
		}

		function removeTeam(teamIndex) {
			getGame().then( function(game){
				game.teams.splice(teamIndex, 1);
				setGame(game);
			});
		};

		function getGame() {
			return storageService.getGame().then(function(game){
				return game;
			});
		};

		function setGame(game) {
			storageService.setGame(game);
		};
	}
})();