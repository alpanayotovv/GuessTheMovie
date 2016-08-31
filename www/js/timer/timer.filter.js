(function() {
	'use strict';

	angular
		.module('app.core')
		.filter('timerFilter', timerFilter);

	function timerFilter() {
		return timerFilter;

		////////////////

		function timerFilter(time) {
			var minutes = Math.floor(time / 60);
			var seconds = time - minutes * 60;

			return stringPadLeft(minutes,'0',2)+'m:'+stringPadLeft(seconds,'0',2)+'s';
		};

		function stringPadLeft(string, pad, length) {
			return (new Array(length+1).join(pad)+string).slice(-length);
		};

	}

})();