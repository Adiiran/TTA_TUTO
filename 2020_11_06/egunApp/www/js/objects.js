var appConstants = {
		localPermanentStorageFolder: "/sdcard/egunApp/",
		
		localPermanentStorageFolderImg: function () {
			return this.localPermanentStorageFolder+"img/";
		},
		
		//serverURL: "http://192.168.1.56:8080/BackEnd6/",
		//serverURL: "http://u017633.ehu.eus:28080/TTA2021_LS-EX_09-10S_PUBLIC/",				//V4: SERVER DOMAIN
		serverURL: "http://u017633.ehu.eus:28080/BackEnd06P/",									//UPV/EHU DEPLOYMENT SERVER
		//serverURLstatic: "http://192.168.1.56:8080/BackEnd6/",
		//serverURLstatic: "http://u017633.ehu.eus:28080/static/TTA2021_LS-EX_09-10S_PUBLIC/",	//V4: SERVER DOMAIN
		serverURLstatic: "http://u017633.ehu.eus:28080/static/BackEnd06P/",						//UPV/EHU DEPLOYMENT SERVER
		
		//API REST urls
		addStudentURL: function() {
			return this.serverURL+"rest/school/addStudent"; 
		},
		requestLoginURL: function() {
			return this.serverURL+"rest/school/restricted/requestLogin"; 
		},
		restrictedUploadFileURL: function() {
			return this.serverURL+"rest/school/restricted/uploadFile"; 
		},
		updateActividadURL: function() {
			return this.serverURL+"rest/school/restricted/updateActividad"; 
		},
		updateTareaURL: function() {
			return this.serverURL+"rest/school/restricted/updateTarea"; 
		},
		updateOcioURL: function() {
			return this.serverURL+"rest/school/restricted/updateOcio"; 
		},
		requestImagenesURL: function() {
			return this.serverURL+"rest/school/restricted/requestImagenes"; 
		},
		
		privateStorageFolderURL: function () {
			return cordova.file.dataDirectory;		//DEPLOYMENT
			//return cordova.file.externalDataDirectory; 	//DEVELOPMENT
			//return cordova.file.externalRootDirectory+"egunApp/"; //DEBUG
		},
		
		persistentDataFileName: "APP_DATA",
		persistentDataFileExtension: "json"
};

//Estructura: variables para credenciales de usuario
var credentials = {
	alias: null,
	password: null
};

var datosDiaTrabajo = {
	diaSeleccionado: null,		 // indice del dia: 0-4 == L-V
	entidadSeleccionada: null,	 // indice de entidad: Tarea/Actividad/Ocio == 0/1/2
	numEntidadSeleccionada: null, //indice de tarea/actividad/ocio: 0-3/0-1/0-1
	
	getDiaSeleccionado: function(){
		return this.diaSeleccionado;
	},
	getEntidadSeleccionada: function(){
		return this.entidadSeleccionada;
	},
	getNumEntidadSeleccionada: function(){
		return this.numEntidadSeleccionada;
	}
};

var datosMultimedia = {
	imagenMultimediaLoaded: null,	// indice de imagen cargada en multimediaPage	
	numImagenesMultimediaLoop: null
};


//Funcion: formateador de fecha de BackEnd
var dateFormatter = {
	pad: function(n) {
		if(n<=9)
			return "0"+n;
		else
			return ""+n;
	},
	backendFormat: function(d) {
		return ""+d.getFullYear()+"/"+this.pad((d.getMonth()+1))+"/"+this.pad(d.getDate())+" "+this.pad(d.getHours())+":"+this.pad(d.getMinutes())+":"+this.pad(d.getSeconds());		
	},
	localeFormat: function(d, locale) {
		return ""+d.toLocaleDateString(locale)+" "+d.toLocaleTimeString(locale);		
	}	
};

