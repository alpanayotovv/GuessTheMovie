(function() {
	'use strict';

	angular
		.module('app.core')
		.controller('RoundCtrl', RoundCtrl);

	RoundCtrl.$inject = ['roundService'];

	function RoundCtrl(roundService) {
		var vm    = this;
		
		vm.time   = ''
		vm.movie  = false;
		vm.settings = {};
		vm.start  = start;
		vm.pause  = pause;

		activate();

		////////////////

		function activate() {
			roundService.getMovie().then( function(movie) {
				vm.movie = movie;
			});

			roundService.getSettings().then( function(settings) {
				vm.settings = settings;
			});
		};

		function start() {

		};

		function pause() {

		};

		function end() {

		};
	}
})();