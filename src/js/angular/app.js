(function(){
	var app = angular.module('app',['loandolphin.component']);

	app.controller("mainController",["$scope","moneyService",function($scope,moneyService){
			var pub = this;
			//private functions and properties
			var priv = {};
	
			pub.title="Conversor de moedas";
			pub.from="GBP";
			pub.to="USD";
			pub.currencySource = [];
			pub.currencyTarget = [];
	
			pub.load = function(){
				pub.loading=true;
				moneyService.getCurrencies().then(function(response){
					pub.currencySource = _.keys(response.data.rates);
					pub.currencyTarget = _.keys(response.data.rates);
					pub.loading=false;
				});
			};
			pub.onChangeSelect = function(){
				pub.load();
			};
			pub.load();
	
		}]);

	angular.bootstrap(document,['app']);

})();