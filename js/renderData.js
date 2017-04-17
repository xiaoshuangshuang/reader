window.vm = new Vue({
	el:'#root',//app元素中所有的元素都能被vue操控
	data:{
		bookList:[]
	},
	filters:{//可以定义局部和全局的过滤器
	},
	beforeCreate:function(){
		var main= document.getElementById('main');
		myScroll = new IScroll(window, { scrollX: true, freeScroll: true });
	
		document.addEventListener('touchmove', function (e) {e.preventDefault(); }, false);
			
				
	},
	mounted:function(){//实例化编译完成后默认要执行的方法
		this.$nextTick(function(){//代码保证this.$el在document中
			this.initBookList();
			
			//console.log(this.booktList);
		})
	},
	methods:{//所有事件的绑定
		initBookList:function(){
			this.$http.get("data/readList.json").then(res=>{
				//es6中箭头函数的this指向其父级
				this.bookList = res.body.items;
				console.log(this.bookList);
				
				//this.totalMoney = res.body.result.totalMoney;
			})
		},
		
		
	}
})