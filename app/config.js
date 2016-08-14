/*
 *|=======================================|
 *| [config.js]
 *|
 *| App config file
 *| 
 *| 
 *| @author Richard Blondet
 *|=======================================|
*/

;( function(){
	/**
	* betty-crocket-app Module
	*/
	var app = angular.module('betty-crocket-app', [
		'ngTouch',
		'ngSanitize',
		'ngAnimate',
		'ngRoute',
		'ngMask',
	]);
	
	app.config(['$routeProvider', bettCrocketConfigHandler ]);

	/**
	 * Configuration function handler
	 * @param  {obj} $routeProvider Sets the logic for the route
	 * @return {undefined}                Returns shit
	 */
	function bettCrocketConfigHandler( $routeProvider ) {
		/*
		*|--------------------
		*| Route provider
		*|--------------------
		*/
		$routeProvider

		/*
		*|--------------------
		*| Blank view
		*|--------------------
		*/
		.when('/', {
			templateUrl: 'app/views/blank.html',
			controller: function( $scope, $location ) {
				$scope.go = function(){
					$location.path('/register');
				}
			},
			animation: 'slide-back'
		})

		/*
		*|--------------------
		*| Registration view
		*|--------------------
		*/
		.when('/register', {
			templateUrl: 'app/views/register.html',
			controller: 'registerController',
			animation: 'slide'
		})

		/*
		*|--------------------
		*| Play the Game view
		*|--------------------
		*/
		.when('/play', {
			templateUrl: 'app/views/play.html',
			controller: 'playGameController',
			animation: 'slide'
		})

		/*
		*|----------------------
		*| Terms and conditions 
		*|----------------------
		*/
		.when('/terms', {
			templateUrl: 'app/views/terms.html',
			controller: 'basesPromoController',
			animation: 'slide-back'
		})

		/*
		*|----------------------
		*| Winners
		*|----------------------
		*/
		.when('/winners', {
			templateUrl: 'app/views/winners.html',
			controller: 'winnersController',
			animation: 'slide'
		})
	}


	app.run(['$rootScope', bettCrocketRunHandler ]);

	/**
	 * Runs some things on start
	 * @param  {obj} $rootScope the app rootScope
	 */
	function bettCrocketRunHandler( $rootScope ) {

		/**
		 * Listen to the event when the route start
		 * @param  {obj} event     Route event
		 * @param  {obj} currRoute Current route 
		 * @param  {obj} prevRoute ){			$rootScope.animation Prev route
		 * @return {obj}           Returns shit
		 */
		$rootScope.$on('$routeChangeStart', function( event, currRoute, prevRoute ){
			$rootScope.animation = currRoute.animation;
		});
	}
	
} ());