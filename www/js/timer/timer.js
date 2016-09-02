(function() {
	'use strict';

	angular
	.module('app.core')
	.directive('alpRoundTimer', alpRoundTimer);

	alpRoundTimer.$inject = ['$rootScope', '$timeout', '$interval'];

	function alpRoundTimer($rootScope, $timeout, $interval) {
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
			var element       = document.querySelector('.radial-progress-center');
			
			Array.prototype.forEach.call(els, function (el) {
				el.setAttribute('stroke-dasharray', circumference + 'em');
				el.setAttribute('r', radius + 'em');
			});

			scope.$watch( 'started', function(){
				if ( attrs.started == 'true' ) {
					element.setAttribute('r', (radius - 0.01 + 'em'));
					timerInterval = $interval( updateTime, 1000 );
				} else {
					$interval.cancel(timerInterval);
				}
			});

			function updateTime(){
				var element = document.querySelector('.radial-progress-cover');

				if ( currentCount >= maxCount ) {
					$interval.cancel(timerInterval);
					$rootScope.$broadcast('timesUp');
					return;
				}

				if ( element ) {
					var offset = -(circumference / maxCount) * currentCount + 'em';
					element.setAttribute('stroke-dashoffset', offset);
					
					currentCount++;
					scope.timeleft--;	
				}
			}
		};
	}
})();