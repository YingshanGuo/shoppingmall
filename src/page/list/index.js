/*
 * @Author: mikey.zhaopeng 
 * @Date: 2017-07-06 16:03:19 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-07-12 20:32:03
 */
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm           = require('util/mm.js');
var _product      = require('service/product-service.js');
var Pagination    = require('util/pagination/index.js');
var templateIndex = require('./index.string');

var page = {
    data :{
        listParam :{
            keyword    : _mm.getUrlParam('keyword')    ||'',
            categoryId : _mm.getUrlParam('categoryId') ||'',
            orderBy    : _mm.getUrlParam('orderBy')    ||'default',
            pageNum    : _mm.getUrlParam('pageNum')    ||1,
            pageSize   : _mm.getUrlParam('pageSize')   ||20
        }
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad  : function(){
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
        //keyword或者categoryId这俩参数只需要一个，
        //如果是按关键字查询列表，那categoryId就是没用的，所以这两个要删一个
        listParam.catagoryId 
        ? (delete listParam.keyword) : (delete listParam.catagoryId);
        //请求接口
        _product.getProductList(listParam,function(res){
            listHtml = _mm.renderHtml(templateIndex,{
                list : res.list
            });
            $pListCon.html(listHtml);
            _this.loadPagination({
                hasPreviousPage : res.hasPreviousPage,
                prePage         : res.prePage,
                hasNextPage     : res.hasNextPage,
                nextPage        : res.nextPage,
                pageNum         : res.pageNum,
                pages           : res.pages
            });
        },function(errMsg){
            _mm.errorTips(errMsg);
        });
    },
    // 加载分页信息
    loadPagination : function(pageInfo){
        var _this = this;
        //this是有的，所以this.xxx没有的话就是个undefined，不会出错
        //加入后面再接，this.xxx.ooo就有问题了，相当于undefined.ooo
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container : $('.pagination'),
            onSelectPage : function(pageNum){
                _this.data.listParam.pageNum = pageNum;
                _this.loadList();
            }
        }));
    }
}

$(function(){
    page.init();
})