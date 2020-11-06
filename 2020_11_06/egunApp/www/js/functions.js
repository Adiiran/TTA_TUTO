/********************************************************************************/
// Funciones de login/registro
/********************************************************************************/
function login() {
	var alias=$("#alias").val();
	var password=$("#password").val();
	
	//Se validan las credenciales (de momento con tener alias vale)
	if(alias!=null&&alias!="" && password!=null&&password!="") {		
		
		//RequestLogin() + Nueva sesion para usuario valido introducido
		
		//appSession.initNewSession(alias,password);
		appSession.initNewSessionAsync(alias,password);
			
		//alert("SUCESS");
	}
	else
		alert("WRONG CREDENTIALS");		
}

function signin() {
	var alias=$("#alias").val();
	var password=$("#password").val();
	
	//Se validan las credenciales (de momento con tener alias vale)
	if(alias!=null&&alias!="" && password!=null&&password!="") {		
		var proceed=true;	
		if(navigator.connection.type!=Connection.WIFI)
			proceed=confirm("Need to connect to remote URL. Proceed whitout WIFI connection?");	
		if(proceed==true)	
		{
			//AddStudent()
			REST_addStudent(alias, password);
			
			//alert("SUCESS");
		}
	}
	else
		alert("WRONG CREDENTIALS");		
}

/********************************************************************************/
// Funciones de camara e imagenes
/********************************************************************************/
function takePhoto(entidad, numEntidad) {
	var fileFolder=appConstants.localPermanentStorageFolderImg();
	var fileName = null;
	var dt = new Date();
	var formatedDate = dt.getFullYear()+"_"+(dt.getMonth()+1)+"_"+dt.getDate(); // AAAA_MM_DD
	if(entidad == 0)
	{
		fileName="Dia_"+(datosDiaTrabajo.diaSeleccionado+1)+"_Tarea_"+numEntidad+"_"+formatedDate+"_"+credentials.alias+".jpg";	
	}
	else if(entidad == 1)
	{
		fileName="Dia_"+(datosDiaTrabajo.diaSeleccionado+1)+"_Actividad_"+numEntidad+"_"+formatedDate+"_"+credentials.alias+".jpg";
	}
	else if(entidad == 2)
	{
		fileName="Dia_"+(datosDiaTrabajo.diaSeleccionado+1)+"_Ocio_"+numEntidad+"_"+formatedDate+"_"+credentials.alias+".jpg";		
	}
	else
	{
		alert("Error taking photo. Bad entity request"+entidad);
	}

	photo.takeAsync(
		fileFolder,
		fileName,
		function() {
			if(entidad == 0)
			{
				semana.dia[datosDiaTrabajo.diaSeleccionado].tareas[numEntidad].localfile = photo.fileFolder+photo.fileName;
				//semana.dia[datosDiaTrabajo.diaSeleccionado].tareas[numEntidad].completed = true;
				semana.dia[datosDiaTrabajo.diaSeleccionado].tareas[numEntidad].uploaded = false;
				$("#button-uploadTarea"+(numEntidad+1)).attr("class","ui-btn ui-btn-inline ui-icon-check ui-btn-icon-notext");
				//alert("Photo in: "+semana.dia[datosDiaTrabajo.diaSeleccionado].tareas[numEntidad].file.replace("/static",""));
			}
			else if(entidad == 1)
			{
				semana.dia[datosDiaTrabajo.diaSeleccionado].actividades[numEntidad].localfile = photo.fileFolder+photo.fileName;
				//semana.dia[datosDiaTrabajo.diaSeleccionado].actividades[numEntidad].completed = true;
				semana.dia[datosDiaTrabajo.diaSeleccionado].actividades[numEntidad].uploaded = false;
				$("#button-uploadActividad"+(numEntidad+1)).attr("class","ui-btn ui-btn-inline ui-icon-check ui-btn-icon-notext");
				$("#fotoActividad1Div").show();
				$("#fotoActividad1Loaded").attr("src",semana.dia[datosDiaTrabajo.diaSeleccionado].actividades[numEntidad].localfile);
				$("#fotoActividad1Loaded").trigger("load");
				$("#fotoActividad1Loaded").show();
				//alert("Photo in: "+semana.dia[datosDiaTrabajo.diaSeleccionado].actividades[numEntidad].file.replace("/static","")+"--------"+"#button-uploadActividad"+(numEntidad+1));
			}
			else if(entidad == 2)
			{
				semana.dia[datosDiaTrabajo.diaSeleccionado].ocios[numEntidad].localfile = photo.fileFolder+photo.fileName;
				//semana.dia[datosDiaTrabajo.diaSeleccionado].ocios[numEntidad].completed = true;	
				semana.dia[datosDiaTrabajo.diaSeleccionado].ocios[numEntidad].uploaded = false;
				$("#button-uploadOcio"+(numEntidad+1)).attr("class","ui-btn ui-btn-inline ui-icon-check ui-btn-icon-notext");
				$("#fotoOcio1Div").show();
				$("#fotoOcio1Loaded").attr("src",semana.dia[datosDiaTrabajo.diaSeleccionado].ocios[numEntidad].localfile);
				$("#fotoOcio1Loaded").trigger("load");
				$("#fotoOcio1Loaded").show();
				//alert("Photo in: "+semana.dia[datosDiaTrabajo.diaSeleccionado].ocios[numEntidad].file.replace("/static",""));	
			}
						
			//sendImage(entidad,numEntidad);
				
					
		}
	);
}

