(function() {
	'use strict';

	angular
		.module('app.core')
		.service('searchSettingsService', searchSettingsService);

	searchSettingsService.$inject = [];

	function searchSettingsService() {
		var vm      = this;
		vm.settings = {};

		var settingsService = {
			get : get,
			set : set
		};

		return settingsService;

		////////////////

		function set(settings) {
			vm.settings = settings
		};

		function get() {
			return vm.settings;
		};
	}
})();