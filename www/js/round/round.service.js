(function() {
	'use strict';

	angular
		.module('app.core')
		.service('roundService', roundService);

	roundService.$inject = ['$window', '$q'];

	function roundService($window, $q) {
		var roundService = {
			set: set,
			get: get,
			setMovie: setMovie,
			getMovie: getMovie,
			setSettings: setSettings,
			getSettings: getSettings
		};

		return roundService;

		////////////////

		function set(round) {
			$window.localStorage.setItem('currentRound', JSON.stringify(round));
		};

		function get() {
			var deffered = $q.defer();
			var round    = JSON.parse( $window.localStorage.getItem( 'currentRound') );

			if ( !round ) { 
				round = newRound();
			}
 
			deffered.resolve(round);
			return deffered.promise;
		};

		function setMovie(movie) {
			get().then( function(round) {

				round.movie = movie;
				set(round);
			});
		};

		function getMovie() {
			return get().then( function(round) {
				if ( round.movie ) {
					return round.movie;
				}

				return false;
			});
		};

		function setSettings(settings) {
			get().then( function(round) {
				round.settings = settings;
				set(round);
			});
		};

		function getSettings() {
			return get().then( function(round) {
				if ( round.settings ) { 
					return round.settings;
				}

				return false;
			});
		};

		function newRound() {
			var round = {
				movie: false,
				settings: false
			};

			return round;
		};
	};
})();