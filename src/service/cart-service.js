/*
 * @Author: mikey.zhaopeng 
 * @Date: 2017-06-29 15:48:18 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-07-07 16:28:35
 */

'use strict';

var _mm = require('util/mm.js');

var _cart = {
    //获取购物车数量
    getCartCount : function(resolve,reject){
        _mm.request({
            ur      : _mm.getServerUrl('./cart/get_cart_product_count.do'),
            success : resolve,
            error   : reject
        });
    },
    //添加到购物车
    addToCart : function (productInfo , resolve, reject){
        _mm.request({
            ur      : _mm.getServerUrl('./cart/add.do'),
            data    : productInfo,
            success : resolve,
            error   : reject
        });
    }
}  

module.exports = _cart;