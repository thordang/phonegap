var FacebookAppId = '472898372792971';
var FacebookAppLink = '//local.beesightsoft.com:81/skinizi/index.php/designer';
var InstaAppId = 'fdd6bcec0bf046bb8ef90beb5a703ddc';
var fbOBJ=[];
var lid,cid,currentImgobj,Imgnext,Imgeff,maxImage;
$(document).ready(function(){
	$(window).resize();
	$(".tab").click(function(){
		$(".tab").removeClass("active");
		$(".tab-content").removeClass("active");
		$(this).addClass("active");
		$("#"+$(this).attr("id")+"-cont").addClass("active");
		$("#"+$(this).attr("id")+"-cont .tab-btn:first").click();

	});
	$(".tab-btn").click(function(){
		$(".tab-btn").removeClass("active");
		$(this).addClass("active");
		$(".menu-cont").removeClass("active");
		$("#cont-"+$(this).attr("id")).addClass("active");
	})

	$(".tab-btn").each(function(){
		//$(".main-menu").append('<div id="cont-'+$(this).attr("id")+'" class="menu-cont"></di></div>');
	})

	$("#tab2").click();

	$(".backalbum").click(function(){
		var papa = $(this).parent().parent().attr("id");
		$("#"+papa+" .switchalbum .btnalbum").show();
		$("#"+papa+" .switchalbum .backalbum").hide();
		$("#"+papa+" .switchalbum .backalbum").hide();
		$("#"+papa+" .tabdetail").removeClass("active");
		$("#"+papa+" ."+$("#"+papa+" .switchalbum .btnalbum.active").attr("data")).addClass("active");
	})

	//---------------Device append
	$("#cont-btn-device").append('<h4>CHOOSE YOUR DEVICE</h4><div class="xcroll">');
	for(i=0;i<ddevice.length;i++)
		$("#cont-btn-device .xcroll").append('<div name="'+ddevice[i].name+'" price="'+ddevice[i].price+'" data="'+ddevice[i].id+'" class="dcell"><img src="'+ddevice[i].thumbnail+'" /><p>'+ddevice[i].name+'</p></div>');
	$(".dcell").click(function(){
		$(".dcell").removeClass("active");
		$(this).addClass("active");
		$("#cont-btn-layout").html("");
		$("#cont-btn-layout").append('<h4>CHOOSE LAYOUT</h4><div class="xcroll"></div>');
		var did = $(this).attr("data");
		toolOBJ.currentDevice = this;
		$(".info .ptitle").html($(this).attr("name"));
		$(".info .pprice").html("$"+$(this).attr("price"));
		for(j=0;j<devvas.length;j++)
			if(did==devvas[j].deviceid){
				for(a=0;a<dcanvas.length;a++)
					if(devvas[j].canvasid == dcanvas[a].id)
						for(i=0;i<layouts.length;i++)
							if(layouts[i].idc==dcanvas[a].id)
								$("#cont-btn-layout .xcroll").append('<div canvas="'+layouts[i].idc+'" data="'+layouts[i].id+'" class="lcell"><img src="http://local.beesightsoft.com:81/skinizi/assets/layout/'+layouts[i].thumbnail+'" /></div>');
				break;
			}
		$(".lcell").click(function(){
			$(".lcell").removeClass("active");
			$(this).addClass("active");
			lid = $(this).attr("data");
			cid = $(this).attr("canvas");
			tmpcv = null;
			toolOBJ.currentCanvas = cid;
			$(".product").html("");
			toolOBJ.listCell = [];
			for(a=0;a<dcanvas.length;a++)
				if(cid == dcanvas[a].id){
					if(dcanvas[a].beside!=""){
						$(".beside-image").css("background","url("+dcanvas[a].beside+") center no-repeat");
						$(".beside-image").css("height",dcanvas[a].height);
					}

					$(".product").append('<div id="layout'+cid+'" class="layout" style="background:url('+dcanvas[a].layer+') center no-repeat;height:'+dcanvas[a].height+'px;width:'+dcanvas[a].width+'px"><canvas id="lcanvas'+cid+'"></canvas></div><div id="fcanvas"></div>');
					tmpcv = dcanvas[a];
				}
			for(i=0;i<layouts.length;i++)
				if(layouts[i].id==lid){
					var bgImgSrc = tmpcv.skin;
					toolOBJ.createLayoutCanvas(tmpcv.layerboundary, tmpcv.width, tmpcv.height, cid);
					var tmpLayout = layoutOBJ(layouts[i].data, "none","#layout"+toolOBJ.currentCanvas, i);
					//var layoutpos = layout[i].position.split(",");
					//var leftpos = ($("#skin").width() - canvas[pis].width)/2+parseInt(layoutpos[1])+'px';
					//var toppos = ($("#skin").height() - canvas[pis].height)/2+parseInt(layoutpos[0])+'px';
					$("#layout"+cid).css({left: 0, top: 0});
					toolOBJ.listLayout.push(tmpLayout);
					toolOBJ.currentLayout = tmpLayout;
					tmpLayout.render();
					console.log(toolOBJ.currentCanvasLayout);

					toolOBJ.currentCanvasLayout.setOverlayImage(bgImgSrc, function(img){
					  toolOBJ.currentCanvasLayout.renderAll();
					});
				}
		})
		$(".lcell:first").click();
	})
	//---------------Layout append
	
	$(".btnalbum").hide();
	$(".btnalbum").click(function(){
		var papa = $(this).parent().parent().attr("id");
		$("#"+papa+" .switchalbum .btnalbum").removeClass("active");
		$(this).addClass("active");
		$("#"+papa+" .tabdetail").removeClass("active");
		$("#"+papa+" ."+$("#"+papa+" .switchalbum .btnalbum.active").attr("data")).addClass("active");
	})
	//---------------Instagram
	//$("#cont-btn-instagram").append('<div class="xcroll"></div>');
	//$("#cont-btn-instagram .xcroll").append('<h3 class="socialhead">Connect to Instagram!</h3><p class="socialnotice">Connect to your Instagram account to customize your case.</p><div onclick="INS_login()" class="sociallogin"><div class="logicon"><span class="uicon"></span></div><span class="scname">Instagram</span></div>');
	//---------------Facebook
	//$("#cont-btn-facebook").append('<div class="xcroll"></div>');
	//$("#cont-btn-facebook .xcroll").append('<h3 class="socialhead">Connect to Facebook!</h3><p class="socialnotice">Connect to your Facebook account to customize your case.</p><div onclick="FB_login()" class="sociallogin"><div class="logicon"><span class="uicon"></span></div><span class="scname">Facebook</span></div>');
	//---------------Upload
	//$("#cont-btn-uploads").append('<div class="uploadarea"><p>Drop your pictures here!</p><div class="btnupload">Or upload</div><div>');
	//$("#cont-btn-uploads").append('<div class="xcroll"></div>');


	//---------------Filter
	$("#cont-btn-filter").append('<div class="xcroll"></div>');
	for(i=0;i<effect.length;i++)
		$("#cont-btn-filter .xcroll").append('<div class="efcell" onclick="applyEffect(\''+effect[i].effect+'\');"><img src="http://local.beesightsoft.com:81/skinizi/assets/effect/thumbnail/'+effect[i].effect+'.png" /></div>');
	
	$(".ctrpanel .cancel").click(function(){
		toolOBJ.currentEditing._o.imgOBJ.active = false;
		toolOBJ.currentEditing._o.imgOBJ.top-=toolOBJ.currentEditing._h*toolOBJ.currentEditing._m;
		toolOBJ.currentEditing._o.imgOBJ.left-=toolOBJ.currentEditing._w*toolOBJ.currentEditing._m;
		toolOBJ.currentEditing._o.imgOBJ.opacity = 1;
		toolOBJ.currentEditing._o.canvas.renderAll();
		$('#fcanvas').fadeOut();
		$('.frog').hide();
	});
	$(".ctrpanel .trash").click(function(){
		$("#"+toolOBJ.currentEditing._o.item).children().remove();
		toolOBJ.currentEditing._o.canvas._objects = [];
		toolOBJ.currentEditing._o.canvas.renderAll();
		toolOBJ.currentCanvasLayout._objects = [];
		toolOBJ.currentCanvasLayout.renderAll();
		for(i=0;i<toolOBJ.listCell.length;i++)
			toolOBJ.SavetoCanvas(toolOBJ.listCell[i].canvas.toDataURL("image/png"), toolOBJ.listCell[i]._cellleft, toolOBJ.listCell[i]._celltop);
		
		$('#fcanvas').fadeOut();
		$('.frog').hide();
	});
	$(".ctrpanel .done").click(function(){
		$('.frog').fadeOut();
		$('#fcanvas').fadeOut();
		toolOBJ.currentEditing._o.imgOBJ.active = false;
		toolOBJ.currentEditing._o.imgOBJ.top-=toolOBJ.currentEditing._h*toolOBJ.currentEditing._m;
		toolOBJ.currentEditing._o.imgOBJ.left-=toolOBJ.currentEditing._w*toolOBJ.currentEditing._m;
		toolOBJ.currentEditing._o.imgOBJ.opacity = 1;
		toolOBJ.currentEditing._o.canvas.renderAll();
		toolOBJ.SavetoCanvas(toolOBJ.currentEditing._o.canvas.toDataURL("image/png"), toolOBJ.currentEditing._o._cellleft, toolOBJ.currentEditing._o._celltop);
	});

	$(".dcell:first").click();

	up='null@{"id":"64792c7c","sname":"g1.jpg","size":86336,"type":"image/jpeg","success":true,"url":"assets/uploads/images/source/g1.jpg","thumbnail_url":"assets/uploads/images/thumbnail/g1.png"}@{"id":"2b7c7f16","sname":"g2.jpg","size":88448,"type":"image/jpeg","success":true,"url":"assets/uploads/images/source/g2.jpg","thumbnail_url":"assets/uploads/images/thumbnail/g2.png"}@{"id":"32f6b5dc","sname":"g3.jpg","size":134500,"type":"image/jpeg","success":true,"url":"assets/uploads/images/source/g3.jpg","thumbnail_url":"assets/uploads/images/thumbnail/g3.png"}@{"id":"08cb96fa","sname":"g4.jpg","size":80203,"type":"image/jpeg","success":true,"url":"assets/uploads/images/source/g4.jpg","thumbnail_url":"assets/uploads/images/thumbnail/g4.png"}@{"id":"b8b95e36","sname":"g5.jpg","size":124751,"type":"image/jpeg","success":true,"url":"assets/uploads/images/source/g5.jpg","thumbnail_url":"assets/uploads/images/thumbnail/g5.png"}@{"id":"f7bc0d5c","sname":"g6.jpg","size":66960,"type":"image/jpeg","success":true,"url":"assets/uploads/images/source/g6.jpg","thumbnail_url":"assets/uploads/images/thumbnail/g6.png"}@{"id":"3710849b","sname":"g7.jpg","size":179377,"type":"image/jpeg","success":true,"url":"assets/uploads/images/source/g7.jpg","thumbnail_url":"assets/uploads/images/thumbnail/g7.png"}@{"id":"fced937e","sname":"g8.jpg","size":75371,"type":"image/jpeg","success":true,"url":"assets/uploads/images/source/g8.jpg","thumbnail_url":"assets/uploads/images/thumbnail/g8.png"}@{"id":"84ac129f","sname":"g9.jpg","size":84418,"type":"image/jpeg","success":true,"url":"assets/uploads/images/source/g9.jpg","thumbnail_url":"assets/uploads/images/thumbnail/g9.png"}@{"id":"08ded3fc","sname":"g10.jpg","size":41105,"type":"image/jpeg","success":true,"url":"assets/uploads/images/source/g10.jpg","thumbnail_url":"assets/uploads/images/thumbnail/g10.png"}@{"id":"7f6f9b3f","sname":"g11.jpg","size":89662,"type":"image/jpeg","success":true,"url":"assets/uploads/images/source/g11.jpg","thumbnail_url":"assets/uploads/images/thumbnail/g11.png"}@{"id":"8dd7876d","sname":"g12.jpg","size":183356,"type":"image/jpeg","success":true,"url":"assets/uploads/images/source/g12.jpg","thumbnail_url":"assets/uploads/images/thumbnail/g12.png"}';
	up = up.split("@");
	for(i=1;i<up.length;i++)
	{
		eval("var updt = "+up[i]);
		Addgallery("#cont-btn-uploads", updt.id, baseUrl+updt.url, baseUrl+updt.thumbnail_url);
	}
})
$(window).resize(function() {
	$("#wrapper").css("width",window.innerWidth);
	$("#wrapper").css("height",window.innerHeight);
	$("#left-content").css("width",window.innerWidth-401);
	$(".main").css("width",window.innerWidth-405);
	$(".main").css("height",window.innerHeight-101);
	$(".info").css("margin-top",(window.innerHeight/2)-250);
	$(".ptitle").css("font-size", $(".info").width()*0.18);
	$(".main-menu").css("height",window.innerHeight-260);
});
function applyEffect(eff){
	Imgnext= 0;
	Imgeff = eff;
	if(toolOBJ.listCell.length>0){
		Imgnext++;
		currentImgobj = toolOBJ.listCell[0];
		currentImgobj.effect = Imgeff;
		if(currentImgobj.originalSource==undefined)
			currentImgobj.originalSource = currentImgobj.imgOBJ._element.src;
		convertEffect(currentImgobj.item, currentImgobj.originalSource, Imgeff);
	}
}
function random(){
	maxImage = $(".menu-cont.active .tabphoto.active .photoout .photo").length;
	if(maxImage>0){
		maxImage--;
		$(".item").each(function(){
			var rn= Math.floor(Math.random() * (maxImage - 0 + 1)) + 0;
			var imgrn = $(".menu-cont.active .tabphoto.active .photoout .photo").eq(rn);
			toolOBJ.appendItem(null,$(imgrn).attr("src"),$(imgrn).attr("src"),this);
		})
	}
}
function reset(){
	toolOBJ.currentCanvasLayout._objects = [];
	toolOBJ.currentCanvasLayout.renderAll();
	$(".item").children().remove();
	toolOBJ.listCell = [];
}
var lcount=0,listItem=[];
function save(){
	lcount=0;
	listItem=[];
	for(var i=0; i<toolOBJ.listCell.length;i++){
		
		if(i<i<toolOBJ.listCell[i]._path!=0)
			toolOBJ.listCell[i]._path = i<toolOBJ.listCell[i]._path.dataArray;
		/*
		var scalex = $(this).width()/$(this)[0].naturalWidth;
		var scaley = $(this).height()/$(this)[0].naturalHeight;
		var scalez;
		if(scalex > scaley)
			scalez = scaley;
		else
			scalez =scalex;
		if(scalez > scalem)
			scalem =scalez;
		*/
		//console.log(pathz.dataArray);
		//return;
		listItem.push({
			//src : $(this).attr("src"),
			hsrc : toolOBJ.listCell[i]._hsrc,
			path : toolOBJ.listCell[i]._path.dataArray,
			eff : toolOBJ.listCell[i].effect,
			swidth: toolOBJ.listCell[i].canvas.width,
			sheight: toolOBJ.listCell[i].canvas.width,
			stop: toolOBJ.listCell[i].imgOBJ.top,
			sleft: toolOBJ.listCell[i].imgOBJ.left,
			top: toolOBJ.listCell[i]._celltop,
			left: toolOBJ.listCell[i]._cellleft,
			scale: toolOBJ.listCell[i].imgOBJ.scaleX
		})

		lcount++;
		if(lcount >= toolOBJ.listCell.length){
			var inf = {width : toolOBJ.currentCanvasLayout.width, height : toolOBJ.currentCanvasLayout.height, scalestd:3};
			datapreview = -1;
			callPreview();
			return;
			$.post(baseUrl+"index.php/designer"+"/renderx", {data: JSON.stringify(listItem), info: encodeURIComponent(JSON.stringify(inf)),cid: toolOBJ.currentCanvas, did: $(this).attr("data"), price: $(this).attr("price"), order: -1, preview: datapreview}, function(data){
				if(data=="error"){
					console.log(data);
					alert( "Error in saving progress!!! please try again", "icon-remove-circle");
				}
				else{
					eval("data="+data);
					console.log(data);
				}
			})
		}
	}
}
function callPreview(){
	$(".frog").show();
	$(".ctrpanel").hide();
	$(".process_bar").hide();
	$(".preimage").append('<img src="'+toolOBJ.currentCanvasLayout.toDataURL("image/png")+'">');
	$(".prewrap").fadeIn();
}
//---------------------------------------------------SOCIAL CONNECT-----------------------------------------------
//FACEBOOK - CONNECT
window.fbAsyncInit = function() {
    // init the FB JS SDK
    FB.init({
      appId      : FacebookAppId,                        // App ID from the app dashboard
      channelUrl : FacebookAppLink, // Channel file for x-domain comms
      status     : true,                                 // Check Facebook Login status
      cookie     : true, // enable cookies to allow the server to access the session
      xfbml      : true                                  // Look for social plugins on the page
    });
/*
    FB.getLoginStatus(function(response) {
	    if (response.status == 'connected') {
	        FB.api('/'+response.authResponse.userID, function(response) {
		        FB.api('/me/albums', function(resalbum){
			   		for(var i=0; i<resalbum.data.length; i++)
			   			;
			   			//FB_albums(resalbum.data[i].name, resalbum.data[i].id);
			   })
		    });
		    
	    } else if (response.status == 'not_authorized') {
	        //FB_login();
	    } else {
	        //FB_login();
	    }
	});
*/
};
function FB_login(){
	FB.login(function(response) {
		$(".faceavata").css("background-image",'url("http://graph.facebook.com/'+response.authResponse.userID+'/picture?type=small")');
		console.log(response);
		fbOBJ = [];
	    FB.api('/me/albums', function(resalbum){
	   		fbOBJ[0] = resalbum;
	   		$("#cont-btn-facebook .tablogin").fadeOut(100);
	   		$("#cont-btn-facebook .tabalbum").fadeIn(150);
	   		$(".btnalbum").show();
   			for(var i=0; i<resalbum.data.length; i++){
   				FB_albums(resalbum.data[i].name, resalbum.data[i].id);
   				$("#cont-btn-facebook .tabalbum").append('<div class="col6 ablitem"><div data="'+resalbum.data[i].id+'" id="alb'+resalbum.data[i].id+'" class="album"><div class="albthumb"></div></div><p class="ablname">'+resalbum.data[i].name+'</p></div></div>');
   			}
	   })
	    FB.api('/'+response.authResponse.userID+'/photos', function(albums2){
	   		fbOBJ[1] = albums2;
	    })
	    FB.api('/me/friends', function(friends_list){
	   		fbOBJ[2] = friends_list;
	   		FB_friends();
	    })
	}, {scope: 'email,read_stream,publish_stream,offline_access,user_photos,friends_photos,user_photo_video_tags,friends_photo_video_tags'});
}
function INS_login(){
		window.open("https://instagram.com/oauth/authorize/?client_id="+InstaAppId+"&redirect_uri="+baseUrl+"index.php/instagram&response_type=code", 'popUpWindow', "width=450, height=300");
}
function INS_albums(ins){
	//console.log(ins)
	$("#cont-btn-instagram .tablogin").fadeOut(100);
	$("#cont-btn-instagram .tabalbum").fadeIn(150);
	$(".btnalbum").show();
	$("#cont-btn-instagram .tabphoto").addClass("active");
	$.ajax({
        type: "GET",
        dataType: "jsonp",
        cache: false,
        url: "https://api.instagram.com/v1/users/"+ins.user.id+"/media/recent/?access_token="+ins.access_token,
        success: function(data) {
        	for(var i=0; i< data.data.length; i++)
        		Addgallery("#cont-btn-instagram", data.data[i].created_time, data.data[i].images.standard_resolution.url, data.data[i].images.thumbnail.url);
        }
    });
}
function FB_albums(name, id){
	FB.api("/"+id+"/photos",function(response){
		for(var i=0; i<response.data.length; i++){
			for(var j=0; j< response.data[i].images.length; j++){
				$("#alb"+id+" .albthumb").attr("style","background:url("+response.data[i].picture+") center no-repeat;background-size: 130%;");
				$("#alb"+id).click(function(){callAlbum(this)});
				break;
			}
			break;
		}
	})
}
function callAlbum(e){
	$("#cont-btn-facebook .switchalbum .btnalbum").hide();
	$("#cont-btn-facebook .switchalbum .backalbum").show();
	$("#cont-btn-facebook .tabdetail").removeClass("active");
	$("#cont-btn-facebook .tabphoto").addClass("active");
	$("#cont-btn-facebook .tabphoto .photoout .photo").remove();
	FB.api("/"+$(e).attr("data")+"/photos",function(response){
		console.log(response);
		for(var i=0; i<response.data.length; i++){
			for(var j=0; j< response.data[i].images.length; j++){
				if(response.data[i].images[j].height < (response.data[i].height/2)|| response.data[i].images[j].width < (response.data[i].width/2)){
					Addgallery("#cont-btn-facebook",response.data[i].id, response.data[i].source, response.data[i].images[j].source.split("https").join("http"));
					break;
				}
			}
		}

    			//if(response.data[i].images[j].height < (response.data[i].height/2)|| response.data[i].images[j].width < (response.data[i].width/2)){
					//Addgallery(response.data[i].id, name, response.data[i].picture, response.data[i].images[j].source.split("https").join("http"), response.data[i].source.split("https").join("http"));
					//break;
				//}

	})
}
function Addgallery(tab,id,src,pic){
	$(tab+" .tabphoto .photoout").append('<div src="'+src+'" id="image'+id+'" class="photo" style="background-image:url('+pic+')"></div>')
	$("#image"+id).draggable({ revert: true, helper: "clone",
		start: function() {
	        //$(".item").addClass("item_hover");
	      },
        stop: function() {
	        //$(".item").removeClass("item_hover");
	      } 
	});
}
function FB_friends(){
	for(var i=0; i<fbOBJ[2].data.length;i++){
		$("#cont-btn-facebook .tabuser").append('<div class="usercell"><div class="userlist"><div class="righticon"></div><div style="background-image:url(\'http://graph.facebook.com/'+fbOBJ[2].data[i].id+'/picture?type=normal\')" class="avata"></div><a>'+fbOBJ[2].data[i].name+'</a></div></div>');
		//http://graph.facebook.com/username/picture
	}
}
//-----------------------------load facebook library-------------------------------
(function(d, s, id){
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/all.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));