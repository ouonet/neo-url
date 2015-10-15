/**
 * Created by neo on 2015/10/12.
 */
/**
 * Created by neo on 2015/8/4.
 */
/*
 URI 解析
 @param url
 @param charset 字符集，可选UTF-8,GBK,必须大写
 */
var URLGBK=require('neo-gbk');
function MyUrl(url, charset) {
    this.init();
    this.setUrl(url, charset);
    return this;
}
MyUrl.prototype = {
    regUrl: /^[a-zA-z]+:\/\/[^\s]*$/,
    regHttpProtocol: /^https?/,
    isUrl: function (url) {
        return this.regUrl.test(url);
    },
    toString: function () {
        var params = [];
        for (var key in this.param) {
            params.push(key + '=' + (this.charset == 'UTF-8' ? encodeURIComponent(this.param[key]) : URLGBK.encode(this.param[key])));
        }
        return this.protocol + '://' + this.host + (this.port == "80" ? "" : ":" + this.port)
            + "/" + this.path + (params.length == 0 ? "" : "?" + params.join("&"))
            + (this.hash == "" ? "" : "#" + this.hash);
    },
    init: function () {
        this.url = "";
        this.protocol = "http";
        this.port = "80";
        this.hash = "";
        this.host = "";
        this.path = "";
        this.param = this.param || {};
        for (var key in this.param) {
            delete this.param[key];
        }
    },
    setUrl: function (url, charset) {
        this.init();
        this.url = url || "";
        this.charset = charset || 'UTF-8';

        if (!this.regHttpProtocol.test(this.url)) {
            url = "http://" + url;
        }

        if (!this.isUrl(url)) {
            return this;
        }

        var res = url.split(/:\/\//);
        this.protocol = res[0];
        res[1]=res[1].replace(/\/{2,}/g,'/');//消除多余的/
        var i = this.indexOfMutli(res[1], ['/', '?', '#']);
        var host1 = res[1];
        var path1 = "";
        if (i > -1) {
            host1 = res[1].substr(0, i)
            path1 = res[1].substr(i + 1);
        }
        var regPort = /:(\d+)/;
        var port1 = regPort.exec(host1);
        if (port1 != null) {
            this.port = port1[1];
            host1 = host1.replace(port1, "");
        }
        this.host = host1;
        i = this.indexOfMutli(path1, ['?', '#']);
        if (i > -1) {
            this.path = path1.substr(0, i);
            path1 = path1.substr(i);
            i = path1.indexOf('#');
            if (i > -1) {
                this.hash = path1.substr(i + 1);
                path1 = path1.substr(0, i);
            }
            var paramStr = path1;
            var regParam = /([^?&=#]*?)=([^?&=#]*)/g;
            var res;
            while ((res = regParam.exec(paramStr), res != null)) {
                this.param[res[1]] = this.charset == 'UTF-8' ? decodeURIComponent(unescape(res[2])) : URLGBK.decode(unescape(res[2]));
            }
        } else {
            this.path = path1;
        }
        return this;
    },
    setParam: function (key, value) {
        this.param[key] = value;
    },
    getParam: function (key) {
        return this.param[key];
    },
    hasParam: function (key) {
        if (key == undefined) {
            for (var key in this.param) {
                return true;
            }
            return false;
        }
        return this.param[key] !== undefined;
    },
    indexOfMutli: function (str, searchs) {
        for (var i = 0, l = searchs.length; i < l; i++) {
            var k = str.indexOf(searchs[i]);
            if (k != -1)return k;
        }
        return -1;
    }
};
module.exports=MyUrl;