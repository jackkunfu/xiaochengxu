/*
* @Author: mark
* @Date:   2016-09-27 17:33:45
* @Last Modified by:   mark
* @Last Modified time: 2017-01-13 15:21:36
*/

// mgtv API 操作
import REQ from '../Datas/mgtv.js';

//创建精选页面对象
Page({

    data: {
        loading: true,
        loadtxt: '正在加载',
        currentId: '1001',
        banners: [],
        RollLink: [],
        AvatorText: [],
        isLogin: getApp().globalData.hasLogin,
        newList: [],
        // section: [
        //     {name : '精选',id : '1001'},{name : '黄金单身汉',id : '1032'},
        //     {name : '综艺',id : '1003'},{name : '电视剧',id : '1004'},
        //     {name : '电影',id : '1005'},{name : '少儿',id : '1021'}
        // ]
    },

    isEmptyObject: function(e){ //判断Object对象是否为空

        let t;  

        for (t in e)  
            return !1;  
        return !0 

    },

    onLoad: function(params){
      // console.log(this.data.isLogin)

      this.login()

      // wx.redirectTo({
      //   url: 'pages/trump/trump'　　// 页面
      // })

        let _this = this;

      //   wx.getUserInfo({
      //     withCredentials: true,
      //     success: function(data){
      //       console.log('user')
      //       console.log(data)
      //     }
      // })
        
        // REQ.result({
        //   url: 'http://holer.org:65015/square/love', //替换自己的本地服务器地址
        //   data: {
        //     page: 2,
        //     count: 10
        //   }
        // }).then( res => {
        //   console.log(res.data)
        //     // let datas = data.data.data,
        //     //     bannerData = [],
        //     //     AvatorData = [],
        //     //     RollData = [],
        //     //     lists = [],
        //     //     obj = {};  
        //     // for (let i = 0; i < datas.length-10; i++) { // -20 是因为接口是按照M站的接口给的，为了避免一些接口数据格式问题,实际开发不需要-10

        //     //     if( datas[i].type == 'banner' ){
        //     //         bannerData = datas[i].templateData;
        //     //     }

        //     //     if( datas[i].type == 'roundAvatorText' ){
        //     //         AvatorData = datas[i].templateData;
        //     //     }

        //     //     if( datas[i].type == 'textRollLink' ){
        //     //         RollData = datas[i].templateData;
        //     //     }

        //     //     if( datas[i].type == 'title' ||
        //     //         datas[i].type == 'normalLandScape' ||
        //     //         datas[i].type == 'largeLandScapeNodesc' ||
        //     //         datas[i].type == 'textMoreLink' ||
        //     //         datas[i].type == 'normalLandScapeNodesc' &&
        //     //         datas[i].templateData.length ){

        //     //         if( datas[i].type == 'title' ){

        //     //             if(!_this.isEmptyObject(obj)){
        //     //                 lists.push(obj);
        //     //                 obj = {};
        //     //                 obj.indexs = i;
        //     //             }                     

        //     //             if( datas[i+1].type == 'largeLandScapeNodesc' ){
        //     //                 obj.type = 'big';
        //     //                 obj.name1 = datas[i].templateData[0].name;
        //     //                 obj.name2 = datas[i+1].templateData[0].name;
        //     //                 obj.bigPic = datas[i+1].templateData[0].picUrl;
        //     //             }else{
        //     //                 obj.title = datas[i].templateData[0].name;
        //     //                 obj.type = 'small';
                            
        //     //             }
                    
        //     //             obj.more = datas[i].templateData[0]['jumpChannel'] ? true : false;
        //     //             obj.list = [];

        //     //         }

        //     //         if( datas[i].type == 'textMoreLink' ){
        //     //             obj.links = datas[i].templateData[0].name;
        //     //         }

        //     //         if( datas[i].type == 'normalLandScape' ||
        //     //             datas[i].type == 'normalLandScapeNodesc'){      
        //     //             obj.list =  obj.list.concat(datas[i].templateData);
        //     //         }

        //         // }

        //     // }        
        //   console.log('res.data')
        //     console.log(res.data.data)

        //     this.setData({
        //         loading: true,
        //         loadtxt: '来了来了',
        //         // banners: bannerData,
        //         // RollLink: RollData,
        //         // AvatorText: AvatorData,
        //         newList: Object.assign([], res.data.data)
        //     })

        //     console.log('this.data.newList')
        //     console.log(this.data.newList)
        // }).catch(e => {

        //     this.setData({
        //         loadtxt: '数据加载异常',
        //         loading: false
        //     })

        //     console.error(e);
        // });

    },

    handleTap: function(e){

        console.log(e);
        let id = e.currentTarget.id;

        if(id){
            this.setData({ currentId: id })
            this.onLoad();
        }

    },

    getUserInfo(data){
      console.log('user data')
      console.log(data)
      getApp().globalData.hasLogin = true
      this.setData({isLogin:true})
      getApp().globalData.userInfo = data.detail.userInfo
      console.log(getApp().globalData.userInfo)
    },


    getMessage(id){

    },

    login(){
        console.log(1)
        var that = this
        wx.getStorage({
            key: 'userId',
            success: function (res) {
                console.log(res)
                that.getMessage.call(that, res)
            },
            fail: function(){
                that.wxLogin.call(that)
            }
        })
    },

    wxLogin(){
        wx.login({
            success: res => {
                if (res.code) {
                    wx.getUserInfo({
                        withCredentials: true,
                        success: res_user => {
                            this.loading = false
                            REQ.result({
                            url: 'http://holer.org:65015/wx/login', //替换自己的本地服务器地址
                            data: {
                                code: res.code,
                                encryptedData: res_user.encryptedData,
                                iv: res_user.iv
                            }
                            }).then(user => {
                            console.log('user')
                            console.log(user)
                            if (!user) {
                                this.loadtxt = '请求失败'
                                setTimeout(() => { this.loading = true }, 200)
                                return
                            }

                            wx.setStorage({
                                key: "token",
                                data: user.data.data
                            })
                            wx.setStorage({
                                key: "userId",
                                data: user.data.id
                            })

                            getApp().globalData.token = user.data.data
                            console.log('user.data.data')
                            console.log(user.data.data)
                            console.log(getApp().globalData.token)
                            })

                        }
                    })
                }
            }
        })
    }
})