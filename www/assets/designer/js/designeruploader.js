$(function(){
	var error_on_uploading = guilang['uploadimage'];
	$('#userfilex').each(function(){
		var unique_id 	= $(this).attr('id');
		var uploader_url = uploadUrl;
		var uploader_element = $(this);
		
		$(this).fileupload({
	        dataType: 'json',
	        url: uploader_url,
	        cache: false,
	        limitMultiFileUploads: 1,
	        maxFileSize: 5000,
	        autoUpload: true,
	        //acceptFileTypes:  'jpb',
			//beforeSend: function(){$("#uploadProgressBar").progressbar({value:0});},			
			send: function (e, data) {						
				var errors = '';
			    if (data.files.length > 1) {
			    	errors += error_max_number_of_files + "\n" ;
			    }
			    
			    
	            $.each(data.files,function(index, file){
	            	var file_name = file.name;
		            $("#uploadFileName").text(file_name);
	            });	
	            
	            if(errors != '')
	            {
	            	alert(errors);
	            	return false;
	            }
				
			    return true;
			},
	        done: function (e, data) {
	        	var oldvalue = $.cookie('upload');
	        	$.cookie('upload',oldvalue+"@"+JSON.stringify(data.result.controllers), { expires: 2 });
				if(data.result.controllers.success == true)
				{	
					Addgallery("#cont-btn-uploads",data.result.controllers.id, baseUrl+data.result.controllers.url, baseUrl+data.result.controllers.thumbnail_url);
				}
				
				else if(typeof data.result.errormessage != 'undefined')
				{
					alertMessage(data.result.errormessage);
				}
				else
				{
					alertMessage(error_on_uploading);
				}
	        },
	        
	        error: function()
	        {
	        	alert(error_on_uploading);
			},
	        fail: function(e, data)
	        {
	        	alert(error_on_uploading);
	        },	        
	        //progress: function (e, data) {$("#uploadProgressBar").progressbar({value:parseInt(data.loaded / data.total * 100, 10)});}	
	        progress: function (e, data) { $(".uploadstat").html(parseInt(data.loaded / data.total * 100)+" %") }	        
	    }); 
	    
	});
	//$("#uploadProgressBar").progressbar({max:100,value:0});
});