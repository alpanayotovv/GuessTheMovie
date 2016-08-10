(function() {
	'use strict';

	angular
		.module('app.core')
		.service('searchServiceSettings', searchServiceSettings);

	searchServiceSettings.$inject = [];

	function searchServiceSettings() {
		var vm = this;
		vm.settings;

		var settingsService = {
			get : get,
			set: set
		};

		return settingsService;

		////////////////

		function set(settings) {
			vm.settings = settings
		};

		function get() {
			var deferred = $q.defer();
			deferred.resolve(vm.settings);
			return deferred.promise;
		};
	}
})();