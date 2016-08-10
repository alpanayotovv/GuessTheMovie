(function() {
	'use strict';

	angular
		.module('app.core')
		.controller('SettingsController', SettingsController);

	SettingsController.$inject = ['dependencies'];

	/* @ngInject */
	function SettingsController(dependencies) {
		var vm = this;

		activate();

		////////////////

		function activate() {
			
		}
	}
})();