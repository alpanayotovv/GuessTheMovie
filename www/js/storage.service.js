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

		return storage;		

		////////////////

		function get() {
			var deffered = $q.defer();
			var game = JSON.parse( $window.localStorage.getItem( 'movieGame') );
			
			if ( !game ) {
				var game = newGame(false);
			}

			deffered.resolve(game);

			return deffered.promise;
		}

		function set(game) {
			$window.localStorage.setItem( 'movieGame', JSON.stringify(game));
		}

		function newGame(started){
			var game = {
				started: started,
				teams: []
			};

			return game;
		}
	}
})();	