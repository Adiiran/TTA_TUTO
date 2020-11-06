var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    
    // Update DOM on a Received Event
    receivedEvent: function(id) {	
    	headerHeight=$("div[data-role=header]").height();
    	footerHeight=$("div[data-role=footer]").height();  
    	$(window).bind('resize',fitVisualElems);
    	
    	checkPermissionsAsync();
    	
    }
};

app.initialize();

//function pageEvents(){
//	$(document).on("pagebeforeshow", "#tareasPage", tareasPageT.loadTareas()); // When entering tareasPage
//	$(document).on("pagebeforeshow", "#actividadesPage", actividadesPageT.loadActividades()); // When entering actividadesPage
//	$(document).on("pagebeforeshow", "#ociosPage", ociosPageT.loadOcios()); // When entering ociosPage
//	
//	$(document).on("pagebeforeshow", "#multimediaPage", contentPageT.loadInitialMultimediaPageContent()); // When entering multimediaPage
//	
//	$(document).on("pagebeforeshow", "#textContentPage", contentPageT.loadTextContent()); // When entering textContentPage
//	//$(document).on("pagebeforeshow", "#videoContentPage", contentPageT.loadTextContent()); // When entering videoContentPage
//}

function checkPermissionsAsync(){
	var permissions = cordova.plugins.permissions;
	permissions.requestPermissions(
		[permissions.WRITE_EXTERNAL_STORAGE, permissions.READ_EXTERNAL_STORAGE],	
		function(status) {
			if(!status.hasPermission)
			{
				alert("Some features may not work the first time");
			}
			appSession.loadStoredDataAsync();
		},
		function() {
			alert("Some features may not work the first time if STORAGE permissions are not granted");
			
			appSession.loadStoredDataAsync();
		}
	);
}

function fitVisualElems() {
	var screenWidth=$(window).width()-16*2;
	var screenHeight=$(window).height()-headerHeight-footerHeight-16*2;

	$("img").each(
		function () {
			$(this).css({"max-width":screenWidth, "max-height":screenHeight});
		}
	);
	
	$("audio").each(
		function () {
			$(this).css({"max-width":screenWidth, "max-height":screenHeight});
		}			
	);	
	
	$("video").each(
		function () {
			$(this).css({"max-width":screenWidth, "max-height":screenHeight});
		}			
	);	
}