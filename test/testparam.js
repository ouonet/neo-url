/**
 * Created by neo on 2015/11/4.
 */
var should = require('should');
var Neo_url = require('../index');
describe('test params',function(){
    //it('taobao url',function(){
    //    var url1=new Neo_url('https://shop112573565.taobao.com/search.htm?orderType=&viewType=grid&keyword=%C9%CF%D2%C2&lowPrice=&highPrice=','GBK');
    //    url1.getParam('keyword').should.be.equal('上衣');
    //    url1.charset='UTF-8';
    //    var urlstrofUTF=url1.toString();
    //    //console.log(urlstrofUTF);
    //    //console.log(url1.getParam('keyword'));
    //})
    it('port problem',function(){
        var s1 = 'https://item.taobao.com/item.htm?id=41464402185&ali_refid=a3_420432_1006:1110031434:N:%E4%B8%89%E4%B8%83%E7%B2%89:16b138754166b50ea9a0b9ed3800b0bb&ali_trackid=1_16b138754166b50ea9a0b9ed3800b0bb&spm=a230r.1.14.9.2S99Kh#detail';
        var url1=new Neo_url(s1,'GBK');
        //url1.path.should.be('item.htm');
        console.log(url1.path);
        console.log(url1.getParam('ali_refid'));
        should(url1.path).be.eql('item.htm');
        should(url1.host).be.eql('item.taobao.com');
        url1.getParam('id').should.be.equal('41464402185');
        should(url1.toString()).be.eql(s1);
    })
})