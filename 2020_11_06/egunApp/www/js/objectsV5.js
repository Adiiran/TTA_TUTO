//var credentials = {//IGUAL Q V4
//	alias: null	
//};

var tests = {//IGUAL Q V4
	total: 3,
	test: [
	       {
	    	   	question: "This is the first question...bla bla bla?",
	    	   	resp: [
	    	   			"A: Wrong 0-0 with text advice",
	    	   			"B: This is the right one",
	    	   			"C: Wrong 0-2 with local img advice",//V5
	    	   			"D: Wrong 0-3"
	    		      ],
	    		correct: "1",
	    		adv: [
	    				{type: "text", content: "Advice 0-0: you should have a look to diagram A..."},
	    				{type: "none", content: null},
	    				{type: "image", content: "img/ADV_0_2.jpg"},//V5
	    				{type: "none", content: null}
	    		     ]
	       },
	       {
	    	   	question: "This is the second question...bla bla bla?",
	    	   	resp: [
	    	          "A: Wrong 1-0 with text advice",
	    	          "B: Wrong 1-1 with local audio advice",//V5
	    		      "C: Wrong 1-2",
	    		      "D: This is the right one"
	    		      ],
	    		correct: "3",
	    		adv: [
	    				{type: "text", content: "Advice 1-0: you should listen to audio A..."},
	    				{type: "audio", content: "audio/ADV_1_1.ogg"},//V5
	    				{type: "none", content: null},
	    				{type: "none", content: null}
	    		     ]     
	       },
	       {
	    	   	question: "This is the third question...bla bla bla?",
	    	   	resp: [
	    	          "A: This is the right one",
	    	          "B: Wrong 2-1 with text advice",
	    		      "C: Wrong 2-2 with local video advice",//V5
	    		      "D: Wrong 2-3"
	    		      ],
	    		correct: "0",
	    		adv: [
	    				{type: "none", content: null},
	    				{type: "text", content: "Advice 2-1: you should watch video B"},
	    				{type: "video", content: "video/ADV_2_2.mp4"},//V5
	    				{type: "none", content: null}
	    		     ]
	       }
	 ]
};

var results = {//IGUAL Q V4
	corrects: 0,
	answered: 0
};

