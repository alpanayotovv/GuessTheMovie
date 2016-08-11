(function() {
	'use strict';

	angular
		.module('app.core')
		.service('searchService', searchService);

	searchService.$inject = ['$http', '$httpParamSerializer'];

	/* @ngInject */
	function searchService($http, $httpParamSerializer) {
		var END_POINT = 'http://www.omdbapi.com/?';
		
		var searchService = {
			search : search
		};

		return searchService;

		////////////////

		function search(searchSettings) {
			var queryString = $httpParamSerializer(searchSettings);
			var url = END_POINT + queryString;

			return $http.get(url).then( function(data){
				return data.data;
			});
		}
	}
})();