function sendImage(entidad, numEntidad) {
	var uploadFile=true;	
	//alert("Checking for wifi: "+entidad+"----"+numEntidad);
	if(navigator.connection.type!=Connection.WIFI)
	{
		uploadFile=confirm("Need to connect to remote URL. Proceed without WIFI connection?");	
	}
	if(uploadFile==true)
	{
		var fileToUpload=null;
		var url=null;
		//alert("Looking for fileToUpload: "+entidad+"----"+numEntidad);
		if(entidad == 0)
		{
			fileToUpload=semana.dia[datosDiaTrabajo.diaSeleccionado].tareas[numEntidad].localfile;
			url="file://"+semana.dia[datosDiaTrabajo.diaSeleccionado].tareas[numEntidad].localfile;
		}
		else if(entidad == 1)
		{
			fileToUpload=semana.dia[datosDiaTrabajo.diaSeleccionado].actividades[numEntidad].localfile;
			url="file://"+semana.dia[datosDiaTrabajo.diaSeleccionado].actividades[numEntidad].localfile;
		}
		else if(entidad == 2)
		{
			fileToUpload=semana.dia[datosDiaTrabajo.diaSeleccionado].ocios[numEntidad].localfile;
			url="file://"+semana.dia[datosDiaTrabajo.diaSeleccionado].ocios[numEntidad].localfile;
		}	
		else
		{
			alert("Error sending photo. Bad entity request"+entidad);
		}
		
		//alert("fileToUpload = "+fileToUpload);
		
		fileUtilities.uploadFileAsync(fileToUpload ,"img",appConstants.uploadFileURL(),
			//onSucess()
			function() {
				var imageFile=null;
				
				if(entidad == 0)
				{
					imageFile=semana.dia[datosDiaTrabajo.diaSeleccionado].tareas[numEntidad].localfile;
					imageFile=imageFile.replace(appConstants.localPermanentStorageFolder, "");
					semana.dia[datosDiaTrabajo.diaSeleccionado].tareas[numEntidad].remotefile = encodeURI(appConstants.serverURLstatic+imageFile);	
					semana.dia[datosDiaTrabajo.diaSeleccionado].tareas[numEntidad].uploaded = true;
					semana.dia[datosDiaTrabajo.diaSeleccionado].tareas[numEntidad].completed = true;
				}
				else if(entidad == 1)
				{
					imageFile=semana.dia[datosDiaTrabajo.diaSeleccionado].actividades[numEntidad].localfile;
					imageFile=imageFile.replace(appConstants.localPermanentStorageFolder, "");
					semana.dia[datosDiaTrabajo.diaSeleccionado].actividades[numEntidad].remotefile = encodeURI(appConstants.serverURLstatic+imageFile);	
					semana.dia[datosDiaTrabajo.diaSeleccionado].actividades[numEntidad].uploaded = true;
					semana.dia[datosDiaTrabajo.diaSeleccionado].actividades[numEntidad].completed = true;
				}
				else if(entidad == 2)
				{
					imageFile=semana.dia[datosDiaTrabajo.diaSeleccionado].ocios[numEntidad].localfile;
					imageFile=imageFile.replace(appConstants.localPermanentStorageFolder, "");
					semana.dia[datosDiaTrabajo.diaSeleccionado].ocios[numEntidad].remotefile = encodeURI(appConstants.serverURLstatic+imageFile);	
					semana.dia[datosDiaTrabajo.diaSeleccionado].ocios[numEntidad].uploaded = true;
					semana.dia[datosDiaTrabajo.diaSeleccionado].ocios[numEntidad].completed = true;
				}			
				
				saveStateUser(credentials.alias);
			},
			//onFailure()
			function() {		
				if(entidad == 0)
				{
					//semana.dia[datosDiaTrabajo.diaSeleccionado].tareas[numEntidad].localfile = null;
					semana.dia[datosDiaTrabajo.diaSeleccionado].tareas[numEntidad].remotefile = null;
					semana.dia[datosDiaTrabajo.diaSeleccionado].tareas[numEntidad].completed = false;
					semana.dia[datosDiaTrabajo.diaSeleccionado].tareas[numEntidad].uploaded = false;
				}
				else if(entidad == 1)
				{
					//semana.dia[datosDiaTrabajo.diaSeleccionado].actividades[numEntidad].localfile = null;
					semana.dia[datosDiaTrabajo.diaSeleccionado].actividades[numEntidad].remotefile = null;
					semana.dia[datosDiaTrabajo.diaSeleccionado].actividades[numEntidad].completed = false;
					semana.dia[datosDiaTrabajo.diaSeleccionado].actividades[numEntidad].uploaded = false;
				}
				else if(entidad == 2)
				{
					//semana.dia[datosDiaTrabajo.diaSeleccionado].ocios[numEntidad].localfile = null;
					semana.dia[datosDiaTrabajo.diaSeleccionado].ocios[numEntidad].remotefile = null;
					semana.dia[datosDiaTrabajo.diaSeleccionado].ocios[numEntidad].completed = false;
					semana.dia[datosDiaTrabajo.diaSeleccionado].ocios[numEntidad].uploaded = false;
				}
				
				//alert("Delete file not uploaded: "+ url );
				
				alert("Error al subir imagen. Vuelve a hacer la foto o guarda los cambios, para reintentar.");	
				//Commented to see localfile on page
//				window.resolveLocalFileSystemURL(url,
//	    			function(fileEntry) {
//						//alert("Deleting file not uploaded: "+ url);
//	    				fileEntry.remove(
//	    					function (localfile) {
//	    						//alert("file removed!");
//	    					}, function (error) {
//	    						alert("error occurred: " + error.code);
//	    					}, function () {
//	    						alert("file does not exist");
//	    	            });
//	    			},
//	    			function() {
//	    				alert("Source file NOT resolved" + url);
//	    			}
//	    		);			
				
				
				saveStateUser(credentials.alias);
			}
			
		);
		
		//saveStateUser(credentials.alias);
	}
}


