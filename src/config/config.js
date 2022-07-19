/*
* 项目配置文件
* 全部参数自定义，方便项目整体迁移
 */
const config = {
    "debug": true, // true打印日志，false不打印
    "api_url": "http://127.0.0.1:9500/api/gen2/", // 接口主地址
    "web_url": "./", // 网站访问主地址
    "img_cdn": "./", // img的CDN地址
    "file_cdn": "./", // 大文件的CDN地址
    "cookie_timeout": 24*60*60*1000, // 页面token过期时间
    "cache": Math.floor((new Date())/1000000) * 1000 * 3 / 2, // 页面缓存时间1000s
    "app": { //
        "app_class": "vue-example",
        "app_name": "vue示例",
        "app_version": "v1.0.0",
    },
    "title": "由Vue框架渲染",
};


export { config }
