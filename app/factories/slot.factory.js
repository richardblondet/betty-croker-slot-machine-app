/*
 *|=======================================|
 *| [slot.factory.js]
 *|
 *| Slot Game Factory Logic
 *| 
 *| 
 *| @author Richard Blondet
 *|=======================================|
*/
;( function () {
	
	var app = angular.module('betty-crocket-app');

	app.factory('Slot', ['$timeout', '$interval', bettSlotFactoryHandler ]);
	
	/**
	 * Factory logic for the slot
	 * @return {obj} Slot obj factory
	 */
	function bettSlotFactoryHandler( $timeout, $interval ) {
		/**
		 * Globals
		 */
		
		var completed = 0,
			
			imgHeight = 1231,
			
			posArr = [
	            0, // Cake 
	            149,// Cupcake
	            284, // Cookie 

	            419, // Cake 
	            554, // Cupcake 
	            690, // Cookie 

	            826, // Cake 
	            961, // Cupcake 
	            1098, // Cookie 
	    	];

	    	var win = [];
			    win[0] = win[419] = win[826] = 1;
			    win[149] = win[554] = win[961] = 2;
			    win[284] = win[690] = win[1098] = 3;


		/**
	     * @class Slot
	     * @constructor
	     */

	    function Slot(el, max, step) {
	        this.speed = 0; //speed of the slot at any point of time
	        this.step = step; //speed will increase at this rate
	        this.si = null; //holds setInterval object for the given slot
	        this.el = el; //dom element of the slot
	        this.maxSpeed = max; //max speed this slot can have
	        this.pos = null; //final position of the slot    

	        this.completed = false;

	        $(el).pan({
	            fps: 30,
	            dir: 'down'
	        });
	        $(el).spStop();
	    }

	    /**
	     * @method start
	     * Starts a slot
	     */
	    Slot.prototype.start = function( slotReadyCallback ) {
	        var _this = this;
	        $(_this.el).addClass('motion');
	        $(_this.el).spStart();
	        
	        _this.si = $interval(function() {
	        	/**
	        	 * Check if this slot is at maximum speed
	        	 * @param  {number} _this.speed <             _this.maxSpeed is it less? increment speed
	        	 * @return {null}             Returns Shit
	        	 */
	        	if( _this.speed < _this.maxSpeed ) {
	        		_this.speed += _this.step;
	        		$( _this.el ).spSpeed( _this.speed );
	        	}
	        	/**
	        	 * Check if slot speed is greater now
	        	 * @param  {number} _this.speed >             is slot speed equal or over maximun speed? execute callback
	        	 * @return {null}             Returns Shit
	        	 */
	        	if ( _this.speed >= _this.maxSpeed ) {
	        		slotReadyCallback( _this );
	        		$interval.cancel( _this.si );
	        	}
	        }, 100);
	    };

	    /**
	     * @method stop
	     * Stops a slot
	     */
	    Slot.prototype.stop = function(eventName, slotCompletedCallback) {
	        var _this = this,
	        	limit = 30;
	        
	        $interval.cancel( _this.si );
	        
	        _this.si = $interval(function() {
	        	
	        	if ( _this.speed > limit ) {
	                _this.speed -= _this.step;
	                $(_this.el).spSpeed(_this.speed);
	            }
	        	if ( _this.speed <= limit ) {
	                _this.finalPos( _this.el, eventName, slotCompletedCallback);
	                $( _this.el ).spSpeed(0);
	                $( _this.el ).spStop();
	                $interval.cancel( _this.si );
	                $( _this.el ).removeClass('motion');
	                _this.speed = 0;
		        }

	        }, 100);
	    };

	    /**
	     * @method finalPos
	     * Finds the final position of the slot
	     */
	    Slot.prototype.finalPos = function( slot, eventName, slotCompletedCallback ) {

	        var el = this.el,
		        el_id,
		        pos,
		        posMin = 2000000000,
		        best,
		        bgPos,
		        i,
		        j,
		        k;

	        el_id = $( el ).attr('id');
	        pos = document.getElementById(el_id).style.backgroundPosition;
	        pos = pos.split(' ')[1];
	        pos = parseInt(pos, 10);

	        if( eventName === 'makeItTrigger' ) {
	        	var slot = slot;
	        	var avoidPosition = slotCompletedCallback();

	        	posArr = posArr.filter(
	        		function(arEl){
	        			if( win[arEl] !== avoidPosition ) {
	        				return arEl;
	        			}
	        		}
	        	);
	        }
	        for (i = 0; i < posArr.length; i++) {
	            for (j = 0;; j++) {
	                k = posArr[i] + (imgHeight * j);
	                if (k > pos) {
	                    if ((k - pos) < posMin) {
	                        posMin = k - pos;
	                        best = k;
	                        this.pos = posArr[i]; //update the final position of the slot
	                    }
	                    break;
	                }
	            }
	        }

	        best += imgHeight + 4;
	        bgPos = "0 " + best + "px";
	        _this = this;
	        var ininin;
        
	        $(el).animate({
	            backgroundPosition: "(" + bgPos + ")"
	        }, {
	            duration: 200,
	            complete: function() {
	                _this.completed = true;
	                if( eventName === 'onStopped' ) {
	                	ininin = $interval(function(){
	                		$interval.cancel( ininin );
	                		slotCompletedCallback();
	                	});
	                }
	            }
	        });
	    };

	    /**
	     * @method reset
	     * Reset a slot to initial state
	     */
	    Slot.prototype.reset = function( slot, callback ) {
	    	
	    	this.el = slot.el;
	    	
	        var el_id = $( this.el ).attr('id');
	        $._spritely.instances[ el_id ].t = 0;
	        $._spritely.instances[ el_id ] = null;
	        $( this.el ).css('background-position', '0px 0px');
	        this.speed = 0;
	        $interval.cancel( this.si );
	        this.si = null; //holds setInterval object for the given slot
	        this.pos = null; //final position of the slot    
	        // completed = 0;
	        this.completed = false;
	        
	        delete this;
	        callback();
	    };

	    return Slot;
	}
}());