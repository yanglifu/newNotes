
//编译js
fis.media('development').match('/lib/js/(**).js', {
    optimizer : fis.plugin('uglify-js'),
    useHash : false,
    release : '/public/js/$1'
});
fis.media('debug').match('/lib/js/(**).js', {
    optimizer : fis.plugin('uglify-js'),
    useHash : false,
    release : '/public/js/$1'
});
fis.media('deploy').match('/lib/js/(**).js', {
    optimizer : fis.plugin('uglify-js'),
    useHash : true,
    release : '/public/js/$1'
});


//对编译后的js 进行再次加上hash戳
fis.media('development').match('/lib/js/(**).js', {
    optimizer : fis.plugin('uglify-js'),
    useHash : false,
    release : '/public/js/$1'
});
fis.media('debug').match('/public/js/(**).js', {
    optimizer : fis.plugin('uglify-js'),
    useHash : false,
    release : '/public/js/$1'
});
fis.media('deploy').match('/public/js/(**).js', {
    optimizer : fis.plugin('uglify-js'),
    useHash : true,
    release : '/public/js/$1'
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
    release : '/public/css/$1'
})
fis.media('debug').match('/lib/css/(*).scss', {
    rExt : '.css',
    parser : fis.plugin('node-sass'), //加载sass插件
    useSprite : true, //使用雪碧图
    useHash : false,
    optimizer: fis.plugin('clean-css'), //压缩css
    release : '/public/css/$1'
})
fis.media('deploy').match('/lib/css/(*).scss', {
    rExt : '.css',
    parser : fis.plugin('node-sass'), //加载sass插件
    useSprite : true, //使用雪碧图
    useHash : false,
    optimizer: fis.plugin('clean-css'), //压缩css
    release : '/public/css/$1'
})

/**
 * 编译compontent   引用的外部插件 不进行编译  hash
 */
fis.media('development').match('/lib/compontent/(**)', {
    release : '/public/compontent/$1',
    useHash : false
})
fis.media('debug').match('/lib/compontent/(**)', {
    release : '/public/compontent/$1',
    useHash : false
})
fis.media('deploy').match('/lib/compontent/(**de)', {
    release : '/public/compontent/$1',
    useHash : false
})


/**
 * 图片的解析，发布
 * 包括编译后css中压缩出现的图片
 */
fis.media('development').match(/^\/lib\/(css|images)\/(.*)\.(jpg|gig|jpeg|png)$/, {
    useHash : false,
    useSprite : true,
    release: '/public/static/images/$2'
});
fis.media('debug').match(/^\/lib\/(css|images)\/(.*)\.(jpg|gig|jpeg|png)$/, {
    useHash : false,
    useSprite : true,
    release: '/public/static/images/$2'
});
fis.media('deploy').match(/^\/lib\/(css|images)\/(.*)\.(jpg|gig|jpeg|png)$/, {
    useHash : true,
    useSprite : true,
    release: '/public/static/images/$2'
});

/**
 * 字体的解析，发布
 * 包括编译后css中压缩出现的图片
 */
fis.media('development').match(/^\/lib\/fonts\/(.*)\.(eot|svg|ttf|woff)$/, {
    useHash : false,
    useSprite : true,
    release: '/public/fonts/$1'
});
fis.media('debug').match(/^\/lib\/fonts\/(.*)\.(eot|svg|ttf|woff)$/, {
    useHash : false,
    useSprite : true,
    release: '/public/fonts/$1'
});
fis.media('deploy').match(/^\/lib\/fonts\/(.*)\.(eot|svg|ttf|woff)$/, {
    useHash : true,
    useSprite : true,
    release: '/public/fonts/$1'
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

