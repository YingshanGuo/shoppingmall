/*
 * @Author: mikey.zhaopeng 
 * @Date: 2017-07-08 10:17:36 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-07-08 11:33:56
 */
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm           = require('util/mm.js');
var _product      = require('service/product-service.js');
var templateIndex = require('./index.string');

var page = {
    data : {
        productId : _mm.getUrlParam('productId') || '23',
    },
    init : function(){
        this.onLoad();
        this.test();
    },
    onLoad : function(){
        this.loadList();
        console.log("productId",this.data.productId);
    },
    loadList : function (){
        var _this       = this,
            html        = '',
            $pageWrap   = $('.page-wrap');
        // loading
        $pageWrap.html('<div class="loading"></div>');

    },
    test : function(){
        var url = _mm.getServerUrl('./ho.js');
        console.log("url",url);
        var urlParam = _mm.getUrlParam('productId');
        console.log("urlParam",urlParam);
    }
}

$(function(){
    page.init();
})