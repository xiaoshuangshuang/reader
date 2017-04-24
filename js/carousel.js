;(function($){
	alert("333")
	var Carousel = function(option){
		var defaultOption = {
			"trigger":"click",
			"effect":"fade",
			"invoke":"1",
			"autoCarousel":true,
			"autoCarouselTime":3000
		}
		this.option = defaultOption;
		this.config =option;
		$.extend(this.config,this.option);
		this.el = $('.carousel-item');
		if(this.config.trigger === "swipeLeft"){
			this.el.on(this.config.trigger,function(){
				alert("swipeLeft")
			})
		}
		
	};
	Carousel.prototype={
		//获取配置参数
		getConfig: function(){
			var objKey=[];
			if(this.config && this.config !=""){
				for(var key in this.config){
					objKey.push(key);
				}
				console.log(objKey);
				for(var key in this.option){
					for(var item in objKey){
						if(key!== objKey[item] || this.config[key]==""){
							this.config[key] = this.option[key];
						}
						/*console.log("item:"+objKey[item]);
						addKey=objKey[item];
						if(!this.config[addKey] && this.config[addKey]!=""){
							this.config[addKey] = this.option[addKey];
						}*/
					}
				}
				return this.config
			}
		}
	}
	window.Carousel = Carousel;
})(Zepto);
