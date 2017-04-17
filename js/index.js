var myScroll;
$(function(){
	
})
window.vm = new Vue({
	el:'#root',//app元素中所有的元素都能被vue操控
	data:{
		show:true,
		hotBookList:{
			title:"",
			data:[],
			dataCount:0
		},
		recommand:{
			title:"",
			data:[],
			dataCount:0
		},
		girl:{
			title:"",
			data:[],
			dataCount:0
		},
		boy:{
			title:"",
			data:[],
			dataCount:0
		},
		free:{
			title:"",
			data:[],
			dataCount:0
		},
		special:{
			title:"",
			data:[],
			dataCount:0
		},
		limit:5,
		specialLimit:5,
	},
	mounted:function(){//实例化编译完成后默认要执行的方法
		this.$nextTick(function(){//代码保证this.$el在document中
			this.initBookList();
			myScroll = new IScroll('#main',{ 
				probeType: 3,
				mouseWheel: true,
		        preventDefault: false,
		        fadeScrollbars: true
			});
			document.addEventListener('touchmove', function (e) {
				e.preventDefault(); 
			}, false);
			document.addEventListener('mousewheel', function (e) {
				myScroll.refresh();
			}, false);
			var pullDown = $('#PullDown');
			var pullUp = $('#PullUp');
			var isPulled = false;
			myScroll.on('scroll', function() {
				
			    var height = this.y,bottomHeight = this.maxScrollY - height;
				
		        // 控制下拉显示
		        if (height >= 30) {
		        	pullDown.show();
		        	
		        	setTimeout(function(){
		        		pullDown.hide();
		        	},1500)
		            isPulled = true;
		            return;
		        }
		
		        // 控制上拉显示
		        if (bottomHeight >= 30) {
		            pullUp.show();
		            setTimeout(function(){
		            	vm.specialLimit+=5;
		            	if(vm.specialLimit==vm.special.data.length){
		            		pullUp.innerHTML="暂无数据";
		            		return;
		            	}
		            	if(vm.specialLimit+5>=vm.special.data.length){
		            		vm.specialLimit=vm.special.data.length;	
		            	}else{
		            		vm.specialLimit+=5;
		            	}
		            	pullUp.hide();
		        		myScroll.refresh();
		        	},5000)
		            isPulled = true;
		            return;
		        }
			})
			myScroll.on('scrollEnd', function() { // 滚动结束
			    if (isPulled) { // 如果达到触发条件，则执行加载
			        isPulled = false;
			        vm.$forceUpdate()
			    }
			});	
		})
	},
	computed:{
		filteredRItems: function(){
			return this.recommand.data.slice(0,this.limit);
		},
		filterGirl:function(){
			return this.girl.data.slice(0,this.limit);
		},
		filterBoy:function(){
			return this.boy.data.slice(0,this.limit);
		},
		filterFree:function(){
			return this.free.data.slice(0,6);
		},
		filterspecial:function(){
			return this.special.data.slice(0,this.specialLimit);
		}
	},
	methods:{//所有事件的绑定
		initBookList:function(){
			this.$http.get("data/readList.json").then(res=>{
				//es6中箭头函数的this指向其父级
				var list=res.body.items;
				this.hotBookList = {
					title:list[1].ad_name,
					data:list[1].data.data,
					dataCount:list[1].data.count,
				};
				this.recommand ={
					title:list[2].ad_name,
					data:list[2].data.data,
					dataCount:list[2].data.count,
				}
				this.girl ={
					title:list[3].ad_name,
					data:list[3].data.data,
					dataCount:list[3].data.count,
				}
				this.boy ={
					title:list[4].ad_name,
					data:list[4].data.data,
					dataCount:list[4].data.count,
				}
				this.free={
					title:list[5].ad_name,
					data:list[5].data.data,
					dataCount:list[5].data.count,
				}
				this.special={
					title:list[3].ad_name,
					data:list[3].data.data,
					dataCount:list[3].data.count,
				}
			})
		},
		init:function(event){
			alert(111)
		},
	}
})