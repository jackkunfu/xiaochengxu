/*
* @Author: mark
* @Date:   2016-09-27 17:33:45
* @Last Modified by:   mark
* @Last Modified time: 2017-01-16 12:38:26
*/

import Promise from 'es6-promise';

var newData = {

    baseUrl: 'http://holer.org:65015',

    loading: function(){
        wx.showLoading({
            title: '加载中',
        })
    },

    //API_URL : 'http://m.api.hunantv.com/channel/getDetail',
    fetchApi : function(params) {

        var _this = this;

        var data = params.data || {}
        var url = params.url
        var method = params.method
        delete params.data
        delete params.url
        delete params.method
        
        let reqs = Object.assign({}, params)
        
        let t = new Date().getTime()
        reqs.version = reqs.version || '1.0'
        reqs.time = t
        let md5 = require('./md5.min.js')
        reqs.sing = md5(reqs.version + '' + t + 'sjhduiay#$%^&*(')

        // reqs.data = reqs.data || {}   // 传参都包裹在data字段里

        if (data){
            Object.keys(data).forEach(key => {
                reqs[key] = data[key]
            })
        }
        
        // console.log('globalData.token')
        // var gbToken = 
        // console.log(gbToken)
        // if (gbToken) reqs.token = gbToken

        var header = {
            // 'Content-Type': 'application/json'
            'Content-Type': 'application/x-www-form-urlencoded',
            Token: getApp().globalData.token || ''
        }

        return new Promise((resolve,reject) => {
            wx.request({
                url: this.baseUrl + url,
                method: method || 'post',
                data: Object.assign({}, reqs),
                header,
                success: resolve,
                fail: reject 
            })
        })

    },

    result : function (params) {
        return this.fetchApi(params).then( res => res, e => { console.log(e) }).catch(e => { console.log(e) })
    }

}


export default newData ;
