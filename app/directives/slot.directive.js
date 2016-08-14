/*
 *|=======================================|
 *| [slot.directive.js]
 *|
 *| Slot Directive DOM Controller
 *| 
 *| 
 *| @author Richard Blondet
 *|=======================================|
*/

;( function() {

	var app = angular.module('betty-crocket-app');

	app.directive('slotDirective', ['$rootScope', 'Slot', bettSlotDirectiveHandler ]);

	/**
	 * Directive handler function
	 * @param  {obj} $rootScope the app rootscope
	 * @return {obj}            Directive Object Declaration
	 */
	function bettSlotDirectiveHandler( $rootScope, Slot ){

		// Runs during compile
		return {
			link: function($scope, iElm, iAttrs, controller) {
				var slot_id 	= document.getElementById( iAttrs.id ),
					slot_max 	= +iAttrs.max,
					slot_step 	= +iAttrs.step;

				var slot = new Slot( slot_id,  slot_max, slot_step );
				
				$scope.$on('play', function(e) {
					/**
					 * Start the slot and listen when is at maximum speed
					 * @return {function}   Returns callback execution
					 */
					slot.start(function( s ) {
						$scope.$emit('slot ready', slot);
					});
				});
				$scope.$on('stop', function(e) {
					slot.stop( 'onStopped' , function() {
						$scope.$emit('slot stoped', slot);
					});
				});
				$scope.$on('trigger', function(e, slotPosition) {
					if( slot.step === 1 ) {
						slot.finalPos( slot, 'makeItTrigger', function() {
							return slotPosition;
						});
					}
				});
				$scope.$on('reset', function(e) {
					slot.reset( slot, function() {
						delete slot;
						slot = new Slot( slot_id, slot_max, slot_step );
					});
				});
				
			}
		};
	}
}());