/********************************************************************************/
// Funciones de carga/guardado de estado
/********************************************************************************/
function guardarProgreso(entidad){
	//alert("guardarProgeso("+entidad+")1");
	if(entidad == 0)
	{
		semana.dia[datosDiaTrabajo.diaSeleccionado].tareas[0].completed = $("#tarea1check").is(':checked');
		semana.dia[datosDiaTrabajo.diaSeleccionado].tareas[1].completed = $("#tarea2check").is(':checked');
		semana.dia[datosDiaTrabajo.diaSeleccionado].tareas[2].completed = $("#tarea3check").is(':checked');
		semana.dia[datosDiaTrabajo.diaSeleccionado].tareas[3].completed = $("#tarea4check").is(':checked');
	}
	else if(entidad == 1)
	{
		semana.dia[datosDiaTrabajo.diaSeleccionado].actividades[0].completed = false;
		//Se comprueba que esta el tick y que se ha respondido
		if($("#actividad1check").is(':checked') == true)
		{
			if(semana.respuesta[datosDiaTrabajo.diaSeleccionado].actividad1 != null)
			{
				semana.dia[datosDiaTrabajo.diaSeleccionado].actividades[0].completed = true;
			}
		}
		
		
		if(semana.dia[datosDiaTrabajo.diaSeleccionado].actividades[1].localfile != null)
		{
			var url="file://"+semana.dia[datosDiaTrabajo.diaSeleccionado].actividades[1].localfile;
			//alert("url = "+url);
			window.resolveLocalFileSystemURL(url,
				function() {
					//alert("Finded file = "+url);
					sendImage(entidad,1);
				},
				function() {
					alert("Source file NOT found. Cannot upload actividad 2");
				}
			);
		}
		
		//semana.dia[datosDiaTrabajo.diaSeleccionado].actividades[1].completed = $("#actividad2check").val();
	}
	else if(entidad == 2)
	{
		semana.dia[datosDiaTrabajo.diaSeleccionado].ocios[0].completed = $("#ocio1check").is(':checked');
		
		if(semana.dia[datosDiaTrabajo.diaSeleccionado].ocios[1].localfile != null)
		{
			var url="file://"+semana.dia[datosDiaTrabajo.diaSeleccionado].ocios[1].localfile;
			window.resolveLocalFileSystemURL(url,
				function() {
					sendImage(entidad,1);
				},
				function() {
					alert("Source file NOT found. Cannot upload ocio 2");
				}
			);
		}
		
		//semana.dia[datosDiaTrabajo.diaSeleccionado].ocios[1].completed = $("#ocio2check").val();
	}	
	else
	{
		alert("Error saving progress. Bad entity request"+entidad);
		window.location.href="#dayPage";
	}
	
	saveStateUser(credentials.alias, 
			function(){
				if(entidad == 0)
				{
					//window.location.href="#tareasPage";
					tareasPageT.loadTareas();
				}
				else if(entidad == 1)
				{
					//window.location.href="#actividadesPage";
					actividadesPageT.loadActividades();
				}
				else if(entidad == 2)
				{
					//window.location.href="#ociosPage";	
					ociosPageT.loadOcios();
				}
				else
				{
					window.location.href="#dayPage";
				}
			}
			);
	
	//alert("guardarProgeso("+entidad+")2");	
}