//Funcion: creacion de sesion de usuario
var appSession = {
	initDateTime: null,
	locale: "en-EN",
	
	initNewSession: function(alias, password) {
		credentials.alias = alias;
		credentials.password = password;
		appSession.initDateTime = new Date();		
					
		appSession.loadContents();	//esta funcion llama a generacion de paginas (por defecto)	
		window.location.href="#selectTutorialOrMapPage";
		
		saveStateApp();
		loadStateUser(alias);
	},		
	
	initNewSessionAsync: function(alias, password) {
		var proceed=true;	
		if(navigator.connection.type!=Connection.WIFI)
			proceed=confirm("Need to connect to remote URL. Proceed whitout WIFI connection?");	
		if(proceed==true) {	
			REST_requestLogin(alias, password, function() {appSession.initNewSession(alias,password)});			
		}
	},	
	
	loadStoredDataAsync: function() {
		var savedPersistentData;

		fileUtilities.readTextFromFileAsync(appConstants.privateStorageFolderURL(),appConstants.persistentDataFileName+"."+appConstants.persistentDataFileExtension,
			function() {
				var content=fileUtilities.contentRead;
				savedPersistentData=JSON.parse(content);
		    	if(savedPersistentData!=undefined) {
		    		credentials=savedPersistentData.credentials;
		    		appSession.initDateTime=new Date(savedPersistentData.initDateTime);
		    		appSession.locale=savedPersistentData.locale;
		    		
	    			$("#alias").val(credentials.alias);
	    			$("#password").val(credentials.password);
		    	}
			},
			function() {
				alert("No session data saved");
			}
		);			
	},		
	
	loadContents: function() {
		//alert("loadContents1");			
//		var pageDiv;
//		for(var i=0;i<tests.total;i++) {
//			pageDiv=pageT.create(i);
//			$("body").append(pageDiv);
//			pageT.load(i);
//		}
//		$("#prev-0").attr("href","#page-t-"+(tests.total-1));
//	 	$("#next-"+(tests.total-1)).attr("href","#page-t-0");
//	 	
//	 	
//		$(".alias").text("ALIAS: "+credentials.alias);
//		$(".initDateTime").text("DATE: "+dateFormatter.localeFormat(appSession.initDateTime, appSession.locale));												
	 	
		fitVisualElems();
		$("body").enhanceWithin();
		
//		$("#loginDiv").hide();
//		$("#continue").show();
//		$("#next-frontPage").show();
//	 	
		//alert("loadContents2");
	}		
};

