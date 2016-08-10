(function() {
	'use strict';

	angular
		.module('app.core')
		.controller('SearchCtrl', SearchCtrl);

	SearchCtrl.$inject = ['searchSettingsService'];

	function SearchCtrl(searchSettingsService) {
		var vm            = this;
		
		vm.showSettings   = false;
		vm.searchSettings = {};
		vm.searchPhrase   = '';

		activate();

		////////////////
		alert(1);
		function activate() {
			searchSettingsService.get().then( function(settings){
				vm.searchSettings = settings;
			});
		}
	}
})();