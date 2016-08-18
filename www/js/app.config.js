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
				cache: false,
				url: '',
				abstract: true,
				templateUrl: 'templates/menu.html'
			})
			.state('app.index', {
				cache: false,
				url: '',
				views: {
					'menuContent': {
						templateUrl: 'js/home/home.html',
						controller: 'GameCtrl',
						controllerAs: 'vm'
					}
				}
			})
			.state('app.teams', {
				cache: false,
				url: '/teams',
				views: {
					'menuContent': {
						templateUrl: 'js/teams/teams.html',
						controller: 'TeamCtrl',
						controllerAs: 'vm'
					}
				}
			})
			.state('app.add-team', {
				cache: false,
				url: '/add-team',
				views: {
					'menuContent': {
						templateUrl: 'js/teams/add-team.html',
						controller: 'TeamCtrl',
						controllerAs: 'vm'
					}
				},
			})
			.state('app.edit-team', {
				cache: false,
				url: '/edit-team:teamId',
				views: {
					'menuContent': {
						templateUrl: 'js/teams/edit-team.html',
						controller: 'TeamCtrl',
						controllerAs: 'vm'
					}
				},
			})
			.state('app.add-points', {
				cache: false,
				url: '/add-points:teamId',
				views: {
					'menuContent': {
						templateUrl: 'js/teams/add-points.html',
						controller: 'TeamCtrl',
						controllerAs: 'vm'
					}
				},
			})
			.state('app.scores', {
				cache: false,
				url: '/scores',
				views: {
					'menuContent': {
						templateUrl: 'js/scores/scores.html',
						controller: 'GameCtrl',
						controllerAs: 'vm'
					}
				}
			})
			.state('app.search', {
				cache: false,
				url: '/search',
				views: {
					'menuContent': {
						templateUrl: 'js/search/search.html',
						controller: 'SearchCtrl',
						controllerAs: 'vm'
					}
				},
			})
			.state('app.settings', {
				cache: false,
				url: '/settings',
				views: {
					'menuContent': {
						templateUrl: 'js/search/search.settings.html',
						controller: 'SettingsCtrl',
						controllerAs: 'vm'
					}
				}
			})
			.state('app.round', {
				cache: false,
				url: '/round',
				views: {
					'menuContent': {
						templateUrl: 'js/round/round.html',
						controller: 'RoundCtrl',
						controllerAs: 'vm'
					}
				}
			})
			.state('app.round-settings', {
				cache: false,
				url: '/round-settings',
				views: {
					'menuContent': {
						templateUrl: 'js/round/round.settings.html',
						controller: 'RoundSettingsCtrl',
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
	};

	getTeams.$inject = ['storageService'];

	function getTeams(storageService) {
		return storageService.getGame().then( function(game){
			return game.teams;
		});
	}

})();