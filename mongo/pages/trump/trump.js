/*
* @Author: mark
* @Date:   2016-10-09 10:54:24
* @Last Modified by:   mark
* @Last Modified time: 2016-11-25 15:35:09
*/

// mgtv API 操作
import newData from '../../Datas/mgtv.js';

Page({

    data:{
        title:'王牌',
        loading: true,
        loadtxt: '正在加载',
        bg: '',
        trumpArr: []
    },

    onLoad: function(params){
        let _this = this;

        newData.result({
          url: '/square/love', //替换自己的本地服务器地址
          page: 1,
          count: 10,
          method: 'get',
        }).then( data => {

            let datas = data.data.data;

            this.setData({
                trumpArr: data.data.data,
                // bg : datas[0].picUrl
            })

        // }).catch(e => {

        //     this.setData({
        //         loadtxt: '数据加载异常',
        //         loading: false
        //     })
            
        })

    },

    changeSwiper: function(e){

        let _this = this;
        let index = e.detail.current;

        this.setData({
            bg : _this.data.trumpArr[index].img
        })
    },

    zan(v){
        
        console.log(v.currentTarget.dataset)
        var id = v.currentTarget.dataset.userid
        newData.result({
            url: '/userset/great/zan/' + id, //替换自己的本地服务器地址
            method: 'get'
        }).then( res => {
            console.log(res)
            // if(res.data.status == 400) alert(1)
        })
    },

    goUrl(url){
      wx.navigateTo({
        url: url
      })
    }
})