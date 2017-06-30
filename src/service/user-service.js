/*
 * @Author: mikey.zhaopeng 
 * @Date: 2017-06-29 15:48:18 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-06-29 16:04:04
 */

'use strict';

var _mm = require('util/mm.js');

var _user = {
    //检查登录状态
    checkLogin : function(resolve,reject){
        _mm.request({
            ur      : _mm.getServerUrl('./user/get_user_info.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    //登出
    logout : function(resolve,reject){
        _mm.request({
            ur      : _mm.getServerUrl('./user/logout.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    }
}  

module.exports = _user;