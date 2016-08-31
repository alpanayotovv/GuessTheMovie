(function() {
	'use strict';

	angular
		.module('app.core')
		.controller('RoundSettingsCtrl', RoundSettingsCtrl);

	RoundSettingsCtrl.$inject = ['$state', 'roundService', 'gameService'];

	function RoundSettingsCtrl($state, roundService, gameService) {
		var vm      = this;
		vm.save     = save;
		vm.teams    = '';
		vm.settings = {
			'time' : '1',
			'points' : '5',
			'team' : '0'
		};

		activate();

		////////////////

		function activate() {
			roundService.getSettings().then( function(settings) {
				if ( settings ) {
					vm.settings = settings;
				}
			});

			gameService.getGame().then( function(game) {
				vm.teams = game.teams;
			});
		};

		function save() {
			roundService.setSettings(vm.settings);
			$state.go('app.round');
		};
	}
})();