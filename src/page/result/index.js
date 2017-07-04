/*
 * @Author: mikey.zhaopeng 
 * @Date: 2017-06-30 17:17:21 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-06-30 18:06:16
 */
'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function(){
    var type = _mm.getUrlParam('type') || 'default',
        $element = $('.' + type + '-success');
        //显示对应的提示元素
        $element.show();
})