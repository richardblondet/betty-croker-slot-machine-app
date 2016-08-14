/*
 *|=======================================|
 *| [play.controller.js]
 *|
 *| Play the game controller file
 *| 
 *| 
 *| @author Richard Blondet
 *|=======================================|
*/

;( function() {
	var app = angular.module('betty-crocket-app');

	app.controller('playGameController', 
		['$scope', '$timeout', '$rootScope', 'Sound', '$location', bettPlayControllerHandler ]);

	/**
	 * Handles the logic for the game view
	 * when playing
	 * 	
	 * @param  {obj} $scope angular scope
	 * @return {[type]}        Returns shit
	 */
	function bettPlayControllerHandler( $scope, $timeout, $rootScope, Sound, $location ) {
		
		/**
		 * Changing the odds
		 * @type {Boolean}
		 */
		var itShouldTrigger = false; // true odds change

		/**
		 * All positions
		 * @type {Array}
		 */
		$scope.win = [];
		    $scope.win[0] = $scope.win[419] = $scope.win[826] = 1;
		    $scope.win[149] = $scope.win[554] = $scope.win[961] = 2;
		    $scope.win[284] = $scope.win[690] = $scope.win[1098] = 3;

		    // console.log($scope.win);

		/**
		 * The machine obj definition
		 * @type {Object}
		 */
		$scope.machine = {
			power: 0, // 1 = on, 0 = off
			slots: [],
			result: [],
			button: 1 // button state
		};

		/** @type {obj} All the slots */
		$scope.slot1 = null;
		$scope.slot2 = null;
		$scope.slot3 = null;

		/** @type {String} press the spoon states */
		$scope.pressTheSpoon = '';

		/** @type {String} the text result for machine state */
		$scope.textResult = 'play';

		/**
		 * Play the game function. Starts the game and everything
		 * @return {[type]} [description]
		 */
		$scope.play = function() {

			/** Play the sound of click */
			Sound.play('click', function() {
				return true;
			});
			/**
			 * If the slot machine is off, start and play
			 * @param  {bool} ! $scope.machine.power Tell whether the machine is on
			 * @return {null}   Change the machine state
			 */
			if(! $scope.machine.power ) {
				
				/**
				 * Start the machine
				 */
				$scope.$broadcast('play');
				$scope.machine.power = 1;
				$scope.machine.button = 0;
				Sound.play('loop', function() {
					return 1;
				}, false);
			} else {

				/**
				 * Stops the machine
				 */
				$scope.$broadcast('stop');
			}
		}
		// $timeout(function(){
		// 	$scope.play();
		// }, 1000);
		/**
		 * Listen to the machine slots reach their max speed
		 * @param  {obj} e the slot event
		 * @param  {slot} s )             {			$scope.machine.slots.push(s);						if( $scope.machine.slots.length get the slot
		 * @return {obj}   Returns shit
		 */
		$scope.$on('slot ready', function( e, s ) {
			$scope.machine.slots.push(s);

			/**
			 * Check if all slots are up and running
			 * @param  {Number} $scope.machine.slots.length the amount of slots
			 * @return {null}                             Returns Shit
			 */
			if( $scope.machine.slots.length === 3) {
				$scope.machine.button = 1;
				$scope.pressTheSpoon = 'dale';
			}
		});
		/**
		 * Listen when the slots stops
		 * @param  {obj} e the slot event
		 * @param  {obj} s )             {			$scope.machine.result.push(s);			if($scope.machine.result.length the slot stopping
		 * @return {obj}   Returns shit
		 */
		$scope.$on('slot stoped', function( e, s ) {
			$scope.machine.result.push(s);
			/** Get the first slot */
			if($scope.machine.result.length === 1) {
				$scope.slot1 = $scope.machine.result[0];
			}
			/** Get the second slot */
			if($scope.machine.result.length === 2) {
				$scope.slot2 = $scope.machine.result[1];
				
				if( itShouldTrigger ) {
					if( $scope.win[ $scope.slot1.pos ] === $scope.win[ $scope.slot2.pos ] ) {
						$scope.$broadcast('trigger', $scope.win[ $scope.slot1.pos ]);
					}
					
				}
			}
			/** Get the third slot */
			if( $scope.machine.result.length === 3 ) {
				// $scope.slot3 = $scope.machine.result[2];
				$scope.updateSlot('slot3', $scope.machine.result[2]);
				$scope.updateText($scope.slot3);
				$scope.machine.button = 0;
			}
		});
		$scope.updateIndicator = function( slot, condition ) {
			if( slot ) {
				return condition;
			}
		};
		$scope.updateSlot = function(slot, value) {
			if('slot3') {
				$scope.slot3 = value;
			}
		};
		
		/**
		 * Update text state
		 * @param  {obj} slot the machine slot
		 * @return {obj}      Returns shit
		 */
		$scope.updateText = function(slot) {
			
			Sound.play('loop', function() {
				return 0;
			}, false);

			if( slot ) {
				if($scope.win[$scope.slot1.pos] === $scope.win[$scope.slot2.pos] && $scope.win[$scope.slot1.pos] === $scope.win[$scope.slot3.pos]) {
					$scope.textResult = 'ganaste';
					// $rootScope.$broadcast('confetti:start');
					Sound.play('win', function() {
						/**/
					});
				} 
				else {
					$scope.textResult = 'perdiste';
					Sound.play('lose', function() {
						/**/
					});
				}
			}
		};

		/**
		 * Resets the slots and travel back to register view
		 * @return {obj} Returns shit
		 */
		$scope.reset = function() {
			$scope.$broadcast('reset');
			if ( $scope.textResult === 'ganaste' ) {
				$rootScope.$broadcast('confetti:stop');
			}
			
			$scope.machine.power = 0; // 1 = on, 0 = off
			$scope.machine.slots = [];
			$scope.machine.result= [],
			$scope.machine.button= 1 // button state
			
			
			$scope.slot1 = null;
			$scope.slot2 = null;
			$scope.slot3 = null;

			$scope.pressTheSpoon = '';
			$scope.textResult = 'play';
			// $location.path('/register');
		}
 	}
}())