//Objeto estatico de contenido de aplicacion
var semana = {
	total: 5,
	dia: [
			//Lunes
	       {
	    	   	tareas: [
	    	   				{type: "text", title: "D1T1",  content: "Dia 1. Tarea 1", localfile: null, remotefile: null, completed: false, uploaded: false},
	    	   				{type: "text", title: "D1T2",  content: "Dia 1. Tarea 2", localfile: null, remotefile: null, completed: false, uploaded: false},
	    	   				{type: "text", title: "D1T3",  content: "Dia 1. Tarea 3", localfile: null, remotefile: null, completed: false, uploaded: false},
	    	   				{type: "text", title: "D1T4",  content: "Dia 1. Tarea 4", localfile: null, remotefile: null, completed: false, uploaded: false}
		    	],
	    	   			
	    	   	actividades: [
	    	   					{type: "text",  title: "D1A1",  content: "Dia 1. Actividad 1", localfile: null, remotefile: null, completed: false, uploaded: false},
	    	   					{type: "video", title: "D1A2",  content: "Dia 1. Actividad 2", localfile: null, remotefile: null, completed: false, uploaded: false}
   				],
		    	   				
	    		ocios: [
	    				{type: "text",  title: "D1O1",  content: "Dia 1. Ocio 1", localfile: null, remotefile: null, completed: false, uploaded: false},
	    				{type: "video", title: "D1O2",  content: "Dia 1. Ocio 2", localfile: null, remotefile: null, completed: false, uploaded: false}
   				]
	       },
	       //Martes
	       {
	    	   	tareas: [
	    	   				{type: "text", title: "D2T1", content: "Dia 2. Tarea 1", localfile: null, remotefile: null, completed: false, uploaded: false},
	    	   				{type: "text", title: "D2T2", content: "Dia 2. Tarea 2", localfile: null, remotefile: null, completed: false, uploaded: false},
	    	   				{type: "text", title: "D2T3", content: "Dia 2. Tarea 3", localfile: null, remotefile: null, completed: false, uploaded: false},
	    	   				{type: "text", title: "D2T4", content: "Dia 2. Tarea 4", localfile: null, remotefile: null, completed: false, uploaded: false}
		    	],
	    	   			
	    	   	actividades: [
	    	   					{type: "text",  title: "D2A1", content: "Dia 2. Actividad 1", localfile: null, remotefile: null, completed: false, uploaded: false},
	    	   					{type: "video", title: "D2A2", content: "Dia 2. Actividad 2", localfile: null, remotefile: null, completed: false, uploaded: false}
  				],
		    	   				
	    		ocios: [
	    				{type: "text",  title: "D2O1", content: "Dia 2. Ocio 1", localfile: null, remotefile: null, completed: false, uploaded: false},
	    				{type: "video", title: "D2O2", content: "Dia 2. Ocio 2", localfile: null, remotefile: null, completed: false, uploaded: false}
  				]
	       },
	       //Miercoles
	       {
	    	   	tareas: [
	    	   				{type: "text", title: "D3T1", content: "Dia 3. Tarea 1", localfile: null, remotefile: null, completed: false, uploaded: false},
	    	   				{type: "text", title: "D3T2", content: "Dia 3. Tarea 2", localfile: null, remotefile: null, completed: false, uploaded: false},
	    	   				{type: "text", title: "D3T3", content: "Dia 3. Tarea 3", localfile: null, remotefile: null, completed: false, uploaded: false},
	    	   				{type: "text", title: "D3T4", content: "Dia 3. Tarea 4", localfile: null, remotefile: null, completed: false, uploaded: false}
		    	],
	    	   			
	    	   	actividades: [
	    	   					{type: "text",  title: "D3A1", content: "Dia 3. Actividad 1", localfile: null, remotefile: null, completed: false, uploaded: false},
	    	   					{type: "video", title: "D3A2", content: "Dia 3. Actividad 2", localfile: null, remotefile: null, completed: false, uploaded: false}
  				],
		    	   				
	    		ocios: [
	    				{type: "text",  title: "D3O1", content: "Dia 3. Ocio 1", localfile: null, remotefile: null, completed: false, uploaded: false},
	    				{type: "video", title: "D3O2", content: "Dia 3. Ocio 2", localfile: null, remotefile: null, completed: false, uploaded: false}
  				]
	       },
	       //Jueves
	       {
	    	   	tareas: [
	    	   				{type: "text", title: "D4T1", content: "Dia 4. Tarea 1", localfile: null, remotefile: null, completed: false, uploaded: false},
	    	   				{type: "text", title: "D4T2", content: "Dia 4. Tarea 2", localfile: null, remotefile: null, completed: false, uploaded: false},
	    	   				{type: "text", title: "D4T3", content: "Dia 4. Tarea 3", localfile: null, remotefile: null, completed: false, uploaded: false},
	    	   				{type: "text", title: "D4T4", content: "Dia 4. Tarea 4", localfile: null, remotefile: null, completed: false, uploaded: false}
		    	],
	    	   			
	    	   	actividades: [
	    	   					{type: "text",  title: "D4A1", content: "Dia 4. Actividad 1", localfile: null, remotefile: null, completed: false, uploaded: false},
	    	   					{type: "video", title: "D4A2", content: "Dia 4. Actividad 2", localfile: null, remotefile: null, completed: false, uploaded: false}
  				],
		    	   				
	    		ocios: [
	    				{type: "text",  title: "D4O1", content: "Dia 4. Ocio 1", localfile: null, remotefile: null, completed: false, uploaded: false},
	    				{type: "video", title: "D4O2", content: "Dia 4. Ocio 2", localfile: null, remotefile: null, completed: false, uploaded: false}
  				]
	       },
	       //Viernes
	       {
	    	   	tareas: [
	    	   				{type: "text", title: "D5T1", content: "Dia 5. Tarea 1", localfile: null, remotefile: null, completed: false, uploaded: false},
	    	   				{type: "text", title: "D5T2", content: "Dia 5. Tarea 2", localfile: null, remotefile: null, completed: false, uploaded: false},
	    	   				{type: "text", title: "D5T3", content: "Dia 5. Tarea 3", localfile: null, remotefile: null, completed: false, uploaded: false},
	    	   				{type: "text", title: "D5T4", content: "Dia 5. Tarea 4", localfile: null, remotefile: null, completed: false, uploaded: false}
		    	],
	    	   			
	    	   	actividades: [
	    	   					{type: "text",  title: "D5A1", content: "Dia 5. Actividad 1", localfile: null, remotefile: null, completed: false, uploaded: false},
	    	   					{type: "video", title: "D5A2", content: "Dia 5. Actividad 2", localfile: null, remotefile: null, completed: false, uploaded: false}
  				],
		    	   				
	    		ocios: [
	    				{type: "text",  title: "D5O1", content: "Dia 5. Ocio 1", localfile: null, remotefile: null, completed: false, uploaded: false},
	    				{type: "video", title: "D5O2", content: "Dia 5. Ocio 2", localfile: null, remotefile: null, completed: false, uploaded: false}
  				]
	       }
	 ],
	 
	 respuesta: [ 
		 	{actividad1 : null},
		 	{actividad1 : null},
		 	{actividad1 : null},
		 	{actividad1 : null},
		 	{actividad1 : null}
	 ]
};