function cargarProgreso(entidad){
	//alert("cargarProgeso("+entidad+")1");
	if(entidad == 0)
	{
		$("#tarea1check").prop("checked",semana.dia[datosDiaTrabajo.diaSeleccionado].tareas[0].completed);
		$("#tarea2check").prop("checked",semana.dia[datosDiaTrabajo.diaSeleccionado].tareas[1].completed);
		$("#tarea3check").prop("checked",semana.dia[datosDiaTrabajo.diaSeleccionado].tareas[2].completed);
		$("#tarea4check").prop("checked",semana.dia[datosDiaTrabajo.diaSeleccionado].tareas[3].completed);
	}
	else if(entidad == 1)
	{
		$("#actividad1check").prop("checked",semana.dia[datosDiaTrabajo.diaSeleccionado].actividades[0].completed);
		//$("#actividad2check").checked(semana.dia[datosDiaTrabajo.diaSeleccionado].actividades[1].completed);
		if(semana.dia[datosDiaTrabajo.diaSeleccionado].actividades[1].completed == true)
		{
			$("#button-uploadActividad2").attr("class","ui-btn ui-btn-inline ui-icon-check ui-btn-icon-notext");
			$("#fotoActividad1Div").show();
			if(semana.dia[datosDiaTrabajo.diaSeleccionado].actividades[1].uploaded == true)
			{
				$("#fotoActividad1Loaded").attr("src",semana.dia[datosDiaTrabajo.diaSeleccionado].actividades[1].remotefile);
				$("#fotoActividad1Loaded").css('border', '3px solid green');
			}
			else
			{
				$("#fotoActividad1Loaded").attr("src",semana.dia[datosDiaTrabajo.diaSeleccionado].actividades[1].localfile);
				$("#fotoActividad1Loaded").css('border', '3px solid red');
			}		
			$("#fotoActividad1Loaded").trigger("load");
			$("#fotoActividad1Loaded").show();
		}
		else
		{
			$("#button-uploadActividad2").attr("class","ui-btn ui-btn-inline ui-icon-camera ui-btn-icon-notext");
	     	$("#fotoActividad1Div").hide();

		}
	}
	else if(entidad == 2)
	{
		$("#ocio1check").prop("checked",semana.dia[datosDiaTrabajo.diaSeleccionado].ocios[0].completed);
		//$("#ocio2check").checked(semana.dia[datosDiaTrabajo.diaSeleccionado].ocios[1].completed);
		if(semana.dia[datosDiaTrabajo.diaSeleccionado].ocios[1].completed == true)
		{
			$("#button-uploadOcio2").attr("class","ui-btn ui-btn-inline ui-icon-check ui-btn-icon-notext");
			$("#fotoOcio1Div").show();
			if(semana.dia[datosDiaTrabajo.diaSeleccionado].ocios[1].uploaded == true)
			{
				$("#fotoOcio1Loaded").attr("src",semana.dia[datosDiaTrabajo.diaSeleccionado].ocios[1].remotefile);
				$("#fotoOcio1Loaded").css('border', '3px solid green'); 
			}
			else
			{
				$("#fotoOcio1Loaded").attr("src",semana.dia[datosDiaTrabajo.diaSeleccionado].ocios[1].localfile);
				$("#fotoOcio1Loaded").css('border', '3px solid red'); 
			}
			$("#fotoOcio1Loaded").trigger("load");
			$("#fotoOcio1Loaded").show();
		}
		else
		{
			$("#button-uploadOcio2").attr("class","ui-btn ui-btn-inline ui-icon-camera ui-btn-icon-notext");
			$("#fotoOcio1Div").hide();
		}
	}	
	else
	{
		alert("Error saving progress. Bad entity request"+entidad);
	}
	
	//alert("cargarProgeso("+entidad+")2");
}

function saveStateApp() {
	//alert("saveStateApp1");
	var persistentData= {
			credentials : credentials,
			initDateTime : appSession.initDateTime.toISOString(),
			locale : appSession.locale
	};
	
	fileUtilities.writeContentToFileAsync(appConstants.privateStorageFolderURL(),appConstants.persistentDataFileName+"."+appConstants.persistentDataFileExtension,persistentData,
		function() {
			alert("Se han guardado datos de aplicación");
		}
	);
	//alert("saveStateApp2");
}

