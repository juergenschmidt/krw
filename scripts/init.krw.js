//
// Start KRIWAN 
// Init etc.
//

;$(document).foundation(); 

;(function (global, undefined) {
 // =================================================================
    var pageFragmentLoader = new PageFragmentLoader('#container_page');
        pageFragmentLoader.render().startUp();
 //           pageFragmentLoader.command(offCanvasMenu);
})(this, (void 0));