/**
 * Created by neo on 2015/11/4.
 */
var should = require('should');
var Neo_url = require('../index');
describe('test params',function(){
    it('taobao url',function(){
        var url1=new Neo_url('https://shop112573565.taobao.com/search.htm?orderType=&viewType=grid&keyword=%C9%CF%D2%C2&lowPrice=&highPrice=','GBK');
        url1.getParam('keyword').should.be.equal('上衣');
        url1.charset='UTF-8';
        var urlstrofUTF=url1.toString();
        console.log(urlstrofUTF);
        //console.log(url1.getParam('keyword'));
    })
})