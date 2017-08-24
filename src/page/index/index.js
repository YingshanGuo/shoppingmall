/*
 * @Author: Yoko 
 * @Date: 2017-06-27 17:30:54 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-08-24 11:50:06
 */

'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('util/slider/index.js');
var navSide = require('page/common/nav-side/index.js');
var templateBanner = require('./index.string');
var _mm = require('util/mm.js');

// navSide.init({
//     name:'user-center'
// });

$(function () {
    //渲染banner的html
    var bannerHtml = _mm.renderHtml(templateBanner);
    $('.banner-con').html(bannerHtml);
    //初始化banner
    var $slider = $('.banner').unslider({
        dots: true
    });
    //前一张和后一张操作的事件绑定
    $('.banner-con .banner-arrow').click(function () {
        var forward = $(this).hasClass('prev') ? 'prev' : 'next';
        $slider.data('unslider')[forward]();
    });


});

//侧边导航
window.onresize = function () {
    resizeList();
}
window.onload = function () {
    resizeList();
    tip();
}
function resizeList() {
    var logo = document.getElementById("logo");
    var offsetLeft = logo.offsetParent.offsetLeft;

    var list = document.getElementById("keywords-list");
    list.style.left = offsetLeft + "px";
}
function tip(){
    setTimeout(function () {
　　　　　　window.confirm("Tip：这是网站示例,非购物网站，请不要进行付款操作哦");
　　　　　　callback();
　　　　}, 10000);
}