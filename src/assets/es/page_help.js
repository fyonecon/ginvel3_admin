import {config} from '../../config/config.js';
import {hex_md5} from './md5.js';
import {common} from './common.js';

let page_help = {
	loaded: function(any){ // page页面加载完成后统一初始化此函数
		let that = this;
		common.log(["page_loaded >>> ", any])
		that.lazy_img(config.img_cdn);
	},

	lazy_img: function (img_cdn){ // 渲染页面图片
		let that = this;
		common.log(["img_cdn=", img_cdn])
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

}

export {
	page_help,
}