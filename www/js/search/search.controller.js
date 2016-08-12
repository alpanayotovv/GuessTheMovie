(function() {
	'use strict';

	angular
		.module('app.core')
		.controller('SearchCtrl', SearchCtrl);

	SearchCtrl.$inject = ['$scope', '$ionicPopup', '$ionicLoading', 'searchService', 'searchSettingsService'];

	function SearchCtrl($scope, $ionicPopup, $ionicLoading, searchService, searchSettingsService) {
		var vm = this;
		
		vm.settings    = {};
		vm.phrase      = '';
		vm.results     = {
			entries: []
		};
		vm.requestPage = 1;
		vm.pages       = 1;
		vm.loadMore    = false;
		vm.search      = search;
		vm.load        = load;

		function search() {
			if ( !vm.phrase ) {
				$ionicPopup.alert({
					title: 'Error',
					content: 'Please enter some keywords.'
				});

				return;
			}
			
			vm.requestPage   = 1;
			vm.settings      = getSettings();	
			vm.settings.s    = vm.phrase;
			vm.settings.page = vm.requestPage;

			$ionicLoading.show({
				template: 'Searching...'
			});

			searchService.search(vm.settings).then( function(payload) {
				contentLoaded(payload, true);
				$ionicLoading.hide();
			});
		};

		function load() {
			if ( vm.requestPage > vm.pages ) {
				vm.loadMore = false;
				return;
			}

			vm.settings.page = vm.requestPage;

			searchService.search(vm.settings).then( function(payload){
				contentLoaded(payload, false);
				$scope.$broadcast('scroll.infiniteScrollComplete');
			});

		};

		function contentLoaded(payload, initialRequest){

			if ( payload.Response === 'True' ) {
				if ( initialRequest ) {
					vm.results.entries = [];

					if ( parseInt(payload.totalResults) > 10 ) {
						vm.pages    = Math.ceil( payload.totalResults / 10 );
						vm.loadMore = true;
						vm.requestPage++; 
					}
				} else {
					vm.requestPage++;	
				}

				vm.results.success = true;
				vm.results.entries = vm.results.entries.concat(payload.Search);
				vm.results.error   = '';
			} else {

				vm.results.success = false;
				vm.results.error   = payload.Error;
				vm.loadMore        = false;
			}
			
		};

		function getSettings(){
			return searchSettingsService.get();
		};
	}
})();