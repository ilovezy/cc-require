
// 依赖注入啊，angular里也很多见

// require(['jquery', 'underscore', 'backbone'], function($, _, backbone){
//     
// })

// 默认与main.js 在同一目录
// require.config({ paths: { 'jquery': 'jquery-1.11.1.min', 'angular': 'angular.js', 
//         'handlebars': 'handlebars-v3.0.3'
//     }
// })
//
// // 或者要引用的都在一个目录的文件夹 lib 下, 方法1，每个都加 lib/
// require.config({
//     paths: {
//         'jquery': 'lib/jquery-1.11.1.min', 
//         'angular': 'lib/angular.js', 
//         'handlebars': 'lib/handlebars-v3.3.3'
//     }
// })
//
// // 方法2 直接更改 baseUrl，即修改 基目录
// require.config({
//     baseUrl: 'js/lib', // 修改 基目录
//     paths: {
//         'jquery': 'lib/jquery-1.11.1.min', 
//         'angular': 'lib/angular.js', 
//         'handlebars': 'lib/handlebars-v3.3.3'
//     }
// })
//
// // 也可以直接给地址, 如下
// require.config({
//     'jquery': 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min'
// })
//
// // AMD 模块写法，
// // 加入有一个math.js, 定义了一个math模块，那么math就要这样写：
// define(function(){
//     var add = function(x, y){
//         return x + y
//     }
//
//     return {
//         add: add
//     }
// })
//
// main.js 里这样写
require(['lib/math'], function(math){
    console.log(math.add(1, 1))
})

// 加载非规范性模块
require.config({
    shim: {
        'underscore': {
            exports: '_'
        }, 
        'backbone': {
            deps: ['underscore', 'jquery'], // backbone本身依赖于 underscore, jquery
            exports: 'Backbone'
        }, 
        // jquery plugin
        'jquery.scroll': {
            deps: ['jquery'], 
            exports: 'jQuery.fn.scroll'
        }
    }
})

// require 源码
function Module(id, parent){
    this.id = id
    this.exports = {}
    this.parent = parent
    this.filename = null
    this.loaded = false
    this.children = {}
}

module.exports = Module
var module = new Module(filename, parent)

Module.prototype.require = function(path){
    return Module._load(path, this)
}

Module._load = function(request, parent, isMain){
    var filename = Module._resolveFilename(request, parent);

    var cachedModule = Module._cache[filename];
    if(cacheModule){
        return cachedModule.exports
    }
    if(NativeModule.exists(filename)){
        return NativeModule.require(filename)
    }

    var module = new Module(filename, parent)
    Module._cache[filename] = module

    try{
        module.load(filename)
        hadExpection = false
    }finally{
        if(hadException){
            delete Module._cache[filename]
        }
    }

    return module.exports
}


Module.prototype._compile = function(content, filename){
    var self = this, 
        args = [self.exports, require, self, filename, dirname];

    return ompiledWrapper.apply(self.exports, args)
}

// 基本等同于
(function(exports, require, module, __filename, __dirname){
    // 模块源码
})

// 模块加载本质：注入 exports, require, module 三个全局变量，执行没偶快源码，将模块的 exports变量的值输出



 
