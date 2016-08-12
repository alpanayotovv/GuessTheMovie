(function() {
	'use strict';

	angular
		.module('app.core')
		.controller('SearchCtrl', SearchCtrl);

	SearchCtrl.$inject = ['$ionicPopup', 'searchService', 'searchSettingsService'];

	function SearchCtrl($ionicPopup, searchService, searchSettingsService) {
		var vm = this;
		
		vm.showSettings = false;
		vm.settings     = {};
		vm.phrase       = '';
		vm.results      = {};
		vm.search       = search;

		function search() {
			if ( !vm.phrase ) {
				$ionicPopup.alert({
					title: 'Error',
					content: 'Please enter some keywords.'
				});

				return;
			}
			vm.settings   = getSettings();	
			vm.settings.s = vm.phrase;

			searchService.search(vm.settings).then( function(payload) {
				if ( payload.Response === 'True' ) {
					vm.results.success = true;
					vm.results.entries = payload.Search;
					vm.results.error   = '';
				} else {
					vm.results.success = false;
					vm.results.error   = payload.Error;
				}
			});
		};

		function getSettings(){
			return searchSettingsService.get();
		}
	}
})();