function loadStateApp() {
	//alert("loadStateApp1");
	fileUtilities.readTextFromFileAsync(appConstants.privateStorageFolderURL(),appConstants.persistentDataFileName+"."+appConstants.persistentDataFileExtension, //APP_DATA_alias.TXT
		function() {
			var content=fileUtilities.contentRead;
			savedPersistentData=JSON.parse(content);
	    	if(savedPersistentData!=undefined) {    		
	    		credentials = savedPersistentData.credentials;
	    		appSession.initDateTime=new Date(savedPersistentData.initDateTime);
	    		appSession.locale = savedPersistentData.locale;
	    	}
		},
		function() {
			alert("No hay datos de aplicación almacenados");
		}
	);		
	//alert("loadStateApp2");
}


function saveStateUser(alias) {
	//alert("saveStateUser1");
	var persistentData= {
			credentials : credentials,
			semana: semana //probar impacto de escritura de todo (en lectura solo leemos campos de interes)
	};
	
	fileUtilities.writeContentToFileAsync(appConstants.privateStorageFolderURL(),appConstants.persistentDataFileName+"_"+alias+"."+appConstants.persistentDataFileExtension,persistentData,
		function() {
			alert("Se ha guardado el progreso de usuario");
		}
	);
	//alert("saveStateUser2");
}

function loadStateUser(alias) {
	//alert("loadStateUser1");
	fileUtilities.readTextFromFileAsync(appConstants.privateStorageFolderURL(),appConstants.persistentDataFileName+"_"+alias+"."+appConstants.persistentDataFileExtension, //APP_DATA_alias.TXT
		function() {
			var content=fileUtilities.contentRead;
			savedPersistentData=JSON.parse(content);
	    	if(savedPersistentData!=undefined) {
	    		for (var idx_dia = 0; idx_dia < 5; idx_dia++) {
	    			//Para cada dia de la semana
		    		for (var i = 0; i < 4; i++) {
		    			//Para cada tarea
		    			semana.dia[idx_dia].tareas[i].localfile = savedPersistentData.semana.dia[idx_dia].tareas[i].localfile;
		    			semana.dia[idx_dia].tareas[i].remotefile = savedPersistentData.semana.dia[idx_dia].tareas[i].remotefile;
		    			semana.dia[idx_dia].tareas[i].completed = savedPersistentData.semana.dia[idx_dia].tareas[i].completed;
		    			semana.dia[idx_dia].tareas[i].uploaded = savedPersistentData.semana.dia[idx_dia].tareas[i].uploaded;
	    			}
		    		for (var i = 0; i < 2; i++) {
		    			//Para cada actividad
		    			semana.dia[idx_dia].actividades[i].localfile = savedPersistentData.semana.dia[idx_dia].actividades[i].localfile;
		    			semana.dia[idx_dia].actividades[i].remotefile = savedPersistentData.semana.dia[idx_dia].actividades[i].remotefile;
		    			semana.dia[idx_dia].actividades[i].completed = savedPersistentData.semana.dia[idx_dia].actividades[i].completed;
		    			semana.dia[idx_dia].actividades[i].uploaded = savedPersistentData.semana.dia[idx_dia].actividades[i].uploaded;
	    			}
		    		for (var i = 0; i < 2; i++) {
		    			//Para cada ocio
		    			semana.dia[idx_dia].ocios[i].localfile = savedPersistentData.semana.dia[idx_dia].ocios[i].localfile;
		    			semana.dia[idx_dia].ocios[i].remotefile = savedPersistentData.semana.dia[idx_dia].ocios[i].remotefile;
		    			semana.dia[idx_dia].ocios[i].completed = savedPersistentData.semana.dia[idx_dia].ocios[i].completed;
		    			semana.dia[idx_dia].ocios[i].uploaded = savedPersistentData.semana.dia[idx_dia].ocios[i].uploaded;
	    			}
		    		
		    		//Respuestas de actividades
		    		semana.respuesta[idx_dia].actividad1 = savedPersistentData.semana.respuesta[idx_dia].actividad1;
	    		}
	    		
	    		credentials=savedPersistentData.credentials;
	    		
	    	}
		},
		function() {
			alert("No hay datos de progreso de usuario guardados");
		}
	);		
	//alert("loadStateUser2");
}


function loadTextResponse() {
	var respuesta = semana.respuesta[datosDiaTrabajo.diaSeleccionado].actividad1;
	
	if(respuesta!=null&&respuesta!="")  {		
		$("#textRespuesta").val(respuesta);
		//alert("Respuesta cargada");
	}
	else
	{
		$("#textRespuesta").val("");
		//alert("Respuesta vacía");		
	}
}

