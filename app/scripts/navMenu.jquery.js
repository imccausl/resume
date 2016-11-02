(function( $ ) {
	
	/* interface:
     * data-breakpoint = "point in px at which chevron turns right"
     * data-
     * data-
     **************************************************************/
     
	// change the chevron-circle (font-awesome) to 'fa-chevron-circle-right' if the viewport is larger than XX,
	// otherwise, use "fa-chevron-circle-down'.
	
	$.fn.jumpMenu = function( action, options ) {
		
		if (options.firstTime) {
			// run setup
		} else {
			// toggle show and hide
			
		}
		
		return this;
	};
	
	$.fn.jumpMenu.defaults = {
		
	};
	
}( jQuery );