//Funcion: inicializacion de variables para dia seleccionado desde mapa
var dayPageT= {
	loadLunes: function(){
		datosDiaTrabajo.diaSeleccionado = 0;
		window.location.href="#dayPage";
	},
	loadMartes: function(){
		datosDiaTrabajo.diaSeleccionado = 1;
		window.location.href="#dayPage";
	},
	loadMiercoles: function(){
		datosDiaTrabajo.diaSeleccionado = 2;
		window.location.href="#dayPage";
	},
	loadJueves: function(){
		datosDiaTrabajo.diaSeleccionado = 3;
		window.location.href="#dayPage";
	},
	loadViernes: function(){
		datosDiaTrabajo.diaSeleccionado = 4;
		window.location.href="#dayPage";
	}
};


//Funcion: Carga de contenidos de aplicacion en diferentes tipos de pantalla de contenido
var contentPageT={
		
 	// Carga de tarea,actividad u ocio en textContentPage
 	loadTextContent: function() {
 		
 		window.location.href="#textContentPage";
 		
 		if(datosDiaTrabajo.entidadSeleccionada == 0)
 		{
 			//Tarea
 			$("#titleText").text(semana.dia[datosDiaTrabajo.diaSeleccionado].tareas[datosDiaTrabajo.numEntidadSeleccionada].title);
 			$("#titleText").css({"color":"blue", "font-size":"50px"});
 	 		$("#contentText").text(semana.dia[datosDiaTrabajo.diaSeleccionado].tareas[datosDiaTrabajo.numEntidadSeleccionada].content);
 	 		$("#contentText").css({"font-size":"20px"});
 	 		$("#prevTextContentPage").attr("href","#tareasPage");
 	 		$("#textInputBox").hide();
 	 		$("#button-respuesta-text").hide();
 	 		$("#zopaInputBox").hide();
 		}
 		else if(datosDiaTrabajo.entidadSeleccionada == 1)
		{
 			//Actividad
 			$("#titleText").text(semana.dia[datosDiaTrabajo.diaSeleccionado].actividades[datosDiaTrabajo.numEntidadSeleccionada].title);
 			$("#titleText").css({"color":"blue", "font-size":"50px"});
 			$("#contentText").text(semana.dia[datosDiaTrabajo.diaSeleccionado].actividades[datosDiaTrabajo.numEntidadSeleccionada].content);
 			$("#contentText").css({"font-size":"20px"});
 	 		$("#prevTextContentPage").attr("href","#actividadesPage");
 	 		$("#textInputBox").hide();
 	 		$("#button-respuesta-text").hide();
 	 		$("#zopaInputBox").hide();
 	 		
 	 		if(datosDiaTrabajo.numEntidadSeleccionada == 0)
 	 		{
 	 			//Actividad 1 -> Carga el textInputBox
 	 			$("#textInputBox").show();
 	 			$("#button-respuesta-text").show();
 	 			
 	 			loadTextResponse();
 	 		}

		}
 		else if(datosDiaTrabajo.entidadSeleccionada == 2)
		{
 			//Ocio
 			$("#titleText").text(semana.dia[datosDiaTrabajo.diaSeleccionado].ocios[datosDiaTrabajo.numEntidadSeleccionada].title);
 			$("#titleText").css({"color":"blue", "font-size":"50px"});
 	 		$("#contentText").text(semana.dia[datosDiaTrabajo.diaSeleccionado].ocios[datosDiaTrabajo.numEntidadSeleccionada].content);
 	 		$("#contentText").css({"font-size":"20px"});
 	 		$("#prevTextContentPage").attr("href","#ociosPage");
 	 		$("#textInputBox").hide();
 	 		$("#button-respuesta-text").hide();
 	 		$("#zopaInputBox").hide();
 	 		
 	 		if(datosDiaTrabajo.numEntidadSeleccionada == 0)
 	 		{
 	 			//OCIO 1 -> Carga el zopaInputBox
 	 			$("#zopaInputBox").show();
 	 			newZopa();
 	 		}
		}
 		else
		{
 			//Error
 			alert("Bad request text content");
		}		
 	},	

	loadInitialMultimediaPageContent: function(){
		
		window.location.href="#multimediaPage";
		
		datosMultimedia.imagenMultimediaLoaded = 1;
		datosMultimedia.numImagenesMultimediaLoop = 4;
		$("#imagenLoaded").attr("src","img/multimediaLoop/imageMultimedia-"+datosMultimedia.imagenMultimediaLoaded+".jpg");
	},
	
	loadAnteriorMultimediaPageContent: function(){
		datosMultimedia.imagenMultimediaLoaded = datosMultimedia.imagenMultimediaLoaded - 1;
		if(datosMultimedia.imagenMultimediaLoaded < 1)
		{
			datosMultimedia.imagenMultimediaLoaded = datosMultimedia.numImagenesMultimediaLoop;
		}
		
		$("#imagenLoaded").attr("src","img/multimediaLoop/imageMultimedia-"+datosMultimedia.imagenMultimediaLoaded+".jpg");
		$("#imagenLoaded").trigger("load");
		$("#imagenLoaded").show(); 
	},
	
	loadSiguienteMultimediaPageContent: function(){
		datosMultimedia.imagenMultimediaLoaded = datosMultimedia.imagenMultimediaLoaded + 1;
		if(datosMultimedia.imagenMultimediaLoaded > datosMultimedia.numImagenesMultimediaLoop)
		{
			datosMultimedia.imagenMultimediaLoaded = 1;
		}
		
		$("#imagenLoaded").attr("src","img/multimediaLoop/imageMultimedia-"+datosMultimedia.imagenMultimediaLoaded+".jpg");
		$("#imagenLoaded").trigger("load");
		$("#imagenLoaded").show(); 
	},
		
};

