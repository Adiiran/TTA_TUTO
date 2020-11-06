//var app = {
//    // Application Constructor
//    initialize: function() {
//        this.bindEvents();
//    },
//    // Bind Event Listeners
//    //
//    // Bind any events that are required on startup. Common events are:
//    // 'load', 'deviceready', 'offline', and 'online'.
//    bindEvents: function() {
//        document.addEventListener('deviceready', this.onDeviceReady, false);
//    },
//    // deviceready Event Handler
//    //
//    // The scope of 'this' is the event. In order to call the 'receivedEvent'
//    // function, we must explicitly call 'app.receivedEvent(...);'
//    onDeviceReady: function() {
//        app.receivedEvent('deviceready');
//    },
//    // Update DOM on a Received Event
//    receivedEvent: function(id) {//V5		
//    	headerHeight=$("div[data-role=header]").height();
//    	footerHeight=$("div[data-role=footer]").height();  
//    	$(window).bind('resize',fitVisualElems);
//    }
//};
//
//app.initialize();
//
//function fitVisualElems() {//V5
//	var screenWidth=$(window).width()-16*2;
//	var screenHeight=$(window).height()-headerHeight-footerHeight-16*2;
//
//	$("img").each(
//		function () {
//			$(this).css({"max-width":screenWidth, "max-height":screenHeight});
//		}
//	);
//	
//	$("audio").each(
//			function () {
//				$(this).css({"max-width":screenWidth, "max-height":screenHeight});
//			}			
//		);	
//	
//	$("video").each(
//		function () {
//			$(this).css({"max-width":screenWidth, "max-height":screenHeight});
//		}			
//	);	
//}
