(function() {
	'use strict';

	angular
		.module('app.core')
		.controller('SettingsCtrl', SettingsCtrl);

	SettingsCtrl.$inject = ['$state', '$ionicPopup', 'searchSettingsService'];

	function SettingsCtrl($state, $ionicPopup, searchSettingsService) {
		var vm = this;

		vm.year        = '';
		vm.rawSettings = {};
		vm.save        = save;
		vm.types       = {
			"movie": true,
			"series": true,
			"episode": true
		};

		activate();

		function activate() {
			get();
			prepare();
		};

		function get() {
			vm.rawSettings = searchSettingsService.get();
		};

		function prepare(){
			if ( ! vm.rawSettings ) {
				return;
			}

			if ( vm.rawSettings.y ) {
				vm.year = vm.rawSettings.y;
			}

			if ( ! vm.rawSettings.type ) {
				return;
			}

			var rawTypes = vm.rawSettings.type.split(',');
			vm.types = {
				"movie": ( rawTypes.indexOf('movie') !== -1) ? true : false,
				"series": ( rawTypes.indexOf('series') !== -1) ? true : false,
				"episode": ( rawTypes.indexOf('episode') !== -1) ? true : false
			};
		};

		function save(){
			var settings = {};
			var types    = [];

			if ( vm.year ) {
				settings.y = vm.year;
			}

			for ( var key in vm.types ) {
				if ( vm.types[key] ) {
					types.push(key);
				}
			}

			if ( types[0] != null ) {
				settings.type = types.join();
			} else {
				$ionicPopup.alert({
					title: 'Search Settings Error',
					content: 'Pick at least one type for the search.'
				});

				return;
			}

			searchSettingsService.set(settings);
			$state.go('app.search')
		};
	}
})();