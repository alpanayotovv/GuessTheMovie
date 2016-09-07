(function() {
	'use strict';

	angular
		.module('app.core')
		.controller('RoundCtrl', RoundCtrl);

	RoundCtrl.$inject = ['$scope', '$state', '$ionicScrollDelegate', '$ionicPopup', '$ionicNavBarDelegate', 'roundService', 'teamService'];

	function RoundCtrl($scope, $state, $ionicScrollDelegate, $ionicPopup, $ionicNavBarDelegate, roundService, teamService) {
		var vm    = this;
		
		vm.movie       = false;
		vm.settings    = {};
		vm.timeLeft    = '';
		vm.roundStatus = 'new';
		vm.team        = {};
		vm.start       = start;
		vm.pause       = pause;
		vm.started     = false;
		vm.resetRound  = resetRound;
		vm.end         = end;

		activate();

		$scope.$on('timesUp', function(){
			vm.resetRound();

			$ionicPopup.alert({
				title: 'Your Time Is Up',
				content: 'Sorry, but your time is up. You lost this round.'
			});
		});

		$scope.$on('$ionicView.enter', function(e) {
			$ionicNavBarDelegate.showBar(true);
		});

		////////////////

		function activate() {
			roundService.getMovie().then( function(movie) {
				vm.movie = movie;
			});

			roundService.getSettings().then( function(settings) {
				vm.settings = settings;
				vm.timeLeft = settings.time * 60;

				if ( vm.settings.team ) {
					teamService.getTeam(vm.settings.team).then( function(team){
						vm.team = team;
						vm.team.index = vm.settings.team;
					});
				}
			});
		};

		function start() {
			vm.started     = true;
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
				content: 'Congratulations! You just won ' + vm.settings.points  + ' points! They were added to your team!'
			});

			var points = parseInt( vm.team.score, 10 ) + parseInt( vm.settings.points, 10 );

			teamService.updateTeam( vm.team.name, points, vm.team.index );
			roundService.reset();
			$state.go('app.scores');
		};

		function resetRound() {
			$state.reload();
		};
	}
})();