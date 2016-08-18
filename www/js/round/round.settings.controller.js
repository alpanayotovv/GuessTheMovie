(function() {
	'use strict';

	angular
		.module('app.core')
		.controller('RoundSettingsCtrl', RoundSettingsCtrl);

	RoundSettingsCtrl.$inject = ['$state', 'roundService'];

	function RoundSettingsCtrl($state, roundService) {
		var vm      = this;
		vm.save     = save;
		vm.settings = {
			'time' : '1',
			'points' : '5'
		};

		activate();

		////////////////

		function activate() {
			roundService.getSettings().then( function(settings) {
				if ( settings ) {
					vm.settings = settings;
				}
			});
		};

		function save() {
			roundService.setSettings(vm.settings);
			$state.go('app.round');
		};
	}
})();