//Funcion: inicializacion y carga de paginas relacionadas con Tareas
var tareasPageT = {
	// Carga de tareas del dia "i" en "tareasPage"
	loadTareas: function() {
		//alert("loadTareas1");
		
		window.location.href="#tareasPage";
		
		cargarProgreso(0);
		
     	$("#button-tarea1").text(semana.dia[datosDiaTrabajo.diaSeleccionado].tareas[0].title);
     	$("#button-tarea2").text(semana.dia[datosDiaTrabajo.diaSeleccionado].tareas[1].title);
     	$("#button-tarea3").text(semana.dia[datosDiaTrabajo.diaSeleccionado].tareas[2].title);
     	$("#button-tarea4").text(semana.dia[datosDiaTrabajo.diaSeleccionado].tareas[3].title);
     	
     	$("#button-atrasTareas").attr("href","#dayPage");
     	
     	
     	//alert("loadTareas7");
 	},
 	
 	// Carga de tarea "i" en textContentPage
 	loadTareaTextContentX: function(i) {
 		if( i > 3 || i<0 )
 		{
 			alert("Bad Tarea Entity Request");
 		}
 		
 		datosDiaTrabajo.entidadSeleccionada = 0;
 		datosDiaTrabajo.numEntidadSeleccionada = i;
 		
 		window.location.href="#textContentPage";
 		contentPageT.loadTextContent();
 	}
 	
};

