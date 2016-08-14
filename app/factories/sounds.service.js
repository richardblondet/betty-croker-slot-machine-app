/*
 *|=======================================|
 *| [sounds.service.js]
 *|
 *| Sound service logic
 *| 
 *| 
 *| @author Richard Blondet
 *|=======================================|
*/
; ( function() {

	var app = angular.module('betty-crocket-app');

	app.service('Sound', [ bettPlaySoundServiceHandler ]);
		
	/**
	 * Handler for play sound service 
	 * @return {obj}      Returns the service obj
	 */
	function bettPlaySoundServiceHandler() {

		var Sound = {};

		Sound.check = 0;

		Sound.play = function( audio, ended, loop ) {
			var s = new Audio( "../../assets/audio/"+ audio +".mp3" );

			switch( audio ) {

				case 'click': 
					s.play();
					s.addEventListener('ended', function(e) {
						this.currentTime = 0;
						if( typeof ended != "undefined" ) {
							ended();
						}
					});
					break;
				
				case 'win':
					var times = 3, count = 0;
					
					s.play();
					s.addEventListener('ended', function(e) {
						this.currentTime = 0;
						if( count < times ) {
							s.play();
							count++;
						}
						if( count >= times ) {
							if( typeof ended != "undefined" ) {
								ended();
							}
						}
					});
					break;

				case 'lose': 
					s.play();
					s.addEventListener('ended', function(e) {
						this.currentTime = 0;
						if( typeof ended != "undefined" ) {
							ended();
						}
					});
					break;

				case 'loop':
					if( typeof ended == "undefined" ) {
						throw new Error("Error, no callback condition provided");
					}
					Sound.check = ended();
					s.play(); 
					s.addEventListener('ended', function(e) {
						if( Sound.check ) {
							this.currentTime = 0;
							this.play();
						}
					});
					break;

				default:
					break;
			}
		}

		return Sound;

	}
	
} ());