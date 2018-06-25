/*
* @Author: mark
* @Date:   2016-09-27 17:33:45
* @Last Modified by:   mark
* @Last Modified time: 2017-01-16 12:38:26
*/

import Promise from 'es6-promise';

var newData = {

    loading: function(){
        wx.showLoading({
            title: '加载中',
        })
    },

    //API_URL : 'http://m.api.hunantv.com/channel/getDetail',
    fetchApi : function(params) {

        var _this = this;

        let md5 = require('./md5.min.js')
        let reqs = Object.assign({}, params)
        delete reqs.url
        let t = new Date().getTime()
        reqs.version = reqs.version || '1.0'
        reqs.time = t
        reqs.sing = md5(reqs.version + '' + t + 'sjhduiay#$%^&*(')
        reqs.data = reqs.data || {}
        console.log('globalData.token')
        var gbToken = getApp().globalData.token
        // console.log(gbToken)
        if (gbToken) reqs.token = gbToken

        return new Promise((resolve,reject) => {
            wx.request({
                url: params.url,
                method: params.method || 'POST',
                data: Object.assign({}, reqs),
                header: {
                'Content-Type': 'application/json'
                },
                success: resolve,
                fail: reject 
            })
        })

    },

    result : function (params) {

        var _this = this;

        return _this.fetchApi(params).then( res => res, e => { console.log(e) }).catch(e => { console.log(e) })

    }

}


export default newData ;