//Funcion: inicializacion y carga de paginas relacionadas con Actividades
var actividadesPageT = {
	// Carga de actividades del dia "i" en "actividadesPage"
	loadActividades: function() {
		//alert("loadActividades1");
		
		window.location.href="#actividadesPage";
		
		cargarProgreso(1);
		
     	$("#button-actividad1").text(semana.dia[datosDiaTrabajo.diaSeleccionado].actividades[0].title);
     	$("#button-actividad2").text(semana.dia[datosDiaTrabajo.diaSeleccionado].actividades[1].title);
    	
     	$("#prevActividadPage").attr("href","#dayPage");
     	
     	//alert("loadActividades7");
 	},
 	
 	// Carga de actividad "i" en "textContentPage"
 	loadActividadTextContentX: function(i) {
 		if( i > 1 || i<0 ){
 			alert("Bad Actividad Entity Request");
 		}
 		
 		datosDiaTrabajo.entidadSeleccionada = 1;
 		datosDiaTrabajo.numEntidadSeleccionada = i;
 		
 		window.location.href="#textContentPage";	
 		contentPageT.loadTextContent();
 		
 	}
 	
// 	// Carga de actividad "i" en "videoContentPage"
// 	loadActividadVideoContentX: function(i) {
// 		
// 		
// 	},
// 	// Carga de actividad "i" en "pdfContentPage"
// 	loadActividadPDFContentX: function(i) {
// 		
// 		
// 	}
};

//Funcion: inicializacion y carga de paginas relacionadas con Ocios
var ociosPageT = {
	// Carga de ocios del dia "i" en "ociosPage"
	loadOcios: function() {
		//alert("loadOcios1");
		
		window.location.href="#ociosPage";
		
		cargarProgreso(2);
		
     	$("#button-ocio1").text(semana.dia[datosDiaTrabajo.diaSeleccionado].ocios[0].title);
     	$("#button-ocio2").text(semana.dia[datosDiaTrabajo.diaSeleccionado].ocios[1].title);
    	
     	$("#prevOcioPage").attr("href","#dayPage");
     	
     	
     	//alert("loadOcios7");
 	},
 	
 	// Carga de ocio "i" en "textContentPage"
 	loadOcioTextContentX: function(i) {
 		if( i > 1 || i<0 ){
 			alert("Bad Ocio Entity Request");
 		}
 		
 		datosDiaTrabajo.entidadSeleccionada = 2;
 		datosDiaTrabajo.numEntidadSeleccionada = i;
 		
 		window.location.href="#textContentPage";	
 		contentPageT.loadTextContent();	
 		
 	}
// 	// Carga de ocio "i" en "videoContentPage"
// 	loadOcioVideoContentX: function(i) {
// 		
// 		
// 	}
};



//FUNCIONES Y OBJETOS PARA GESTION DE FICHEROS Y RECURSOS HW
var fileUtilities = {
	moveAsync: function (sourceFullPath,destFolder,destName,onSuccess){
		var url="file://"+sourceFullPath;
		var destFile=destFolder+destName;
		var fileTransfer = new FileTransfer();
		fileTransfer.download(
			url,
			destFile,
			function() {
				window.resolveLocalFileSystemURL(url,
	    			function(fileEntry) {
	    				fileEntry.remove(onSuccess);
	    			},
	    			function(error) {
	    				alert("Source file NOT removed");
	    			}
	    		);			
			},
			function(error) {
				if(error.code==1)
					alert('File not copied. STORAGE permissions are needed');
				else
					alert('File not copied. error.code: '+error.code+'\nerror.source: '+error.source+'\nerror.target: '+error.target);					
			}
		);		
	},
	
	uploadFileAsync: function(sourceFullPath,fileType,uploadFileServiceURL,onSuccess,onError) {
		var fileURL="file://"+sourceFullPath;
		var fileName=sourceFullPath.substring(sourceFullPath.lastIndexOf("/")+1);
		var options = new FileUploadOptions();
		options.fileKey = "file";
		options.mimeType = "multipart/form-data";
		options.fileName = fileName;
		options.params={filetype:fileType};
		options.headers={"Authorization": "Basic "+btoa(credentials.alias+":"+credentials.password)};
		
		var ft = new FileTransfer();
		ft.upload(fileURL, encodeURI(uploadFileServiceURL),
			function() {
				alert("File uploaded");
				if(onSuccess!=false)
					onSuccess();
			}, 
			function(error) {
				alert("File upload ERROR: "+error.code);
				if(onError!=false)
					onError();			
			}, 
			options
		);
	},
	
	writeContentToFileAsync: function(fileFolderURL,fileName,content,onSuccess) {
		//alert("writeContentToFileAsync1");
		window.resolveLocalFileSystemURL(
			fileFolderURL,
			function(dirEntry) {
				dirEntry.getFile(
					fileName, 
					{create:true}, 
					function(fileEntry) {
						fileEntry.createWriter(
							function(fileWriter) {				
								fileWriter.onwriteend=function() {
									fileWriter.onwriteend=function() {
										//alert("Content written to file: "+fileFolderURL+fileName);
										if(onSuccess!=false)
											onSuccess();
									};
									fileWriter.write(content);									
								}
								fileWriter.truncate(0);
							},
							function(error) {
								alert("Writing error: code "+error.code);
							}
						);
					},
					function(error) {
						alert("File error: code "+error.code);						
					}					
				);
			},
			function(error) {
				alert("FileSystem error: code "+error.code);				
			}				
		);
		//alert("writeContentToFileAsync2");
	},
	
	readTextFromFileAsync: function(fileFolderURL,fileName,onSuccess,onError) {
		//alert("readObjectFromFileAsync1");
		window.resolveLocalFileSystemURL(
				fileFolderURL+fileName,
				function(fileEntry) {
					fileEntry.file(
						function(file) {
							var reader = new FileReader();
							reader.onloadend = function() {
								fileUtilities.contentRead=reader.result;
								if(onSuccess!=false)
									onSuccess();								
							}
							reader.readAsText(file);
						},
						function(error) {
							if(onError!=false)
								onError();
							else							
								alert("File error: code "+error.code);							
						}						
					);
				},
				function(error) {
					if(onError!=false)
						onError();
					else
						alert("Filesystem error: code "+error.code);													
				}				
		);
		//alert("readObjectFromFileAsync3");		
	}
};

