const path = require('path');
// vite.config.js # or vite.config.ts

console.log(path.resolve(__dirname, './src'));

module.exports = {
    /**
     * 在生产中服务时的文件基本公共路径。
     * @default '/'
     */
    base: './',
    /**
     * npm run build输出文件的总目录
     * 与“根”相关的目录
     * @default 'dist'
     */
    outDir: 'built',
    /**
     * 静态文件目录
     * Directory relative from `outDir` where the built js/css/image assets will
     * be placed.
     * @default '_assets'，为空时与outDir同目录
     */
    assetsDir: '',
    port: 8500,
    // 是否自动在浏览器打开
    open: true,
    // 是否开启 https
    https: false,
    // 服务端渲染
    ssr: false,
    // 引入第三方的配置
    optimizeDeps: {
        include: ["moment", "echarts", "axios", "mockjs"]
    },
    alias: {
        // 键必须以斜线开始和结束
        '/@/': path.resolve(__dirname, './src')
        // '/@components/': path.resolve(__dirname, './src/components')
    },
    proxy: {

    }
};
