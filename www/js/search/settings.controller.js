(function() {
	'use strict';

	angular
		.module('app.core')
		.controller('SettingsCtrl', SettingsCtrl);

	SettingsCtrl.$inject = ['$state', 'searchSettingsService'];

	function SettingsCtrl($state, searchSettingsService) {
		var vm = this;

		vm.year    = '';
		vm.movie   = true;
		vm.series  = true;
		vm.episode = true;
		vm.prepare = prepare;

		function prepare(){
			var settings = {};
			var types = [];

			if ( vm.year ) {
				settings.y = vm.year;
			}

			if ( vm.movie && vm.series && vm.episode ) {
				settings.type = '';
			} else {
				if ( vm.movie ) {
					types.push('movie');
				}

				if ( vm.episode ) {
					types.push('episode');
				}

				if ( vm.series ) {
					types.push('series');
				}

				if ( types.length != 0 ) {
					settings.type = types.join();
				}				
			}

			searchSettingsService.set(settings);
			$state.go('app.search')
		}
	}
})();