function saveTextResponse() {
	var respuesta=$("#textRespuesta").val();
	semana.respuesta[datosDiaTrabajo.diaSeleccionado].actividad1 = null;
	
	if(respuesta!=null&&respuesta!="")  {		
		semana.respuesta[datosDiaTrabajo.diaSeleccionado].actividad1 = respuesta;
		alert("Respuesta guardada");
	}
	else
	{
		alert("Respuesta vacía");		
	}
}

/********************************************************************************/
// ZOPA functions: sopa de letras
/********************************************************************************/
function newZopa() {
	var numZopa = datosDiaTrabajo.diaSeleccionado;
	currentZopa = availableZopa.zopas[numZopa];
	zopaUtils.createZopa(currentZopa);	
	$("#zopaTable").empty();	
	zopaUtils.printZopa(currentZopa);
		
	$("#resultsTable").empty();	
	selectedLetters.init();	
	foundWords = [];
		
	$("#button-newZopa").addClass("ui-disabled");	
	currentZopa.startTime=new Date();
	currentZopa.lastFoundTime=currentZopa.startTime;
		
	$("#table-1").hide();		
}

function newSelection(buttonId) {
	selectedLetters.code+=buttonId+",";
	var pressed={"buttonId":buttonId, "prevColor":$("#"+buttonId).css("color")};
	selectedLetters.buttons.push(pressed);
	$("#"+buttonId).css({"background-color":"green","color":"white", "font-weight":"bold"});//Set style for selected letters
}

function check() {	
	var wordCode=null;
	wordCode=	currentZopa.wCodes.findIndex(
						function(wCodesElement) {
							return selectedLetters.code==wCodesElement;
						}
				);
	
	if(wordCode!=-1) {
		if(foundWords.length==0||!foundWords.includes(currentZopa.words[wordCode])) {
			alert("You found another word: "+currentZopa.words[wordCode]); //Alert user about new found word
			foundWords.push(currentZopa.words[wordCode]);
			var row="<tr><td style='width: auto;'>"+currentZopa.words[wordCode]+"</td><td style='width: auto;'>"+zopaUtils.minutesSeconds(currentZopa.lastFoundTime)+"</td></tr>";
			$("#resultsTable").append(row);				

			if(foundWords.length==currentZopa.words.length) {
				var totalTime=zopaUtils.minutesSeconds(currentZopa.startTime);
				alert("CONGRATULATIONS! You found all the words in "+totalTime);//Alert user about zopa terminated
				var row="<tr><th style='width: auto'>TOTAL</th><th style='width: auto'>"+totalTime+"</th></tr>";
				$("#resultsTable").append(row);							
		    	$("#button-newZopa").removeClass("ui-disabled");
				$("#table-1").show();		    	
			}
		}
	}
	else {
		alert("Try again");
		for(var i=0; i<selectedLetters.buttons.length; i++) {
			if(selectedLetters.buttons[i].prevColor=="rgb(51, 51, 51)")
				$("#"+selectedLetters.buttons[i].buttonId).css({"background-color":"rgb(246, 246, 246)","color":"rgb(51, 51, 51)","font-weight":"normal"});	//Set style for not selected letters		
		}
	}
	selectedLetters.init();
}

/********************************************************************************/
// Funciones de llamada a API REST
/********************************************************************************/
function REST_addStudent(newalias, newpassword) {	
	//Add new user to the DB
	//Receives JSON Data-Type
	//Returns the text of the "alias" of the new user
	//	@SuppressWarnings("unchecked")
	//	@POST
	//	@Consumes(MediaType.APPLICATION_JSON)
	//	@Produces(MediaType.TEXT_PLAIN)	
	//	@Path("/addStudent")	
	//	public Response addStudent(StudentJSON studentJSON) 
	var dataToPost =
	{
		alias: newalias,
		password: newpassword
	};

	$.ajax({	
		url: appConstants.addStudentURL(),
		method: "POST",
		data: JSON.stringify(dataToPost),				
		dataType: "text",			    
	    success: function(responseBody) {
	    	if(alias == responseBody)	
	    	{
	    		//Alias introducido por el usuario
	    		alert("Usuario dado de alta: "+responseBody+".");
	    	}
	    	else
	    	{
	    		//Alias generado por el backend (ya existia)
	    		alert("El usuario introducido ya existe. Se ha asignado el siguiente nombre de usuari: "+responseBody+".");
	    	}
	    			
	    	
	    },
	    error: function(request, status, errorThrown) {
	    	alert("Error al registrar usuario. Comprueba tu conexión e inténtalo de nuevo.");
	    	alert("Request: "+request+". Status: "+status+". Error: "+errorThrown);
	    }			    
	});
}

