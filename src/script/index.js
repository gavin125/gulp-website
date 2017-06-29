(function($){
	var count=0;
	var l=$(".piclist .item").length-1;
	var timer=setTimeout(function(){changepic()},5000)
	function changepic(){
		if(count===l){count=0;}else{count++;}
		$(".piclist li").eq(count).addClass("curr").siblings().removeClass("curr");
		$(".control a").eq(count).addClass("hover").siblings().removeClass("hover");
		timer=setTimeout(function(){changepic()},5000)
	}
	$(".control a").hover(function(){clearTimeout(timer)},function(){ timer=setTimeout(function(){changepic()},5000)}).on('click',function(){
		count=$(this).index();
		$(".piclist li").eq(count).addClass("curr").siblings().removeClass("curr");
		$(".control a").eq(count).addClass("hover").siblings().removeClass("hover");
	})
	
}(jQuery))
 
