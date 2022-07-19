
import {config} from '../../config/config.js';
import {hex_md5} from './md5.js';

const map_cache = new Map(); // 设置页面键-值对缓存
const common = {
	"desc": "这是公共js，import {common} 引入即可使用",
	"test": function (){
		return config.debug;
	},
	"log": function (txt) { // 日志打印统一函数
		let debug = config.debug;
		if (txt === 0 || txt === "0") {}else {if (!txt){txt = "空txt，-log";} }
		debug === true ? console.log(JSON.stringify(txt)): "";
		return true;
	},
	"error": function (txt) { // 日志打印统一函数
		console.error(JSON.stringify(txt));
		return true;
	},
	"get_url_param": function (url, key) { // 获取url中的参数
		// 兼容模式url地址，例如：poop.html?page=3&ok=222#p=2#name=kd
		let url_str = "";
		if(!url){ url_str = window.location.href; } else {url_str = url; }
		let regExp = new RegExp("([?]|&|#)" + key + "=([^&|^#]*)(&|$|#)");
		let result = url_str.match(regExp);
		if (result) {
			return decodeURIComponent(result[2]); // 转义还原参数
		}else {
			return ""; // 没有匹配的键即返回null
		}
	},
	"set_cookie": function (name, value, time) {
		if (!time){
			time = 1*24*60*60*1000; // 默认1天
		}
		let exp = new Date();
		exp.setTime(exp.getTime() + time);
		document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
	},
	"get_cookie": function (name) {
		let arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
		if(arr=document.cookie.match(reg)){
			return unescape(arr[2]);
		} else{
			return null;
		}
	},
	"del_cookie": function (name) {
		let exp = new Date();
		exp.setTime(exp.getTime() - 1);
		let cval = this.get_cookie(name);
		if(cval!=null) {
			document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
		}
	},
	"base64_encode": function (string) {
		return btoa(string);
	},
	"base64_decode": function (string) {
		return atob(string);
	},
	"md5": function (string) {
		return hex_md5(string);
	},
	"json_to_string": function (json) { // 将json转化为string
		let string;
		let back = json;

		if(typeof back === "object"){
			string = JSON.stringify(back);
		} else {
			string = back;
		}

		return string;
	},
	"timestamp": function() {
		return new Date().getTime();
	},
	"js_rand": function (min, max) { // [min, max]
		return Math.floor(Math.random() * (max - min + 1) + min);
	},
	"set_data": function (key, value){
		localStorage.setItem(key,value);
		if (localStorage.getItem(key)){
			return true;
		}else {
			return false;
		}
	},
	"get_data": function (key, test) {
		if (test || test === 0){
			console.log("注意，你使用了get_data函数。。");
			return false;
		}
		let value = localStorage.getItem(key);
		if (value){
			return value;
		}else {
			return null;
		}
	},
	"del_data": function (key) {
		let del = localStorage.removeItem(key);
		if (del){
			return true;
		}else {
			return false;
		}
	},
	"clear_data": function () {
		let clear = localStorage.clear();
		if (clear){
			return true;
		}else {
			return false;
		}
	},
	"set_cache": function (_key, _value) { // key-value对 存入系统内存，页面关闭即key-value消失
		let msg = "";
		// 校验是否已经存在key
		const cache = new Map(map_cache);
		let has = cache.get(_key);
		if (has || has === 0) {
			msg = "update-cache";
		}else {
			msg = "insert-cache";
		}

		const items = [
			[_key, _value],
		];
		items.forEach(
			([key, value]) => map_cache.set(key, value)
		);

		return msg;
	},
	"get_cache": function (_key) {
		const cache = new Map(map_cache);
		return cache.get(_key);
	},
	"time": new Date(),
	"time_ms": (new Date()).getTime(),
	"get_date": function () {
		let t=new Date();
		let seconds = t.getSeconds(); if (seconds<10){seconds = "0"+seconds;}
		let minutes = t.getMinutes(); if (minutes<10){seconds = "0"+minutes;}
		let hour = t.getHours(); if (hour<10){hour = "0"+hour;}
		let day = t.getDate(); if (day<10){day = "0"+day;}
		let month = t.getMonth() + 1; if (month<10){month = "0"+month;}
		let year = t.getFullYear();

		return [
			year+""+month+""+day+""+hour+""+minutes+""+seconds,
			year+"-"+month+"-"+day+" "+hour+":"+minutes+":"+seconds,
		];
	},
	data_to_json: function(text){
		// 统一格式校验
		let back = null;
		let res = null;
		if (typeof text === "string"){
			back = text;
			res = JSON.parse(text);
		}else if (typeof text === "object"){
			back = JSON.stringify(text);
			res = text;
		}else {
			console.log("未知类型=" + typeof text);
			back = text;
			res = text;
		}

		return res;
	},

};


export {
	common,
}