function REST_requestLogin(alias, password, onSuccess) {	
	//Requests the authorization to login to the application
	//Receives from authorization fields the "alias" and the "password"
	//Returns the result of the operation as OK/NOK (plain text info)
	//	@GET
	//	@Produces(MediaType.TEXT_PLAIN)	
	//	@Path("/restricted/requestLogin")
	//	public Response requestLogin() 

	$.ajax({	
		url: appConstants.requestLoginURL(),
		method: 'GET',
		headers: {"Authorization": "Basic "+btoa(alias+":"+password)},
		data: null,				
		dataType: "text",			    
	    success: function(responseBody) {
	    	alert("Inicio de sesión correcto: "+alias+".");		
			onSuccess();
	    },
	    error: function(request, status, errorThrown) {
	    	alert("El usuario introducido ("+alias+")"+" no existe, o la contraseña es incorrecta.");			    		
	    }			    
	});
	
}

function REST_restrictedUploadFile(alias, password, fileToUpload) {	
	//Upload a file to the "img" folder in server
	//Receives the "multipart/form-data" file-type of the image to upload
	//Receives: 
	//			Header: "Content-Type = multipart/form-data"
	//			Body:
	//					TEXT: filetype = img
	//					FILE: file = file_selected(URL//path)
	//Returns text with response info
	//	@POST
	//	@Consumes("multipart/form-data")
	//	@Path("/restricted/uploadFile")
	//	public Response restrictedUploadFile(MultipartFormDataInput input)
	
}

function REST_updateActividad(alias, password, diaSemanaSeleccionado) {	
	//Creates/updates "Actividad" entry in BD
	//Receives authorization data in headers
	//Receives ActividadJSON: "fecha", "grupo", "actividad1", "actividad2", "actividad2imagen"
	//Returns text with response info
	//	@SuppressWarnings("unchecked")
	//	@POST
	//	@Produces(MediaType.TEXT_PLAIN)	
	//	@Path("/restricted/updateActividad")	
	//	public Response updateActividad(ActividadJSON actividadJSON) throws ParseException
	
	var dataToPost =
	{
		fecha: appSesion.initDateTime,
		grupo: "default",
		actividad1: semana.dia[diaSemanaSeleccionado].actividades[0].completed,
		actividad2: semana.dia[diaSemanaSeleccionado].actividades[1].completed,
		actividad2imagen: semana.dia[diaSemanaSeleccionado].actividades[1].remotefile
	};
	
	$.ajax({	
		url: appConstants.updateActividadURL(),
		method: 'POST',
		headers: {"Authorization": "Basic "+btoa(alias+":"+password)},
		data: JSON.stringify(dataToPost),				
		dataType: "text",			    
	    success: function(responseBody) {
	    	//Actividad actualizada
	    	alert("BackEnd Response: "+responseBody);    	
	    },
	    error: function(request, status, errorThrown) {
	    	//Error actualizandp Actividad 
	    	alert("BackEnd Response: "+responseBody+". Request: "+request+". Status: "+status+". Error: "+errorThrown); 			    		
	    }			    
	});
}

function REST_updateTarea(alias, password, diaSemanaSeleccionado) {	
	//Creates/updates "Tarea" entry in BD
	//Receives authorization data in headers
	//Receives TareaJSON: "fecha", "grupo", "tarea1", "tarea2", "tarea3", "tarea4", "tarea5"
	//Returns text with response info
	//	@SuppressWarnings("unchecked")
	//	@POST
	//	@Produces(MediaType.TEXT_PLAIN)	
	//	@Path("/restricted/updateTarea")	
	//	public Response updateTarea(TareaJSON tareaJSON) throws ParseException
	
	var dataToPost =
	{
		fecha: appSesion.initDateTime,
		grupo: "default",
		tarea1: semana.dia[diaSemanaSeleccionado].tareas[0].completed,
		tarea2: semana.dia[diaSemanaSeleccionado].tareas[1].completed,
		tarea3: semana.dia[diaSemanaSeleccionado].tareas[2].completed,
		tarea4: semana.dia[diaSemanaSeleccionado].tareas[3].completed,
		tarea5: false,
	};
	
	$.ajax({	
		url: appConstants.updateTareaURL(),
		method: 'POST',
		headers: {"Authorization": "Basic "+btoa(alias+":"+password)},
		data: JSON.stringify(dataToPost),				
		dataType: "text",			    
	    success: function(responseBody) {
	    	//Actividad actualizada
	    	alert("BackEnd Response: "+responseBody);    	
	    },
	    error: function(request, status, errorThrown) {
	    	//Error actualizandp Actividad 
	    	alert("BackEnd Response: "+responseBody+". Request: "+request+". Status: "+status+". Error: "+errorThrown); 			    		
	    }			    
	});
}

