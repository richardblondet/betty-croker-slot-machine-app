/*
 *|=======================================|
 *| [bases-promo.controller.js]
 *|
 *| Bases Promo controller file
 *| 
 *| 
 *| @author Richard Blondet
 *|=======================================|
*/
;( function() {

	var app = angular.module('betty-crocket-app');

	app.controller('basesPromoController', ['$scope', '$location', bettBasesPromoControllerHandler ])
		
		/**
		 * Handler for the controller 'basesPromoController'
		 * @param  {OBJ} $scope angular obj
		 * @return {obj}        Returns Shit
		 */
		function bettBasesPromoControllerHandler( $scope, $location ) {
			
			/**
			 * Go to register view
			 * @return {Obj} Returns shit
			 */
			$scope.register = function() {
				$location.path('/register');
			};
		}
} ());