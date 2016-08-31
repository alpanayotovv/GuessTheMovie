(function() {
	'use strict';

	angular
		.module('app.core')
		.controller('RoundCtrl', RoundCtrl);

	RoundCtrl.$inject = ['$ionicScrollDelegate', 'roundService'];

	function RoundCtrl($ionicScrollDelegate, roundService) {
		var vm    = this;
		
		vm.movie       = false;
		vm.settings    = {};
		vm.timeLeft    = '';
		vm.start       = start;
		vm.pause       = pause;
		vm.started     = false;
		vm.roundStatus = 'new';
		vm.reset       = reset;

		activate();

		////////////////

		function activate() {
			roundService.getMovie().then( function(movie) {
				vm.movie = movie;
			});

			roundService.getSettings().then( function(settings) {
				vm.settings = settings;
				vm.timeLeft = settings.time * 60;
			});
		};

		function start() {
			vm.started = true;
			vm.roundStatus = 'started';
			$ionicScrollDelegate.scrollTop();
		};

		function pause() {
			vm.started = false;
			vm.roundStatus = 'paused';
		};

		function end() {
			vm.started     = false;
			vm.roundStatus = 'finished';
			
		};

		function reset() {
			vm.started     = false;
			vm.roundStatus = 'new';
			vm.timeLeft    = vm.settings.time * 60;
		};
	}
})();