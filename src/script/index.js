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

//Gavin组件库
/*(function(win){
	function Gavin(){};

	Gavin.prototype={
		constructor:Gavin,

		//banner图片轮播组件
		carousel:function(ele){
			console.log(ele)
		}
	}


	win.$g=new Gavin();
	
}(typeof window !=="undefined" ? window : this ))//如果有window对象传window对象，否则传当前全局对象

$g.carousel("abc"); */
