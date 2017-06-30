(function(win){
	var doc=win.document;
	function YX(){
		this.version='1.0.0';
		this.create='2017-06-28';
		this.author='gavin';
	};

	YX.prototype={
		constructor:YX,

		/* 功能：图片轮播组件
		** 根据提供图片地址数组，生成组件并插入到给定dom节点中
		**
		** @param    {string}  dom       DOM节点ID
		** @param    {array}   imgarr    图片数组
		** @param    {number}  speed     轮播间隔时间
		** @returns  void
		**
		** @date     2017-06-29
		** @author   Gavin
		*/
		carouselBanner:function(dom,imgarr,speed){
			var that=this;
			var dombox=doc.getElementById(dom);
			var piclist=doc.createElement("ul");//创建图片列表
			var controllist=doc.createElement("div");//创建控制图片列表
			piclist.className="piclist";
			controllist.className="control";
			var pichtmlstr='',conhtmlstr='';
			that.loadImgArr(imgarr,function(){//图片加载完成再插入dom与绑定事件
				dombox.style.background="#eee";
				imgarr.forEach(function(v,k){
					pichtmlstr+='<li class="item'+(k===0?' curr':'')+'" style="background-image:url('+v+')"></li>'
					conhtmlstr+='<a href="javascript:;"'+(k===0?' class="hover"':'')+'></a>'
				});
				piclist.innerHTML=pichtmlstr;
				controllist.innerHTML=conhtmlstr;
	        	dombox.appendChild(piclist);
	        	dombox.appendChild(controllist);
	        	
	        	var curr=0;
	        	var imgli=piclist.getElementsByTagName("li")
	        	var dotli=controllist.getElementsByTagName("a")
	        	var dotlen=dotli.length;
	        	var timer=setTimeout(function(){changepic(curr,true)},speed)
	        	function changepic(n,auto){ //切换图片函数
	        		if(n>=dotlen-1){n=0;}else{n++;}
	        		curr=n;
	        		for(var j=0;j<dotlen;j++){dotli[j].className="";imgli[j].style.opacity=0;}
	        		dotli[n].className="hover";
	        		imgli[n].style.opacity=1;
	        		if(auto){timer=setTimeout(function(){changepic(n,true)},speed); }
	        	}
	        	for(var i = 0; i < dotlen; i++){
	        		dotli[i].index=i;
	        		dotli[i].onclick = function() {curr = this.index;changepic(curr-1,false)};
	        		dotli[i].onmouseover = function(){clearTimeout(timer)};
	        		dotli[i].onmouseout = function(){timer=setTimeout(function(){changepic(curr,true)},speed)};
	        	}
	        	
			})

        	//增加样式
        	that.addNewStyle('carouselBannerCss','.banner .piclist .item { position: absolute; top: 0; left: 0; width: 100%; height: 400px; opacity: 0; background-repeat:no-repeat; background-position:center; -webkit-transition: opacity .5s; transition: opacity .5s; }.banner .piclist .curr { opacity: 1; }.banner .control { position: absolute; bottom: 20px; left: 50%; width: 200px; margin-left: -100px; height: 10px; line-height: 10px; text-align: center; z-index: 99; }.banner .control a { display: inline-block; width: 10px; height: 10px; border-radius: 10px; background: #999; margin: 0 10px; -webkit-transform: scale(0.8, 0.8); transform: scale(0.8, 0.8); }.banner .control a.hover, .banner .control a:hover { background: #f90; -webkit-transform: scale(1, 1); transform: scale(1, 1); }');
        	
        	
		},

		/* 功能：新建页面内联样式
		** 将参数css字符串，插入到head的style标签中
		**
		** @param    {string}  id         style标示ID
		** @param    {string}  styleStr   css字符串
		** @returns  void
		**
		** @date     2017-06-29
		** @author   Gavin
		*/
		addNewStyle:function(id,styleStr) {
			var styleElement = document.getElementById(id);
            if (!styleElement) {
                styleElement = document.createElement('style');
                styleElement.type = 'text/css';
                styleElement.id = id;
                document.getElementsByTagName('head')[0].appendChild(styleElement);
            }       
		    styleElement.appendChild(document.createTextNode(styleStr));
		},

		/* 功能：JS加载图片组
		** JS动态加载图片组，全部完成后执行回调函数
		**
		** @param    {array}     imgarr     图片组(以图片地址为字符串成员的数组)
		** @param    {function}  callback   回调函数
		** @returns  void
		**
		** @date     2017-06-29
		** @author   Gavin
		*/
		loadImgArr:function(imgarr,callback){
			var len=imgarr.length;
			var count=0;
			var tempimg=[];
			imgarr.forEach(function(v,k){
				tempimg[k]=new Image();
				tempimg[k].src=v;
				tempimg[k].onload=function(){
					count++;//console.log(k+"加载完成<br/>"+new Date().getTime());
					if(count===len){callback();}
				}
			})
		}

		
	}

	//创建对象并绑定到window对象，供外部调用
	win.$YX=new YX();
}(typeof window !=="undefined" ? window : this ))//如果有window对象传window对象，否则传当前全局对象


