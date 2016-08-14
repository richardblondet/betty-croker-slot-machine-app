/*
 *|=======================================|
 *| [register.controller.js]
 *|
 *| Registration controller
 *| Responsible for: 'views/register.html'
 *| 
 *| 
 *| @author Richard Blondet
 *|=======================================|
*/
;( function() {
	var app = angular.module('betty-crocket-app');

	app.controller('registerController', ['$scope', '$location', bettyRegisterControllerHandler ]);

	/**
	 * Register controller responsible for the
	 * logic of the registration view.
	 * 
	 * @param  {obj} $scope angular scope for view
	 * @param {obj} $location route location service handler
	 * @return {undefined} 				Returns shit
	 */
	function bettyRegisterControllerHandler( $scope, $location ){
		
		/**
		 * Player data model
		 * @type {Object}
		 */
		$scope.player = {
			name: "",
			cedula: "",
			phone: "",
			email: "",
		};
		
		/**
		 * Save user information before player
		 * @return {obj} [TODO]
		 */
		$scope.play = function() {
			if(! $scope.player.name ) {
				alert("El nombre es un campo necesario para jugar");
				return;
			}
			if(! $scope.player.cedula ) {
				alert("La cédula es un campo necesario para jugar");
				return;
			}
			if( $scope.player.cedula.length != 13 ) {
				alert("Cédula inválida, inserte una cédula válida");
				return;
			}
			if(! $scope.player.phone ) {
				alert("El teléfono es un campo necesario para jugar");
				return;
			}
			if(! $scope.player.name ) {
				alert("El email es un campo necesario para jugar");
				return;
			}
			// Perform service API call
			// 
			// end of API call
			
			$location.path('/play');
		};

		/**
		 * Go to the terms view
		 * @return {obj} Returns Shit
		 */
		$scope.terms = function() { 
			$location.path('/terms');
		};
	}

}());