var pageT = {//IGUAL Q V4
	create: function(i) {
//		alert("create1");
		var pageDiv=$('<div data-role="page" id="page-t-'+i+'"></div>');
		var headerDiv=
			'<div data-role="header" data-position="fixed" >'+
				'<h1 style="margin-left:0;margin-right:0;white-space: nowrap;overflow: visible;">TTA2021_LS-EX_08v5: test5</h1>'+
			'</div>';
		
		var contentDiv=
			'<div data-role="content">'+
				'<h3 class="alias"></h3>'+
				'<h3 class="initDateTime"></h3>'+												
				'<form>'+
					'<fieldset data-role="controlgroup" data-iconpos="right">'+
					'<legend id="question-'+i+'"></legend>'+
					'<input name="radio-choice-'+i+'" id="radio-choice-'+i+'a" data-mini="true" value="0" type="radio"/>'+
					'<label for="radio-choice-'+i+'a" id="label-radio-choice-'+i+'-0"></label>'+
					'<input name="radio-choice-'+i+'" id="radio-choice-'+i+'b" data-mini="true" value="1" type="radio"/>'+
					'<label for="radio-choice-'+i+'b" id="label-radio-choice-'+i+'-1"></label>'+
					'<input name="radio-choice-'+i+'" id="radio-choice-'+i+'c" data-mini="true" value="2" type="radio"/>'+
					'<label for="radio-choice-'+i+'c" id="label-radio-choice-'+i+'-2"></label>'+
					'<input name="radio-choice-'+i+'" id="radio-choice-'+i+'d" data-mini="true" value="3" type="radio"/>'+
					'<label for="radio-choice-'+i+'d" id="label-radio-choice-'+i+'-3"></label>'+
					'</fieldset>'+
					'<div style="text-align:center;">'+
						'<a href="" id="button-'+i+'-1" class="ui-btn ui-btn-inline ui-corner-all" onclick="check('+i+')">CHECK</a>'+
						'<a href="" id="button-'+i+'-2" class="ui-btn ui-btn-inline ui-corner-all" style="display:none;" onclick="">ADVICE</a>'+						
					'</div>'+
				'</form>'+
				'<div id="imageAdvice-'+i+'" style="display:none; text-align: center;">'+//V5
					'<p style="text-align: left;">IMAGE ADVICE</p>'+
					'<img id="image-'+i+'" alt="" src="" style="width:auto; height:auto; border: black 1px solid;"/>'+
				'</div>'+				
				'<div id="audioAdvice-'+i+'" style="display:none; text-align: center;">'+//V5
					'<p style="text-align: left;">AUDIO ADVICE</p>'+
					'<audio id="audio-'+i+'" controls="controls">'+
						'<source id="src-audio-'+i+'" src=""/>'+
					'</audio>'+
				'</div>'+						
				'<div id="videoAdvice-'+i+'" style="display:none; text-align:center;">'+//V5
					'<p style="text-align: left;">VIDEO ADVICE</p>'+
					'<video id="video-'+i+'" controls="controls" style="width:auto; height:auto;">'+						
						'<source id="src-video-'+i+'" src="" type="video/mp4"/>'+
					'</video>'+
				'</div>'+//V5				
			'</div>';
		
		var footerDiv=
			'<div data-role="footer" data-position="fixed">'+
				'<table style="width:100%; margin-left:auto; margin-right:auto;">'+
					'<tr>'+
						'<td style="text-align:right;width:33%;">RESULTS: </td>'+
						'<td style="text-align:center;width:34%;" class="res-1">0/0</td>'+
						'<td style="text-align:left;width:33%;" class="res-2">0%</td>'+
					'</tr>'+
					'<tr>'+
						'<td style="text-align:center;" colspan="3"><h4 style="margin:0%;">2020-2021 TTA</h4></td>'+
					'</tr>'+
					'<tr>'+
						'<td style="text-align:left;width:33%;" ><a href="#" id="prev-'+i+'" class="ui-btn ui-mini ui-corner-all ui-icon-arrow-l ui-btn-icon-left" data-transition="turn">Prev</a></td>'+
						'<td style="text-align:center;width:34%;"></td>'+
						'<td style="text-align:right;width:33%;"><a href="#" id="next-'+i+'" class="ui-btn ui-mini ui-corner-all ui-icon-arrow-r ui-btn-icon-right" data-transition="turn">Next</a></td>'+							
					'</tr>'+
				'</table>'+
			'</div>';
		
		pageDiv.append(headerDiv,contentDiv,footerDiv);//V3: Añadir encabezado, contenido y pie al pageT
		
//		alert("create2");
		return pageDiv;
	},
	load: function(i) {
//		alert("load1");
		
     	$("#question-"+i).text("QUESTION "+i+": "+tests.test[i].question);
    	
     	$("label[id|='label-radio-choice-"+i+"']").each(
     			function(index) {     				
     				$(this).text(tests.test[i].resp[index]);     				
    		    }
     	);
     	
     	$("#prev-"+i).attr("href","#page-t-"+(i-1));
     	$("#next-"+i).attr("href","#page-t-"+(i+1));
//		alert("load7");
 	}
};

//var appSession = {
//		initDateTime: null,
//		locale: "en-EN",
//		initNewSession: function(alias) {//IGUAL Q V4
//			credentials.alias=alias;
//			appSession.initDateTime=new Date();		
//						
//			appSession.loadContents();	
//		},				
//		loadContents: function() {//IGUAL Q V4
////			alert("loadContents1");			
//			var pageDiv;
//			for(var i=0;i<tests.total;i++) {
//				pageDiv=pageT.create(i);
//				$("body").append(pageDiv);
//				pageT.load(i);
//			}
//			$("#prev-0").attr("href","#page-t-"+(tests.total-1));
//		 	$("#next-"+(tests.total-1)).attr("href","#page-t-0");
//		 	
//		 	
//			$(".alias").text("ALIAS: "+credentials.alias);
//			$(".initDateTime").text("DATE: "+dateFormatter.localeFormat(appSession.initDateTime, appSession.locale));												
//		 	
//			fitVisualElems(); //V5
//			$("body").enhanceWithin();//V5
//			
//			$("#loginDiv").hide();
//			$("#continue").show();
//			$("#next-frontPage").show();
//		 	
////			alert("loadContents2");
//		}		
//	};

//var dateFormatter = {//IGUAL Q V4
//		pad: function(n) {
//			if(n<=9)
//				return "0"+n;
//			else
//				return ""+n;
//		},
//		backendFormat: function(d) {
//			return ""+d.getFullYear()+"/"+this.pad((d.getMonth()+1))+"/"+this.pad(d.getDate())+" "+this.pad(d.getHours())+":"+this.pad(d.getMinutes())+":"+this.pad(d.getSeconds());		
//		},
//		localeFormat: function(d, locale) {
//			return ""+d.toLocaleDateString(locale)+" "+d.toLocaleTimeString(locale);		
//		}	
//	};

