import {config} from '../config/config.js';
import {hex_md5} from './md5.js';
import {helper} from './helper.js';

let page_help = {
	loaded: function(page_name, page_data, any){ // page页面加载完成后统一初始化此函数
		let that = this;
		helper.log(["page_loaded >>> ", page_name])
		that.lazy_img(config.img_cdn);
		that.nav_active(page_name);
	},
	lazy_img: function (img_cdn){ // 渲染页面图片
		let that = this;
		helper.log(["img_cdn=", img_cdn])
		let images = document.getElementsByTagName("img");
		for (let i=0; i<images.length; i++){
			let src = images[i].getAttribute("src");
			let data_src = images[i].getAttribute("data-src");
			images[i].setAttribute("src", "");

			let img_src = "";
			if (data_src){ // 有cdn则用cdn，没有cdn则使用src路径
				img_src = img_cdn + data_src;
			}else {
				img_src = src;
			}

			setTimeout(function (){
				images[i].setAttribute("src", img_src);
			}, 200+i*200);
		}

	},
	nav_active: function (page_name){ // 渲染顶部选中
		let that = this;
		let item = document.getElementsByClassName("nav-menu-item");
		let active = document.getElementsByClassName("nav-name-"+page_name)[0];
		for (let n=0; n<item.length; n++){
			item[n].classList.remove("nav-menu-item-active");
		}
		active.classList.add("nav-menu-item-active");
	},
	menu_active: function (menu_name){ // 左侧选中
		let that = this;
		let item = document.getElementsByClassName("menu-li-item");
		let active = document.getElementsByClassName("menu-li-item-"+menu_name)[0];
		for (let n=0; n<item.length; n++){
			item[n].classList.remove("menu-li-item-active");
		}
		active.classList.add("menu-li-item-active");

	},

}

export {
	page_help,
}