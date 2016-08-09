(function() {
	'use strict';

	angular
		.module('app.core')
		.service('storageService', storageService);

	storageService.$inject = ['$q','$window'];

	function storageService($q, $window) {
		var storage = {
			getGame: get,
			setGame: set,
			newGame: newGame,
		};

		var deffered = $q.defer();

		return storage;		

		////////////////

		function get() {
			var game = JSON.parse( $window.localStorage.getItem( 'movieGame') );
			
			if ( !game ) {
				var game = newGame();
			}

			deffered.resolve(game);
			return deffered.promise;
		}

		function set(game) {
			$window.localStorage.setItem( 'movieGame', JSON.stringify(game));
		}

		function newGame(){
			var game = {
				started: false,
				teams: []
			};

			return game;
		}
	}
})();	