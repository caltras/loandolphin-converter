(function(){
	'use strict';
	
	var module = angular.module('loandolphin.component',[]);

	module.service('moneyService',["$http",function($http){
			return {
				convert : function(from, to, value){
					return $http.get("http://api.fixer.io/latest");
				},
				getCurrencies: function(){
					return $http.get("http://api.fixer.io/latest");
				}
			};
		}]);
	
	module.component('moneyConverter',{
		bindings:{
			to:"@", 
			from:"@",
		},
		templateUrl : "js/angular/component/loandolphin.converter.html",
		controller : ["$scope","moneyService","$window",function($scope,moneyService,$window){
					var pub = this;
					pub.value=1;
					var priv = {
						callback : function(response) {
						  fx.rates = response.data.rates;
						  var rate = fx(pub.value).from(pub.from).to(pub.to);
						  pub.convertedValue = rate.toFixed(4);
						},
						convert : function(){
							moneyService.convert(pub.from,pub.to,pub.value)
							.then(priv.callback)
							.catch(function(){
								$window.alert("Não foi possível fazer a conversão");
							});
						}
					};
					pub.onChangeValue = function(){
						if(pub.value){
							priv.convert();
						}
					};
					pub.$onInit = function(){
						pub.onChangeValue();
					};
					pub.$onChanges = function(changes){
						if(changes.to || changes.from || changes.value){
							pub.onChangeValue();
						}
					};
				}]
			});

})();