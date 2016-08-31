(function() {
	'use strict';

	angular
		.module('app.core')
		.controller('RoundCtrl', RoundCtrl);

	RoundCtrl.$inject = ['$scope', '$state', '$ionicScrollDelegate', '$ionicPopup', 'roundService'];

	function RoundCtrl($scope, $state, $ionicScrollDelegate, $ionicPopup, roundService) {
		var vm    = this;
		
		vm.movie       = false;
		vm.settings    = {};
		vm.timeLeft    = '';
		vm.start       = start;
		vm.pause       = pause;
		vm.started     = false;
		vm.roundStatus = 'new';
		vm.reset       = reset;
		vm.end         = end;

		activate();

		$scope.$on('timesUp', function(){
			vm.started     = false;
			vm.roundStatus = 'new';

			console.log('here');

			$ionicPopup.alert({
				title: 'Your Time Is Up',
				content: 'Sorry, but your time is up. You lost this round.'
			});
		});

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
			vm.started     = false;
			vm.roundStatus = 'paused';
		};

		function end() {
			vm.started     = false;
			vm.roundStatus = 'finished';

			$ionicPopup.alert({
				title: 'Round Won!',
				content: 'Congratulations! You just won ' + vm.settings.points  + ' points! Add them to your team!'
			});

			roundService.reset();

			$state.go('app.scores');
		};

		function reset() {
			vm.started     = false;
			vm.roundStatus = 'new';
			vm.timeLeft    = vm.settings.time * 60;
		};
	}
})();