// $('.right-sidebar .demo-choose-skin li').on('click', function () {
//	 
// });
$(document).ready(function(){
	//sub menu slide show
    $('.ml-menu-section').on('click',function(){
    	$('.db-menu li').removeClass("active");
    	$(this).addClass("active");
    	$('.ml-menu').slideToggle();
    });
    $('.db-menu li').on('click',function(){	
    	if(!$(this).parent().attr('class')){
    		if($(this).index()===0){
    			$(".ml-menu li").children('a').children('span').removeClass("glyphicon glyphicon-triangle-right");
    			$('.ml-menu').slideUp();
    		}
    		$('.db-menu li').removeClass("active");
        	$(this).addClass("active");
    	}
    });
    
    $('.ml-menu li').on('click',function(){
    	$(".ml-menu li").children('a').children('span').removeClass("glyphicon glyphicon-triangle-right")
    	$(this).children('a').children('span').addClass("glyphicon glyphicon-triangle-right")
    });
});