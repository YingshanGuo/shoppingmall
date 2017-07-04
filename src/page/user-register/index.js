/*
 * @Author: Yoko 
 * @Date: 2017-06-27 17:30:54 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-07-04 20:05:41
 */

'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _user   = require('service/user-service.js');
var _mm     = require('util/mm.js');

// 表单里的错误提示
var formError = {
    show : function(errMsg){
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide : function(){
        $('.error-item').hide().find('.err-msg').text('');
    }
};

// page 逻辑部分
var page = {
    init: function(){
        this.bindEvent();
    },
    bindEvent : function(){
        var _this = this;
        // 验证username
        $('#username').blur(function(){
            var username = $.trim($(this).val());
            // 如果用户名为空，我们不做验证
            if(!username){
                return;
            }
            // 异步验证用户名是否存在
            _user.checkUsername(username, function(res){
                formError.hide();
            }, function(errMsg){
                formError.show(errMsg);
            });
        });
        // 注册按钮的点击
        $('#submit').click(function(){
            _this.submit();
        });
        // 如果按下回车，也进行提交
        $('.user-content').keyup(function(e){
            // keyCode == 13 表示回车键
            if(e.keyCode === 13){
                _this.submit();
            }
        });
    },
    // 提交表单
    submit : function(){
        var formData = {
                username        : $.trim($('#username').val()),
                password        : $.trim($('#password').val()),
                passwordConfirm : $.trim($('#password-confirm').val()),
                phone           : $.trim($('#phone').val()),
                email           : $.trim($('#email').val()),
                question        : $.trim($('#question').val()),
                answer          : $.trim($('#answer').val())
            },
            // 表单验证结果
            validateResult = this.formValidate(formData);
        // 验证成功
        if(validateResult.status){
            _user.register(formData, function(res){
                window.location.href = './result.html?type=register';
            }, function(errMsg){
                formError.show(errMsg);
            });
        }
        // 验证失败
        else{
            // 错误提示
            formError.show(validateResult.msg);
        }

    },
    // 表单字段的验证
    formValidate : function(formData){
        var result = {
            status  : false,
            msg     : ''
        };
        // 验证手机号
        if(!_mm.validate(formData.phone, 'phone')){
            result.msg = '手机号格式不正确';
            return result;
        }
        // 验证邮箱格式
        if(!_mm.validate(formData.email, 'email')){
            result.msg = '邮箱格式不正确';
            return result;
        }
        // 验证密码提示问题是否为空
        if(!_mm.validate(formData.question, 'require')){
            result.msg = '密码提示问题不能为空';
            return result;
        }
        // 验证密码提示问题答案是否为空
        if(!_mm.validate(formData.answer, 'require')){
            result.msg = '密码提示问题答案不能为空';
            return result;
        }
        // 通过验证，返回正确提示
        result.status   = true;
        result.msg      = '验证通过';
        return result;
    }
};
$(function(){
    page.init();
});