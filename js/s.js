var imageInfo = function() {
	this.layout = "layout1";
	this.imageType ="selected"; /* Selected - Uploaded */
	this.imageSelected = "001";			

	//Info legenda base
	this.fontBaseLegend = "Arial, Helvetica";
	this.sizeFontBaseLegend = "32px";
	this.colorFontBaseLegend = "#ffffff";
	this.colorBackgroundBaseLegend = "#000000";

	//Info legenda top
	this.fontTopLegend = "Arial, Helvetica";
	this.sizeFontTopLegend = "32px";
	this.colorFontTopLegend = "#ffffff";			
	this.colorBackgroundTopLegend = "#000000";

	//Info crop
	this.cropTop = 0;
	this.cropLeft = 0;
	this.cropBottom = 0;
	this.cropRight = 0;

	this.changeLayout = function  (layout){
		this.layout = layout;
	};

	this.configImageType = function  (imageType, imageSelected){
		this.imageType = imageType;
		this.imageSelected = imageSelected;
	};

	this.configLegend = function (font, size, color, background, type){
		if (type == "base") {
			this.fontBaseLegend = font;
			this.sizeFontBaseLegend = size;
			this.colorFontBaseLegend = color;
			this.colorBackgroundBaseLegend = background;
		} else {
			// type == 'top'
			this.fontTopLegend = font;
			this.sizeFontTopLegend = size;
			this.colorFontTopLegend = color;			
			this.colorBackgroundTopLegend = background;
		};
	};

	this.cropImage = function(top, right, bottom, left){
		this.cropTop = top;
		this.cropLeft = right;
		this.cropBottom = bottom;
		this.cropRight = left;
	};
};
var newImage = new imageInfo();

function createSecondLegend() {
	var secondLegend = $('.legendContainer').clone();
	secondLegend.find('.btnFormatLegend').attr('id', '#btnFormatLegendSecond');
	secondLegend.find('.labelMainLegend span').text('Legenda superior');
	$(secondLegend).attr('id', 'secondLegendContainer').insertAfter('#firstLegendContainer')
};


$('.btnFormatLegend').live("click", function(event){
	$(this).slideUp(function(){
		$(this).siblings('.formatLegend').slideDown();
		$('.colourPickerFont select, .colourPickerBackground select').colourPicker({
		    ico:    'img/colourPicker.gif', 
		    title:    false
		});
	});
});

function changeLayout(layout) {
	newImage.changeLayout(layout);
	$('.selectLayout li').removeClass('btn-primary');
	$('.selectLayout li[ref="'+ layout +'"]').addClass('btn-primary');
	$('.mainPicture').fadeOut(200, function(){
		switch(layout) {
		case "layout1": //Tarja bottom  
		  $('.firstLegend, #firstLegendContainer').show()
		  $('.secondLegend, #secondLegendContainer').hide();
		  $('.backgroundColourPicker').show();
		  $('.firstLegend').css({	  		
		      'position' : 'relative',
		      'top' : 'auto',
		      'bottom' : 'auto',
		      'left' : 'auto',
		      'right' : 'auto',
		      'background' : newImage.colorBackgroundBaseLegend
		  });
		  break;
		case "layout2": //tarja top
		  $('.firstLegend, #firstLegendContainer').hide();
		  $('.secondLegend, #secondLegendContainer').show();
		  $('.backgroundColourPicker').show();
		  $('.secondLegend').css({	  		
		      'position' : 'relative',
		      'top' : 'auto',
		      'bottom' : 'auto',
		      'left' : 'auto',
		      'right' : 'auto',
		      'background' : newImage.colorBackgroundTopLegend
		  });
		  break;
		case "layout3": //tarja bottom - top
		  $('.firstLegend, #firstLegendContainer').show();
		  $('.secondLegend, #secondLegendContainer').show();
		  $('.backgroundColourPicker').show();
		  $('.secondLegend, .firstLegend').css({	  		
		      'position' : 'relative',
		      'top' : 'auto',
		      'bottom' : 'auto',
		      'left' : 'auto',
		      'right' : 'auto',
		      'background' : newImage.colorBackgroundBaseLegend
		  });
		  $('.secondLegend').css({'background' : newImage.colorBackgroundTopLegend});	
		  break;
		case "layout4": //bottom
		  $('.firstLegend, #firstLegendContainer').show()
		  $('.secondLegend, #secondLegendContainer').hide();
		  $('.backgroundColourPicker').hide();
		  $('.firstLegend').css({	  		
		      'position' : 'absolute',
		      'top' : 'auto',
		      'bottom' : '0',
		      'left' : '0',
		      'right' : '0',
		      'background' : 'none',
		      'z-index' : '3'
		  });
		  break;
		case "layout5"://top
		  $('.firstLegend, #firstLegendContainer').hide()
		  $('.secondLegend, #secondLegendContainer').show();
		  $('.backgroundColourPicker').hide();
		  $('.secondLegend').css({	  		
		      'position' : 'absolute',
		      'top' : '0',
		      'bottom' : 'auto',
		      'left' : '0',
		      'right' : '0',
		      'background' : 'none',
		      'z-index' : '3'
		  });
		  break;
		case "layout6":
		  $('.firstLegend, #firstLegendContainer').show()
		  $('.secondLegend, #secondLegendContainer').show();
		  $('.backgroundColourPicker').hide();
		  $('.secondLegend, .firstLegend').css({	  		
		      'position' : 'absolute',
		      'top' : 'auto',
		      'bottom' : '0',
		      'left' : '0',
		      'right' : '0',
		      'background' : 'none',
		      'z-index' : '3'
		  });
		  $('.secondLegend').css({'top' : '0', 'bottom' : 'auto'});
		  break;
		default:
		  //
		}
	});
	$('.mainPicture').fadeIn(200);
};