function REST_updateOcio(alias, password, diaSemanaSeleccionado) {	
	//Creates/updates "Ocio" entry in BD
	//Receives authorization data in headers
	//Receives OcioJSON: "fecha", "grupo", "tarea1", "tarea2", "tarea3", "tarea4", "tarea5"
	//Returns text with response info
	//	@SuppressWarnings("unchecked")
	//	@POST
	//	@Produces(MediaType.TEXT_PLAIN)	
	//	@Path("/restricted/updateOcio")	
	//	public Response updateOcio(OcioJSON ocioJSON) throws ParseException
	
	var dataToPost =
	{
		fecha: appSesion.initDateTime,
		grupo: "default",
		ocio1: semana.dia[diaSemanaSeleccionado].ocios[0].completed,
		ocio2: semana.dia[diaSemanaSeleccionado].ocios[1].completed,
		ocio2imagen: semana.dia[diaSemanaSeleccionado].ocios[1].remotefile
	};
	
	$.ajax({	
		url: appConstants.updateOcioURL(),
		method: 'POST',
		headers: {"Authorization": "Basic "+btoa(alias+":"+password)},
		data: JSON.stringify(dataToPost),				
		dataType: "text",			    
	    success: function(responseBody) {
	    	//Actividad actualizada
	    	alert("BackEnd Response: "+responseBody);    	
	    },
	    error: function(request, status, errorThrown) {
	    	//Error actualizandp Actividad 
	    	alert("BackEnd Response: "+responseBody+". Request: "+request+". Status: "+status+". Error: "+errorThrown); 			    		
	    }			    
	});
}

function REST_requestImagenes(alias, password, grupo, coleccion) {	
	// Returns from DB the images for the group and collection selected
	// Receives the query params "grupo" and "coleccion" in the URL (../restricted/requestImagenes?grupo=xxxxx&coleccion=ocio/actividad)
	// Returns a list of JSON objects with the information of the images selected
	// The data returned for "fecha" is a DATETIME type, NOT a string format type
	//	@SuppressWarnings("unchecked")
	//	@GET
	//	@Produces({MediaType.APPLICATION_JSON, MediaType.TEXT_PLAIN})	
	//	@Path("/restricted/requestImagenes")
	//	public Response requestImagenes(@QueryParam("grupo") String grupo, @QueryParam("coleccion") String coleccion)
	
	$.ajax({	
		url: appConstants.requestImagenesURL(),
		method: 'GET',
		headers: {"Authorization": "Basic "+btoa(alias+":"+password),"grupo":grupo,"coleecion":coleccion},
		data: null,				
		dataType: "json",			    
	    success: function(responseBody) {
	    	alert("BackEnd Response: "+responseBody);
	    	
//	    	var dataToGet = null;
//	    	
//	    	if(coleccion == "actividad")
//	    	{
//		    	dataToGet =
//		    	{
//		    		fecha: appSesion.initDateTime,
//		    		grupo: "default",
//		    		ocio1: semana.dia[diaSemanaSeleccionado].ocios[0].completed,
//		    		ocio2: semana.dia[diaSemanaSeleccionado].ocios[1].completed,
//		    		ocio2imagen: semana.dia[diaSemanaSeleccionado].ocios[1].remotefile
//		    	};
//	    	}
//	    	else if(coleccion == "ocio")
//	    	{
//	    		dataToGet =
//		    	{
//		    		fecha: appSesion.initDateTime,
//		    		grupo: "default",
//		    		ocio1: semana.dia[diaSemanaSeleccionado].ocios[0].completed,
//		    		ocio2: semana.dia[diaSemanaSeleccionado].ocios[1].completed,
//		    		ocio2imagen: semana.dia[diaSemanaSeleccionado].ocios[1].remotefile
//		    	};
//	    	}
	    },
	    error: function(request, status, errorThrown) {
	    	alert("BackEnd Response: "+responseBody+". Request: "+request+". Status: "+status+". Error: "+errorThrown);			    		
	    }			    
	});
}

function buttonTestAPIfunctions()
{
	REST_fullAPI_functionsTest(
			credentials.alias, 
			credentials.password, 
			semana.dia[0].actividades[1].remotefile, 
			0);
}

function REST_fullAPI_functionsTest(alias, password, fileToUpload, diaSemanaSeleccionado)
{
	REST_addStudent(alias, password);
	REST_requestLogin(alias, password, function success(){alert("Login correcto");});
	REST_restrictedUploadFile(alias, password, fileToUpload);
	REST_updateActividad(alias, password, diaSemanaSeleccionado);
	REST_updateTarea(alias, password, diaSemanaSeleccionado);
	REST_updateOcio(alias, password, diaSemanaSeleccionado);
	REST_requestImagenes(alias, password, "default", "actividad");
	REST_requestImagenes(alias, password, "default", "ocio");
}
