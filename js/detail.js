var myScroll;
function loaded(){
	myScroll = new IScroll('#main',{ 
		probeType: 2,
		mouseWheel: true,
		preventDefault: false,
		fadeScrollbars: true
	});
	var main=document.getElementById('main');
	main.addEventListener('touchmove', function (e) {
		e.preventDefault(); 
	}, false);
}


window.vm = new Vue({
	el:'#root',//app元素中所有的元素都能被vue操控
	data:{
		
	},
	mounted:function(){//实例化编译完成后默认要执行的方法
		this.$nextTick(function(){//代码保证this.$el在document中
			
			loaded();
			
		})
	},
	computed:{
		
	},
	methods:{//所有事件的绑定
		initBookList:function(){
			this.$http.get("data/book.json").then(res=>{
				//es6中箭头函数的this指向其父级
				var list=res.body.items;
				
			})
		}
	}
})