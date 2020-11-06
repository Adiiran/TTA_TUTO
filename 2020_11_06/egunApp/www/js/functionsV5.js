//function login() {//IGUAL Q V4
//	var alias=$("#alias").val();
//	
//	if(alias!=null&&alias!="") {			
//		appSession.initNewSession(alias);
//	}
//	else
//		alert("WRONG CREDENTIALS");		
//}

function check(i) {//IGUAL Q V4
//	alert("check 1");
	
	results.answered++;
	
	var answer=$("input[name='radio-choice-"+i+"']:checked").val();
	
	if(answer==tests.test[i].correct) {
		alert("CORRECT");
		results.corrects++;
	}
	else {
		alert("WRONG");
		$("#button-"+i+"-2").attr("onclick","advice("+i+","+answer+")");
		$("#button-"+i+"-2").css("display","block");
	}
	
	$(".res-1").text(""+results.corrects+"/"+results.answered);
	$(".res-2").text(""+(results.corrects*100/results.answered).toFixed(2)+"%");//V1
	
	$("label[id|='label-radio-choice-"+i+"']").each(
		function(index) {
			if(index!=tests.test[i].correct) {
				$(this).css("color","red");//V2
			}
			else
				$(this).css({"color":"white","background-color":"green","font-size":"24px"});
		}
	);

	$("#button-"+i+"-1").attr("onclick","");//V3
//	alert("check 7");
}

function advice(testIndex,advIndex) {//IGUAL Q V4
	var adv=tests.test[testIndex].adv[advIndex];
	var advContent=adv.content;

	switch(adv.type) {
		case "text":
			alert("ADVICE: "+advContent);
			break;
		case "image"://V5
			$("#image-"+testIndex).attr("src",advContent);
			$("#imageAdvice-"+testIndex).show();
			break;
		case "audio"://V5
			$("#src-audio-"+testIndex).attr("src",advContent);
			$("#audio-"+testIndex).trigger("load");
			$("#audioAdvice-"+testIndex).show();
			$("#audio-"+testIndex).trigger("play");
		
			break;
		case "video":
			$("#src-video-"+testIndex).attr("src",advContent);//V5: Ajustar src del video
			$("#video-"+testIndex).trigger("load");
			$("#videoAdvice-"+testIndex).show();
			$("#video-"+testIndex).trigger("play");//V5: Play video
			break;	//V5	
	}	
}
