(function() {
	'use strict';

	angular
		.module('app.core')
		.service('roundService', roundService);

	roundService.$inject = ['dependencies'];

	/* @ngInject */
	function roundService(dependencies) {
		this.func = func;

		////////////////

		function func() {
		}
	}
})();