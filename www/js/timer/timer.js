(function() {
	'use strict';

	angular
	.module('app.core')
	.directive('alpRoundTimer', alpRoundTimer);

	alpRoundTimer.$inject = ['$timeout', '$interval'];

	function alpRoundTimer($timeout, $interval) {
		// Usage:
		//
		// Creates:
		//
		var directive = {
			scope: { 
				time: '@',
				started: '@',
				timeleft: '='
			},
			templateUrl: 'js/timer/timer.html',
			controller: 'RoundCtrl',
			controllerAs: 'vm',
			link: link,
			restrict: 'E'
		};

		return directive;

		function link(scope, element, attrs) {
			var timerInterval;
			var maxCount      = attrs.time * 60;
			var currentCount  = 1;
			var radius        = 3;
			var circumference = 2 * radius * Math.PI; 
			var els           = document.querySelectorAll('circle');
			
			Array.prototype.forEach.call(els, function (el) {
				el.setAttribute('stroke-dasharray', circumference + 'em');
				el.setAttribute('r', radius + 'em');
			});

			scope.$watch( 'started', function(){

				if ( attrs.started == 'true' ) {
					document.querySelector('.radial-progress-center').setAttribute('r', (radius - 0.01 + 'em'));
					timerInterval = $interval( updateTime, 1000 );
				} else {
					$interval.cancel(timerInterval);
				}
			});

			function updateTime(){
				if ( currentCount >= maxCount ) {
					$interval.cancel(timerInterval);
					return;
				}
				
				var offset = -(circumference / maxCount) * currentCount + 'em';
				
				document.querySelector('.radial-progress-cover').setAttribute('stroke-dashoffset', offset);
				currentCount++;

				scope.timeleft--;	
			}
		};
	}
})();