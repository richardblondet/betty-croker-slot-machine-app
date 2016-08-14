/*
 *|=======================================|
 *| [winners.controller.js]
 *|
 *| Winners Controller Holder
 *| 
 *| 
 *| @author Richard Blondet
 *|=======================================|
*/
;( function() {
	
	var app = angular.module('betty-crocket-app');

	app.controller('winnersController', ['$scope', bettWinnersControllerHandler ]);
	
	/**
	 * Winners Controller Function Handler.
	 * 
	 * @param  {obj} $scope Angular scope
	 * @return {obj}        Returns Shit
	 */
	function bettWinnersControllerHandler( $scope ) {
		console.log("Controller Winners Ready: ", true );
	}
}());