function layoutOBJ(dt, ef, e, i) {
	var obj = new Object();
	obj.id = i;
	obj.data = JSON.parse(dt);
	obj.filter = ef;
	obj.list4rand = [];
	obj.domName = e;
	obj.element = $(e);
	obj.render = function(){
		e = this.data;
		console.log(e);
		this.list4rand = [];
		for(var i = 0; i < this.data.length; i++){
			if(e[i].t != undefined){
				this.element.append('<div id="item'+i+'_'+this.id+'" class="item text'+e[i].ps+'" effect="none" path="-1" type="text" content="'+e[i].ct+'" config="'+e[i].cf+'"></div>');
				$("#item"+i+'_'+this.id).css({width: e[i].b[2], height: e[i].b[3], top: e[i].b[0], left: e[i].b[1]});
				toolOBJ.appendCell("item"+i+'_'+this.id);
				/*
				var txtcanvas = $("#rtext");
				// initialize the canvas
				txtcanvas.width(e[i].b[2]*toolOBJ.scale);
				txtcanvas.height(e[i].b[3]*toolOBJ.scale);
				txtcanvas.attr("width",e[i].b[2]*toolOBJ.scale);
				txtcanvas.attr("height",e[i].b[3]*toolOBJ.scale);
				toolOBJ.txtcv = new fabric.Canvas("rtext");
				*/
				continue;
			}
			var clippoint=-1;
			if(e[i].p!=-1)
				for(var j = 0;j< clips.length; j++)
					if(clips[j].id == e[i].p)
						{clippoint = j;break;}
			this.element.append('<div id="item'+i+'_'+this.id+'" class="item" effect="none" path="-1" type="img"></div>');
			$("#item"+i+'_'+this.id).css({width: e[i].b[2], height: e[i].b[3], top: e[i].b[0], left: e[i].b[1]});
			$("#item"+i+'_'+this.id).attr("path",clippoint);
			this.list4rand.push(i);
			$('#item'+i+'_'+this.id).droppable({
		      drop: function( event, ui ) {
		      	toolOBJ.appendItem(event, $(ui.draggable).attr("src"), $(ui.draggable).attr("src"), this);
		      }
		    });
			$('#item'+i+'_'+this.id).click(function(){
				if(navigator.appVersion.toLowerCase().indexOf("android")!=-1 || navigator.appVersion.toLowerCase().indexOf("ipad")!=-1){
					$(this).dblclick();
				}
			})
    	    $('#item'+i+'_'+this.id).dblclick(function(){
		    	if($(this).html() != ""){
		    		if(navigator.appVersion.toLowerCase().indexOf("android")!=-1 || navigator.appVersion.toLowerCase().indexOf("ipad")!=-1)
		    			var sizectr = 30;
		    		else var sizectr = 14;
		    		$('.frog').show();
		    		$('#fcanvas').fadeIn();
		    		widthctr = $(this).width();
		    		heightctr = $(this).height();
		    		if(widthctr<60)
		    			scalectr = 5;
		    		else if(widthctr<100)
		    			scalectr = 3;
		    		else
		    			scalectr = 3;
		    		movectr = parseInt(scalectr/2);
		    		p1 = $(this).parent().position();
		    		p2 = $(this).position();
		    		p3 = $(".design").position();

		    		$('.ctrpanel').css({top: p3.top, left: p3.left+($(".design").width()/2)-96});

		    		//console.log(sizectr);
					//console.log(p3);

		    		$('#fcanvas').html("");
		    		$('#fcanvas').css({height: heightctr*scalectr, width: widthctr*scalectr, top: p1.top+p2.top-heightctr*movectr, left: parseFloat($(this).parent().css("margin-left"))+p1.left+p2.left-widthctr*movectr})
		    		$('#fcanvas').append('<canvas id="ctrcanvas" height="'+heightctr*scalectr+'" width="'+widthctr*scalectr+'"></canvas>');
		    		ctrcanvas = new fabric.Canvas("ctrcanvas");
		    		ctrcanvas.on('mouse:down', function(options) {
					  //console.log(options.e.clientX, options.e.clientY);
					  ctrcanvas._objects[1].active = true;
					});
					ctrcanvas.on('object:moving', function(e) {
					  var aO = e.target;
					  if(aO==undefined)
					  	return;
					  var aB = [aO.top-aO.height/2, aO.left-aO.width/2, aO.top+aO.height/2, aO.left+aO.width/2];
					  //if(toolOBJ.checkBound(aB,aO.bound)==false)
					  	//return;
					  //console.log(aO);
					});
		    		for(i=0;i<toolOBJ.listCell.length;i++)
		    			if(toolOBJ.listCell[i].item==$(this).attr("id")){
		    				toolOBJ.currentEditing = {_m:movectr,_w:widthctr,_h:heightctr,_o:toolOBJ.listCell[i]};
		    				toolOBJ.listCell[i].imgOBJ.active = true;
		    				toolOBJ.listCell[i].imgOBJ.top+=heightctr*movectr;
		    				toolOBJ.listCell[i].imgOBJ.left+=widthctr*movectr;
		    				toolOBJ.listCell[i].imgOBJ.opacity = 0.7;
		    				toolOBJ.listCell[i].imgOBJ.cornerSize = sizectr;
		    				var rect1 = new fabric.Rect({
		    					originX: "left",
		    					originY: "top",
		    					top: heightctr*movectr-2,
		    					left: widthctr*movectr-2,
							    width: widthctr+4,
							    height: heightctr+4,
							    fill: "rgba(255,255,255,0.1)",
							    stroke: '#f00',
							    opacity: 1,
							    hasRotatingPoint:false,hasControls:false,hasBorders:false,selectable: false
							});
							var rect2 = new fabric.Rect({
		    					originX: "left",
		    					originY: "top",
		    					top: heightctr*movectr,
		    					left: widthctr*movectr,
							    width: widthctr,
							    height: heightctr,
							    fill: "rgba(255,255,255,0.1)",
							    stroke: '#00f',
							    opacity: 1,
							    hasRotatingPoint:false,hasControls:false,hasBorders:false,selectable: false
							});
							console.log(widthctr*movectr);
							toolOBJ.listCell[i].imgOBJ.bound = [heightctr*movectr-2,  widthctr*movectr-2, heightctr*movectr+heightctr+2, widthctr*movectr+widthctr+2]
							ctrcanvas.add(rect1);
							//ctrcanvas.add(rect2);
							ctrcanvas.insertAt(toolOBJ.listCell[i].imgOBJ,0);
							ctrcanvas.bringToFront(toolOBJ.listCell[i].imgOBJ);
		   					ctrcanvas.renderAll();
		    			}
		    	}
			})
		}
	};
	return obj;
}
//---------------------------------Tool Obj---------------------------------
var loadingIcon = "http://loadinggif.com/images/image-selection/1.gif";//http://loadinggif.com/images/image-selection/6.gif
var imgLoading = new Image();
imgLoading.src = loadingIcon;
var toolOBJ = {
	listLayout : [],
	listCell : [],
	currentCanvas : 0,
	currentLayout : null,
	currentCell : 0,
	currentCanvasLayout : null,
	currentPosCell: [],
	currentSizeCell: [],
	currentEditing: null,
	cellText: null,
	arrayCanvasLayout : [],
	imgSource : [],
	padding : 10,
	mousePos : -1,
	isMove : -1,
	isScale : -1,
	scale : 3,
	appendCell : function(cell){
		this._appenditem("", "", cell, 2);
	},
	appendItem : function(events, src, ssrc, el){
		var _w = $(el).width();
	  	var _h = $(el).height();

	  	$(el).html("");														
	  	$(el).append('<img style="margin:'+(_h/2-5)+'px 0 0 '+(_h/2-5)+'px" src="'+loadingIcon+'" />');

	  	if(src.indexOf("data:image") != -1)
	  		this._appenditem(src,ssrc,$(el).attr("id"),1);
	  	else
		  	$.ajax({
				url: baseUrl+"index.php/camanproxy?camanProxyUrl=" + (encodeURIComponent(src)),
				type: "POST",
				parent: this
			}).done(function( data ) {
			    this.parent._appenditem(data,ssrc,$(el).attr("id"),1);
			});
	},
	_appenditem : function(data, src, ap, op){
		var rap = "#layout"+this.currentCanvas+" #"+ap;
		var _w = $(rap).width();
	  	var _h = $(rap).height();
		$(rap).html("");
		if(op == 1){
			$(rap).append('<div class="source '+ap+'"><img class="i'+this.currentCanvas+'" hsrc="'+src+'" src="'+data+'" style="opacity:0.4;" width="100%" height="100%"><div class="button_cmd lt '+ap+'"><i class="jcon"></i></div><div class="button_cmd lb '+ap+'"><i class="jcon"></i></div><div class="button_cmd rt '+ap+'"><i class="jcon"></i></div><div class="button_cmd rb '+ap+'"><i class="jcon"></i></div></div><div class="blurlayer '+ap+'"></div><div class="boundary '+ap+'"><canvas id="canvas'+ap+'"></canvas></div>');
			var idpt = parseInt($(rap).attr("path"));
		}
		else if(op == 2){
			$(rap).append('<div class="boundary '+ap+'"><canvas id="canvas'+ap+'"></canvas></div>');
		}
		var check_variable = -1;
		var idpt = parseInt($(rap).attr("path"));
		if(idpt!=-1)
			data_path = clips[idpt].data;
		else
			data_path = 0;
		for(var i=0;i<toolOBJ.listCell.length;i++)
			if(toolOBJ.listCell[i].item==ap){
				toolOBJ.listCell[i] = this.AppendCanvas(ap,'canvas'+ap, $(rap).position().top, $(rap).position().left, $(rap).width(), $(rap).height(), data, src, data_path, op);
				check_variable=1;
				break;
			}
		if(check_variable!=1)
			toolOBJ.listCell.push(this.AppendCanvas(ap,'canvas'+ap, $(rap).position().top, $(rap).position().left, $(rap).width(), $(rap).height(), data, src, data_path, op));
		else
			check_variable=-1;

		$(".source."+ap).hide();
		$(".blurlayer."+ap).hide();
		if(op != 2) $(".boundary."+ap).hide();

		$(".lt."+ap).bind("mousedown", function(e){ 
			toolOBJ.isMove *= -1;
			toolOBJ.mousePos = e;
			console.log(toolOBJ.isMove);
		})

		$(".lt."+ap).bind("mouseup", function(){
			//this.isMove = -1;
			;
		})

		$(".rt."+ap).bind("mousedown", function(e){
			toolOBJ.isScale *= -1;
			toolOBJ.currentCell.naturalscale = $(".source."+toolOBJ.currentCell.item+" > img")[0].naturalHeight / $(".source."+toolOBJ.currentCell.item+" > img")[0].naturalWidth;
			//Scaled = e;
			toolOBJ.currentCell.ccenter[0] = $(".blurlayer."+toolOBJ.currentCell.item).offset().left+$(".blurlayer."+toolOBJ.currentCell.item).width()/2;
			toolOBJ.currentCell.ccenter[1] = $(".blurlayer."+toolOBJ.currentCell.item).offset().top+$(".blurlayer."+toolOBJ.currentCell.item).height()/2;
			//console.log(current_center[0]+"/"+current_center[1]);
		})
		$(".rb."+ap).bind("click", function(){
			toolOBJ.currentCanvasLayout._objects=[];
			for(var i=0;i<toolOBJ.listCell.length;i++)
				if(toolOBJ.listCell[i].idc == toolOBJ.currentCanvas)
					toolOBJ.SavetoCanvas(toolOBJ.listCell[i].canvas.toDataURL("image/png"), toolOBJ.listCell[i]._cellleft, toolOBJ.listCell[i]._celltop);
			toolOBJ.currentCell = -1;
			$('.item').show();
			$(".source."+ap).fadeOut();
			$(".blurlayer."+ap).fadeOut();
			$(".boundary."+ap).fadeOut();
			$("#frog").fadeOut();
			$('.item').removeClass("lo_hover");
		    //current_area = -1;
			//checkDrag = 1;
			//$(".scalewarning").hide();
		})
		$(".lb."+ap).bind("click", function(){
			removeCell(this.currentCell.item);
			$('.item').show();
			$(".source."+ap).fadeOut();
			$(".blurlayer."+ap).fadeOut();
			$("#frog").fadeOut();
			$("#"+this.currentCell.item).html("");
			$('.item').removeClass("lo_hover");
		    current_area = -1;
			current_cell = -1;
			checkDrag = 1;
			$(".scalewarning").hide();
		})

		for(var i=0;i < this.imgSource.length;i++)
			if(this.imgSource[i].id == ap){
				this.imgSource[i].src = data;
				return;
			}
		this.imgSource.push({id:ap,src:data});
		//toolOBJ.listCell = this.listCell;
	},
	AppendCanvas: function(cell, canvaid, celltop, cellleft, cellwidth, cellheight, data, hsrc, clipdata, op){
		var objcell = new Object();
		var designerCanvas;
		objcell.idc = this.currentCanvas;
		objcell.item = cell;
		objcell.canvasid = canvaid;
		objcell._cellleft = cellleft;
		objcell._celltop = celltop;
		objcell._path = clipdata;
		objcell._hsrc = hsrc;
		objcell.effect = "none";
		var canvas = $("#"+canvaid);
		boundary = $(".boundary."+cell);
		designerWidth =boundary.width();
		designerHeight =boundary.height();
		// initialize the canvas
		canvas.width(cellwidth);
		canvas.height(cellheight);
		canvas.attr("width",cellwidth);
		canvas.attr("height",cellheight);
		if(clipdata=="0")
			designerCanvas = new fabric.Canvas(canvaid);
		else{
		    var pathx = new Kinetic.Path({
				data: clipdata
	          });
		    objcell._path = pathx;
			designerCanvas = new fabric.Canvas(canvaid, {
			  clipTo: function(ctx) {
		        pathx.ClipxFunc(ctx);
		      }
		  	});
		}
		objcell.canvas = designerCanvas;
		designerCanvas.selection = false;
		fabric.Image.fromURL(data, function(obj) {
			var w = obj.get('width');
			var h = obj.get('height');
			var expectW= designerCanvas.width+8;
			var expectH = designerCanvas.height+8;

			var scale = expectW / w;
			if(h*scale < expectH) scale = expectH / h;
			if(scale>2) scale = 2;
			var _top = boundary.position().top;
			var _left = boundary.position().left;
			if(objcell.mleft == undefined){
				
				objcell.mleft = -toolOBJ.padding-(w*scale-designerCanvas.width)/2;
				objcell.mtop = -toolOBJ.padding-(h*scale-designerCanvas.height)/2;
			}
			toolOBJ.updatesize(w*scale, h*scale, objcell);
			toolOBJ.updatepos(_left-toolOBJ.padding-(w*scale-designerCanvas.width)/2, _top-toolOBJ.padding-(h*scale-designerCanvas.height)/2, objcell);
			obj.scale(scale);
			obj.set({ left:designerCanvas.width/2, top: designerCanvas.height/2,hasRotatingPoint:false,hasControls:true,hasBorders:true,selectable: true,borderColor: 'gray',cornerColor: 'black',cornerSize: 14,transparentCorners: true});
			obj.lockUniScaling = true;
			//obj.lockRotation = obj.lockUniScaling = obj.lockMovementX = obj.lockMovementY = obj.lockScalingX = obj.lockScalingY = true;

		    objcell.imgOBJ = obj;
		    designerCanvas.insertAt(obj,0);
		    designerCanvas.renderAll();

		    toolOBJ.SavetoCanvas(designerCanvas.toDataURL("image/png") ,objcell._cellleft, objcell._celltop);
		})
		$("div.boundary1."+cell).mousedown(function(e){
			if(checkDbclick == 1){
				console.log(e);
				isMove = 1;
				Position = e;
			}
		})
		if(op == 2){
			toolOBJ.cellText = objcell;
		}
		//$('.waiting'+cell).remove();
		//$('#'+cell).append('<img class="waiting'+cell+'" style="display:none;z-index:99999;position:absolute;top:'+cellheight/2+'px;left:'+cellwidth/2+'px;" src="http://loadinggif.com/images/image-selection/6.gif" />');
		return objcell;
	},
	updatesize: function(_ew, _eh, _cc){
		$(".blurlayer."+_cc.item).css({width: _ew+"px" , height: _eh+"px"});
		$(".source."+_cc.item).css({width: _ew+"px" , height: _eh+"px"});
		$(".rt."+_cc.item).css("left", _ew+this.padding+5+"px");
		$(".lb."+_cc.item).css("top", _eh+this.padding+5+"px");
		$(".rb."+_cc.item).css({top: _eh+this.padding+7+"px", left: _ew+this.padding+7+"px"});
	},
	updatepos: function(_el, _et, _cc){
		$(".source."+_cc.item).css({top: _et+"px" , left: _el+"px"});
		$(".blurlayer."+_cc.item).css({top: _et+1+"px" , left: _el+1+"px"});
	},
	updatecanvas_size: function(_ew, _eh, _cc){
		_cc.imgOBJ.width = _ew;
		_cc.imgOBJ.height = _eh;
		_cc.imgOBJ.scale(1);
		_cc.canvas.renderAll();
	},
	updatecanvas_pos: function(_el, _et, _cc){
		_cc.imgOBJ.top += _et;
		_cc.imgOBJ.left += _el;
		_cc.canvas.renderAll();
	},
	SavetoCanvas: function(Fullimg, Fullleft, Fulltop){
		fabric.Image.fromURL(Fullimg, function(obj) {
			obj =  toolOBJ.filterSelect(obj,toolOBJ.currentLayout.filter);
			//console.log(obj);
			obj.applyFilters(toolOBJ.currentCanvasLayout.renderAll.bind(toolOBJ.currentCanvasLayout));
			var w = obj.get('width');
			var h = obj.get('height');
			obj.set({ left: Fullleft+w/2, top: Fulltop+h/2,hasControls:false,hasBorders:false});
			obj.lockRotation = obj.lockUniScaling = obj.lockMovementX = obj.lockMovementY = obj.lockScalingX = obj.lockScalingY = true;
			//console.log(obj);
			toolOBJ.currentCanvasLayout.insertAt(obj, 0);
			toolOBJ.currentCanvasLayout.renderAll();
			toolOBJ.currentCanvasLayout.bringToFront(obj);
		});
	},
	createLayoutCanvas: function(ldata, lwidth, lheight, i){
		tempcanvas = $("#l-temp-canvas"+i);
		var maincanvas = $("#lcanvas"+i);
		// initialize the canvas
		tempcanvas.width(lwidth);
		tempcanvas.height(lheight);
		tempcanvas.attr("width",lwidth);
		tempcanvas.attr("height",lheight);

		maincanvas.width(lwidth);
		maincanvas.height(lheight);
		maincanvas.attr("width",lwidth);
		maincanvas.attr("height",lheight);

		temp_canvas = new fabric.Canvas("l-temp-canvas"+i);
		if(ldata!=null){
			pathx = new Kinetic.Path({
		    	x: 0,
		      	y: 0,
		      	stroke: 'rgba(255,0,0,0.9)',
		      	strokeWidth : 5,
		        data: ldata
		      });
			var t_canvas_layout = new fabric.Canvas("lcanvas"+i,{
														clipTo: function(ctx) {
															        pathx.ClipxFunc(ctx);
															      }
															  }
													)
		}
		else
			var t_canvas_layout = new fabric.Canvas("lcanvas"+i);
		this.arrayCanvasLayout[i] = t_canvas_layout;
	    this.currentCanvasLayout = t_canvas_layout;
	},
	changeLayout: function(id){
		this.currentCanvas = id;
		//this.currentCanvasLayout = this.arrayCanvasLayout[id];
	},
	movingCell: function(dx, dy, e){
		var _top = $(".source."+this.currentCell.item).position().top;
		var _left = $(".source."+this.currentCell.item).position().left;
		var _width = $(".source."+this.currentCell.item).width();
		var _height = $(".source."+this.currentCell.item).height();
		if(this.checkSize(_top+dy+10, _left+dx+10, _width+_left+dx+10, _height+_top+dy+10)){
			this.updatecanvas_pos(dx, dy, this.currentCell);
			this.updatepos(_left+dx, _top+dy, this.currentCell);
			this.currentCell.mleft += dx;
			this.currentCell.mtop += dy;
		}
		this.mousePos = e;
	},
	scalingCell: function(dx, dy, _cc){
		var _width = $(".source."+_cc.item).width();
		var _height = $(".source."+_cc.item).height();
		var _cwidth = $(".boundary."+_cc.item).width();
		var _cheight = $(".boundary."+_cc.item).height();
		var _top = $(".source."+_cc.item).position().top;
		var _left = $(".source."+_cc.item).position().left;
		if(dx < dy){
			var dh = dx*_cc.naturalscale;
			var dw = dx;
		}
		else{
			dh = dy;
			dw = dh/_cc.naturalscale;
		}
		dh*=2;dw*=2;
		if(this.checkSize(10+_cc.mtop+(dh-_cc.ccenter[3])/-2, 10+_cc.mleft+(dw-_cc.ccenter[2])/-2, 10+_left+dw, 10+_top+dh )){
			this.updatesize(dw, dh, _cc);
			this.updatepos(_cc.mleft+(dw-_cc.ccenter[2])/-2, _cc.mtop+(dh-_cc.ccenter[3])/-2, _cc);
			this.updatecanvas_size(dw, dh, _cc);
		}
	},
	checkSize: function(top, left, right, bottom){
		if(left > this.currentPosCell[0])
			return false;
		if(top > this.currentPosCell[1])
			return false;
		if(right < (this.currentPosCell[0]+this.currentSizeCell[0]))
			return false;
		if(bottom < (this.currentPosCell[1]+this.currentSizeCell[1]))
			return false;
		return true;
	},
	//sb - source boundary [top, left, bottom ,right]
	//db - destination boundary [top, left, bottom ,right]
	//check 4 postion and limit it's out range
	checkBoundX: function(sb,db){
		if(sb[1]>db[1] || sb[3]<db[3])
			return false;
		else
			return true;
	},
	checkBoundY: function(sb,db){
		console.log(sb)
		console.log(db)
		if(sb[0]>db[0] || sb[2]<db[2])
			return false;
		else
			return true;
	},
	filterSelect: function(img, filt){
		switch (filt)
		{
			case "gray":
			  img.filters.push(new fabric.Image.filters.Grayscale());
			  return img;
			case "sepia":
			  img.filters.push(new fabric.Image.filters.Sepia());
			  return img;
			case "sepia2":
			  img.filters.push(new fabric.Image.filters.Sepia2());
			  return img; 
			case "none":
			  return img;
		}
	}
}

//---------------------------------Canvas Obj ------------------------------
var varOBJ = {
	oldX: 0,
	oldY: 0,
	movX: 0,
	movY: 0,
	fixX:null,
	fixY:null,
	acpSx:0,
	acpSy:0,
}
var canvasOBJ = {
	name : null,

}