var photo = {
	fileFolder:null,
	fileName:null,
	takeAsync: function(fileFolder,fileName,onSuccess) {
		navigator.device.capture.captureImage(					
			function(photoFiles) {
				var tempFullPath=photoFiles[0].fullPath;					
				tempFullPath=tempFullPath.substring(tempFullPath.indexOf("/")).replace("///","/");
				
				fileUtilities.moveAsync(tempFullPath,fileFolder,fileName,
			        function() {
						photo.fileFolder=fileFolder;
						photo.fileName=fileName;
						if(onSuccess!=false)
							onSuccess();
	        		}							
				);
			},
			function(error) {
				var msgText = "Photo error: " + error.message + "(" + error.code + ")";
				alert(msgText);
			},
			{correctOrientation:true}
		);			
	}
};


var currentZopa = {	
	rows: 9,//Sets max length for any word to find
	cols: 9,//Sets max length for any word to find
	words:	[//words to find in zopa
				"ARROZA",
				"GLUTENA",
				"GARIA",
				"FRUTA",							
			],
	startTime: null,
	lastFoundTime: null
};

var availableZopa = 
	{	
		zopas: [
			// Zopa[0]: frutos secos
			{
			rows: 12,//Sets max length for any word to find
			cols: 12,//Sets max length for any word to find
			words:	
				[//words to find in zopa
						"ALMENDRA",
						"ANACARDO",
						"NUEZ",
						"CACAHUETE"							
				],
			startTime: null,
			lastFoundTime: null
			},
			
			// Zopa[1]: frutas
			{	
			rows: 12,//Sets max length for any word to find
			cols: 12,//Sets max length for any word to find
			words:	
				[//words to find in zopa
						"MANZANA",
						"PERA",
						"NARANJA",
						"PLATANO",	
						"KIWI"
				],
			startTime: null,
			lastFoundTime: null
			},
			
			// Zopa[2]: frutas
			{	
			rows: 12,//Sets max length for any word to find
			cols: 12,//Sets max length for any word to find
			words:	
				[//words to find in zopa
						"MANZANA",
						"PERA",
						"NARANJA",
						"PLATANO",	
						"KIWI"
				],
			startTime: null,
			lastFoundTime: null
			},
			
			// Zopa[3]: frutas
			{	
			rows: 12,//Sets max length for any word to find
			cols: 12,//Sets max length for any word to find
			words:	
				[//words to find in zopa
						"MANZANA",
						"PERA",
						"NARANJA",
						"PLATANO",	
						"KIWI"
				],
			startTime: null,
			lastFoundTime: null
			},
			
			// Zopa[4]: frutas
			{	
			rows: 12,//Sets max length for any word to find
			cols: 12,//Sets max length for any word to find
			words:	
				[//words to find in zopa
						"MANZANA",
						"PERA",
						"NARANJA",
						"PLATANO",	
						"KIWI"
				],
			startTime: null,
			lastFoundTime: null
			}
	]
};

