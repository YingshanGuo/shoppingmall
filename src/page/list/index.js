/*
 * @Author: mikey.zhaopeng 
 * @Date: 2017-07-06 16:03:19 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-07-06 18:22:13
 */
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm = require('util/mm.js');
var _product = require('service/product-service.js');
var templateIndex = require('./index.string');

var page = {
    data :{
        listParam :{
            keyword    : _mm.getUrlParam('keyword')    ||'',
            catagoryId : _mm.getUrlParam('catagoryId') ||'',
            orderBy    : _mm.getUrlParam('orderBy')    ||'default',
            pageNum    : _mm.getUrlParam('pageNum')    ||1,
            pageSize   : _mm.getUrlParam('pageSize')   ||20
        }
    },
    init :function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function(){
        this.loadList();
    },
    bindEvent : function(){
        var _this = this;
        //排序的点击事件
        $('.sort-item').click(function(){
            var $this = $(this);
             _this.data.listParam.pageNum = 1;
            //点击默认排序
            if($this.data('type') === 'default'){
                //已经是active样式
                if($this.hasClass('active')){
                    return;
                }
                //其他
                else{
                    $this.addClass('active').siblings('.sort-item')
                    .removeClass('active asc desc');
                    _this.data.listParam.orderBy = 'default';
                }
            }
            //点击价格排序
            else if($this.data('type') === 'price'){
                $this.addClass('active').siblings('.sort-item')
                 .removeClass('active asc desc');
                 //升序降序的处理
                if(!$this.hasClass('asc')){
                    $(this).addClass('asc').removeClass('desc');
                    _this.data.listParam.orderBy = 'price_asc';
                }else{
                    $(this).addClass('desc').removeClass('asc');
                    _this.data.listParam.orderBy = 'price_desc';
                }
            }
            //重新加载列表
            _this.loadList();
        });
    },
    //加载list数据
    loadList : function(){
        var _this     = this,
            listHtml  = '',
            listParam = this.data.listParam,
            $pListCon = $('.p-list-con');
        $pListCon.html(' <div class="loading"></div>');
        //删除参数中不必要的字段
        listParam.catagoryId 
        ? (delete listParam.keyword) : (delete listParam.catagoryId);
        //请求接口
        _product.getProductList(listParam,function(res){
            listHtml = _mm.renderHtml(templateIndex,{
                list : res.list
            });
            $pListCon.html(listHtml);
            _this.loadPagination(res.pageNum,res.pages);
        },function(errMsg){
            _mm.errorTips(errMsg);
        });
    },
    //加载分页信息
    loadPagination : function(pageNum,pages){

    }
}

$(function(){
    page.init();
})