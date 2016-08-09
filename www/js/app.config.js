(function() {
	'use strict';

	angular
		.module('app.config', [])
		.config(configure)
		.run(run);

	function run($ionicPlatform) {
		$ionicPlatform.ready(function() {
			// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
			// for form inputs)
			if (window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				cordova.plugins.Keyboard.disableScroll(true);

			}
			if (window.StatusBar) {
				// org.apache.cordova.statusbar required
				StatusBar.styleDefault();
			}
		});
	};

	configure.$inject = ['$stateProvider', '$urlRouterProvider'];

	function configure($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('app', {
				url: '',
				abstract: true,
				templateUrl: 'templates/menu.html',
				controller: 'GameCtrl',
				controllerAs: 'vm',
				resolve: {
					currentGame: getCurrentGame
				}
			})
			.state('app.index', {
				url: '',
				views: {
					'menuContent': {
						templateUrl: 'js/home/home.html'
					}
				}
			})
			.state('app.find-movie', {
				url: '/find-movie',
				views: {
					'menuContent': {
						templateUrl: 'js/find-movie/find-movie.html'
					}
				}
			})

  		$urlRouterProvider.otherwise('/app/index');
	};

	getCurrentGame.$inject = ['storageService'];
	
	function getCurrentGame(storageService) {
		return storageService.getGame().then( function(game){
			return game;
		});
	}

})();