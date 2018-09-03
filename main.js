console.log("加载完成");
//配置模块

require.config({
	paths: {
		"jquery": "jquery-1.11.3",
		"jquery-cookie": "jquery.cookie",
		"index": "index",
		"parabola": "parabola"
	},
	//设置模块之间的依赖关系
	shim:{
		//保证先加载JQuery
		"jquery-cookie": ["jquery"],
		//定义不遵从AMD规范的js文件
		"parabola": {
			exports: '_'

		}

	}
})

require(["index"], function(index){
	index.main();
})

