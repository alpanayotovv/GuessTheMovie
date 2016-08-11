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
				templateUrl: 'templates/menu.html'
			})
			.state('app.index', {
				url: '',
				views: {
					'menuContent': {
						templateUrl: 'js/home/home.html',
						controller: 'GameCtrl',
						controllerAs: 'vm',
						resolve: {
							currentGame: getCurrentGame
						}
					}
				}
			})
			.state('app.add-team', {
				url: '/add-team',
				views: {
					'menuContent': {
						templateUrl: 'js/team/add-team.html',
						controller: 'TeamCtrl',
						controllerAs: 'vm'
					}
				},
			})
			.state('app.edit-team', {
				url: '/edit-team:teamId',
				views: {
					'menuContent': {
						templateUrl: 'js/team/edit-team.html',
						controller: 'TeamCtrl',
						controllerAs: 'vm'
					}
				},
			})
			.state('app.add-points', {
				url: '/add-points:teamId',
				views: {
					'menuContent': {
						templateUrl: 'js/team/add-points.html',
						controller: 'TeamCtrl',
						controllerAs: 'vm'
					}
				},
			})
			.state('app.search', {
				url: '/search',
				views: {
					'menuContent': {
						templateUrl: 'js/search/search.html',
						controller: 'SearchCtrl',
						controllerAs: 'vm',
						resolve: {
							settings: getSearchSettings
						}
					}
				},
			})
			.state('app.settings', {
				url: '/settings',
				views: {
					'menuContent': {
						templateUrl: 'js/search/search.settings.html',
						controller: 'SettingsCtrl',
						controllerAs: 'vm'
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

	getSearchSettings.$inject = ['searchSettingsService'];

	function getSearchSettings(searchSettingsService) {
		return searchSettingsService.get();
	}

})();