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

        var data = [{
          age: 1,
          education: "研究生",
          height: 5,
          img: "https://att2.citysbs.com/hangzhou/2018/06/04/05/middle_780x1689-054350_v2_17731528062230438_adce642a0bd92a389345328d55531cd7.jpg"
          , introduce: "神,有较强的动手潜力。。。。"
          , nikeName:
          "张三"
          , sex:
          0
          , tags:
          ["西餐"]
          , userId:
          96
          , zan:
          false
        }]

        this.setData({
          trumpArr: data,
          bg: data[0].img
        })

        newData.result({
          url: 'http://holer.org:65015/square/love', //替换自己的本地服务器地址
          page: 1,
          count: 10
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
      newData.result({
        url: 'http://holer.org:65015/user/great/zan', //替换自己的本地服务器地址
        data: v.currentTarget.dataset.userid
      }).then( res => {
        console.log(res)
      })
    },

    goUrl(url){
      wx.navigateTo({
        url: url
      })
    }
})