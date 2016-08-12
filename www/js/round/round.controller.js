(function() {
	'use strict';

	angular
		.module('app.core')
		.controller('RoundCtrl', RoundCtrl);

	RoundCtrl.$inject = ['dependencies'];

	/* @ngInject */
	function RoundCtrl(dependencies) {
		var vm    = this;
		
		vm.time   = 5 * 60 * 1000; // 
		vm.movie  = '';
		vm.points = 0;
		vm.start  = start;
		vm.pause  = pause;
		vm.end    = end;

		////////////////

		function start() {

		};

		function pause() {

		};

		function end() {

		}
	}
})();