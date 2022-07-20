import { createApp } from "vue"
import App from "./App.vue"
const app = createApp(App); // 挂载

import {config} from "../config/config.js";
import {global_data} from "../helper/global_data.js";
import {helper} from "../helper/function.js";
import {page_help} from "../helper/page_help.js";

// 全局变量
app.config.globalProperties.config = config; // 配置文件、参数
app.config.globalProperties.global_data = global_data; // 临时全局参数
app.config.globalProperties.helper = helper; // 公共函数，助手函数
app.config.globalProperties.page_help = page_help; // page页面加载完成后操作的函数集合

//来关闭生产模式下给出的提示
app.config.productionTip = false;

// 路由
import router from "../../route/route";
app.use(router);

// axios
import axios from "axios";
// axios.defaults.baseURL = config.api_url; // 设置了主域名则接口就不需要+了
axios.defaults.withCredentials = false; // 跨域设置，false忽略跨域cookies（Access-Control-Allow-Headers:*）
axios.defaults.timeout = 16000; // 等待时间，ms

// Element-plus UI
// 文档https://element-plus.gitee.io/#/zh-CN/component/quickstart
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
app.use(ElementPlus, { size: "small", zIndex: 5000 });
import {ElMessage} from "element-plus"
app.provide("$message", ElMessage);


app.mount("#app");