function formatLegend () {
	console.log('Format Legend');
	var fontBaseLegend = $('#firstLegendContainer .selectFont').val(),
	sizeFontBaseLegend = $('#firstLegendContainer .sizeFont').val(),
	colorFontBaseLegend = $('#firstLegendContainer .colourPickerFont input').val(),
	colorBackgroundBaseLegend = $('#firstLegendContainer .colourPickerBackground input').val(),

	fontTopLegend = $('#secondLegendContainer .selectFont').val(),
	sizeFontTopLegend = $('#secondLegendContainer .sizeFont').val(),
	colorFontTopLegend = $('#secondLegendContainer .colourPickerFont input').val(),
	colorBackgroundTopLegend = $('#secondLegendContainer .colourPickerBackground input').val();

	fontBaseLegend = updateFont(fontBaseLegend);
	fontTopLegend = updateFont(fontTopLegend);

	sizeFontBaseLegend = updateFontSize(sizeFontBaseLegend);
	sizeFontTopLegend = updateFontSize(sizeFontTopLegend);

	colorFontBaseLegend = "#"+colorFontBaseLegend;
	colorFontTopLegend = "#"+colorFontTopLegend;

	colorBackgroundBaseLegend = "#"+colorBackgroundBaseLegend;
	colorBackgroundTopLegend = "#"+colorBackgroundTopLegend;

	newImage.configLegend( 
		fontBaseLegend, 
		sizeFontBaseLegend,  
		colorFontBaseLegend,
		colorBackgroundBaseLegend,
		"base"
	);

	newImage.configLegend( 
		fontTopLegend, 
		sizeFontTopLegend,  
		colorFontTopLegend,
		colorBackgroundTopLegend,
		"top"
	);

	$('.firstLegend').css({
		'font-family' : newImage.fontBaseLegend,
		'font-size' : newImage.sizeFontBaseLegend,
		'color' : newImage.colorFontBaseLegend,
		'background' : newImage.colorBackgroundBaseLegend
	});

	$('.secondLegend').css({
		'font-family' : newImage.fontTopLegend,
		'font-size' : newImage.sizeFontTopLegend,
		'color' : newImage.colorFontTopLegend,
		'background' : newImage.colorBackgroundTopLegend
	});

	function updateFont (selectedFont) {
		var formatedFont = "Arial";
		switch(selectedFont) {
			case "Arial": 
			  formatedFont = "Arial";
			  break;		
			case "Georgia":  
			  formatedFont = "Georgia";
			  break;		
			case "Times":
			  formatedFont = "Times New Roman";
			  break;		
			case "Comic Sans":  
			  formatedFont = "Comic Sans MS";
			  break;
			default : 
			  formatedFont = "Arial";
		};
		return formatedFont;
	};

	function updateFontSize (selectedFontSize) {
		var formatedFontSize = "Grande";
		switch(selectedFontSize) {
			case "Pequeno": 
			  formatedFontSize = "16px";
			  break;		
			case "Médio":  
			  formatedFontSize = "22px";
			  break;		
			case "Grande":
			  formatedFontSize = "32px";
			  break;		
			case "Gigante":  
			  formatedFontSize = "48px";
			  break;
			default :
			  formatedFontSize = "32px";
		};
		return formatedFontSize;
	};
	
};


$(document).ready(function(){
	createSecondLegend();

	$('.selectLayout li').click(function(){
		changeLayout($(this).attr('ref'));
	});
	$('#firstLegendContainer .legendField').keydown(function(){
		if ($(this).val() != "") {
			$('.firstLegend').text($(this).val());
		}
	});

	$('#secondLegendContainer .legendField').keydown(function(){
		if ($(this).val() != "") {
			$('.secondLegend').text($(this).val());
		}
	});

	$('.selectFont, .sizeFont, .colourPickerFont input, input.colorField').change(function(){
		formatLegend();
	});

	$('#containerSelectPic').modal();

});