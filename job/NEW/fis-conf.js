fis.hook('amd', {
    baseUrl : '/', //设置根目录
    globalAsyncAsSync: true //异步加载的js将会同步
});

//屏蔽bower.json
fis.media('development').match('/lib/(**)', {
    release : false
})
fis.media('debug').match('/lib/(**)', {
    release : false
})
fis.media('deploy').match('/lib/(**)', {
    release : false
})

//编译js
fis.media('development').match('/lib/js/(**).js', {
    optimizer : fis.plugin('uglify-js'),
    useHash : false,
    release : '/Public/js/$1'
});
fis.media('debug').match('/lib/js/(**).js', {
    optimizer : fis.plugin('uglify-js'),
    useHash : false,
    release : '/Public/js/$1'
});
fis.media('deploy').match('/lib/js/(**).js', {
    optimizer : fis.plugin('uglify-js'),
    useHash : true,
    release : '/Public/js/$1'
});

//modules具有模块化
fis.media('development').match('/lib/js/modules/(*).js', {
    isMod: true // 设置 modules 下都是一些组件，组件建议都是匿名方式 define
});
fis.media('debug').match('/lib/js/modules/(*).js', {
    isMod: true // 设置 modules 下都是一些组件，组件建议都是匿名方式 define
});
fis.media('deploy').match('/lib/js/modules/(*).js', {
    isMod: true // 设置 modules 下都是一些组件，组件建议都是匿名方式 define
});

//进行csssprite 与 js all in  one 打包
fis.media('development').match('::package', {
    spriter : fis.plugin('csssprites'),
    // 分析 __RESOURCE_MAP__ 结构，来解决资源加载问题
    postpackager: fis.plugin('loader', {
        allInOne: false
    })
})
fis.media('debug').match('::package', {
    spriter : fis.plugin('csssprites'),
    // 分析 __RESOURCE_MAP__ 结构，来解决资源加载问题
    postpackager: fis.plugin('loader', {
        postpackager: fis.plugin('loader', {
            allInOne: false
        })
    })
})
fis.media('deploy').match('::package', {
    spriter : fis.plugin('csssprites'),
    // 分析 __RESOURCE_MAP__ 结构，来解决资源加载问题
    postpackager: fis.plugin('loader', {
        allInOne: {
            includeAsyncs : true,
            ignore:['/lib/compontent/jquery/jquery.min.js', '/lib/js/classroom/**.js', '**.css', '**.scss']
        }
    })
})

//对编译后的js 进行再次加上hash戳
fis.media('debug').match('/Public/js/(**).js', {
    optimizer : fis.plugin('uglify-js'),
    useHash : false,
    release : '/Public/js/$1'
});
fis.media('deploy').match('/Public/js/(**).js', {
    optimizer : fis.plugin('uglify-js'),
    useHash : true,
    release : '/Public/js/$1'
});


/**
 * sass的解析  
 * 关于样式的合并，直接在开发的时候使用sass 的import 进行引用合并 ，不再后期进行暴力打包合并
 * 分通用功能common.sass与具体功能样式
 */
fis.media('development').match('/lib/css/(*).scss', {
    rExt : '.css',
    parser : fis.plugin('node-sass'), //加载sass插件
    useSprite : false, //使用雪碧图
    useHash : false,
    release : '/Public/css/$1'
})
fis.media('debug').match('/lib/css/(*).scss', {
    rExt : '.css',
    parser : fis.plugin('node-sass'), //加载sass插件
    useSprite : true, //使用雪碧图
    useHash : false,
    optimizer: fis.plugin('clean-css'), //压缩css
    release : '/Public/css/$1'
})
fis.media('deploy').match('/lib/css/(*).scss', {
    rExt : '.css',
    parser : fis.plugin('node-sass'), //加载sass插件
    useSprite : true, //使用雪碧图
    useHash : false,
    optimizer: fis.plugin('clean-css'), //压缩css
    release : '/Public/css/$1'
})

/**
 * 编译compontent
 */
fis.media('development').match('/lib/compontent/(**)', {
    release : '/Public/compontent/$1',
    useHash : false
})
fis.media('debug').match('/lib/compontent/(**)', {
    release : '/Public/compontent/$1',
    useHash : false
})
fis.media('deploy').match('/lib/compontent/(**)', {
    release : '/Public/compontent/$1',
    useHash : false
})


/**
 * 图片的解析，发布
 * 包括编译后css中压缩出现的图片
 */
fis.media('development').match(/^\/lib\/(css|images)\/(.*)\.(jpg|gig|jpeg|png)$/, {
    useHash : false,
    useSprite : true,
    release: '/Public/images/$2'
});
fis.media('debug').match(/^\/lib\/(css|images)\/(.*)\.(jpg|gig|jpeg|png)$/, {
    useHash : false,
    useSprite : true,
    release: '/Public/images/$2'
});
fis.media('deploy').match(/^\/lib\/(css|images)\/(.*)\.(jpg|gig|jpeg|png)$/, {
    useHash : true,
    useSprite : true,
    release: '/Public/images/$2'
});

/**
 * 字体的解析，发布
 * 包括编译后css中压缩出现的图片
 */
fis.media('development').match(/^\/lib\/fonts\/(.*)\.(eot|svg|ttf|woff)$/, {
    useHash : false,
    useSprite : true,
    release: '/Public/fonts/$2'
});
fis.media('debug').match(/^\/lib\/fonts\/(.*)\.(eot|svg|ttf|woff)$/, {
    useHash : false,
    useSprite : true,
    release: '/Public/fonts/$2'
});
fis.media('deploy').match(/^\/lib\/fonts\/(.*)\.(eot|svg|ttf|woff)$/, {
    useHash : true,
    useSprite : true,
    release: '/Public/fonts/$2'
});


/**
 * html 不加hash
 */
fis.media('development').match('/views/(**)', {
    useHash : false
});
fis.media('debug').match('/views/(**)', {
    useHash : false
});
fis.media('deploy').match('/views/(**)', {
    useHash : false
});


/**
 * 开发不压缩
 */
fis.media('development').match('*', {
    useHash : false,
    optimizer : null,
    useSprite : false,
    deploy : fis.plugin('local-deliver', {
        // to : 'D:/workspace/sharp/shiyin-web-php'
    })
})

/**
 * 开发压缩
 */
fis.media('debug').match('*', {
    useSprite : true,
    useHash : false,
    deploy : fis.plugin('local-deliver', {
        // to : 'D:/workspace/sharp/shiyin-web-php'
    })
})


/**
 * 发布
 */
fis.media('deploy').match('*', {
    useSprite : true,
    useHash : false,
    deploy : fis.plugin('local-deliver', {
        // to : 'D:/workspace/sharp/shiyin-web-php'
    })
    // deploay : fis.plugin('local-deliver', {
    //     to : 'D:/work/o2oweb/'
    // })
    // deploy: fis.plugin('http-push', {
    //     receiver : 'http://172.16.3.78:8882/receiver.php',
    //     to:'/thinkphpdemo/'
    // })
})

