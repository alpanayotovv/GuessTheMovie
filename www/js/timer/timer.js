(function() {
	'use strict';

	angular
	.module('app.core')
	.directive('alpRoundTimer', alpRoundTimer);

	alpRoundTimer.$inject = [];

	function alpRoundTimer() {
		// Usage:
		//
		// Creates:
		//
		var directive = {
			scope: { 
				time: '@',
				started: '@'
			},
			templateUrl: 'js/timer/timer.html',
			link: link,
			restrict: 'E'
		};

		return directive;

		function link(scope, element, attrs) {
			var intervalId;
			var maxCount      = attrs.time * 60;
			var currentCount  = 1;
			var radius        = 3;
			var circumference = 2 * radius * Math.PI; 
			var els           = document.querySelectorAll('circle');

			scope.timeLeft = maxCount;

			scope.$watch( 'started', function(){

				if ( attrs.started == 'true' ) {

					Array.prototype.forEach.call(els, function (el) {
						el.setAttribute('stroke-dasharray', circumference + 'em');
						el.setAttribute('r', radius + 'em');
					});

					document.querySelector('.radial-progress-center').setAttribute('r', (radius - 0.01 + 'em'));

					intervalId = setInterval(function () { 
						if ( currentCount >= maxCount ) {
							clearInterval(intervalId);
							return;
						}
						
						var offset = -(circumference / maxCount) * currentCount + 'em';
						
						document.querySelector('.radial-progress-cover').setAttribute('stroke-dashoffset', offset);
						currentCount++;

						scope.timeLeft = maxCount--;
						console.log(scope.timeLeft);

					}, 1000);

				} else {
					clearInterval(intervalId);
				}
			});
		};
	}
})();