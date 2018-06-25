/*
* @Author: mark
* @Date:   2016-10-09 10:54:24
* @Last Modified by:   mark
* @Last Modified time: 2016-10-10 17:38:52
*/

// mgtv API 操作
import REQ from '../../Datas/mgtv.js';

Page({
    data: {
        userInfo: {
            nickname: '斗战胜佛',
            avatarUrl: '../../image/code.png',
            myLove: 0,
            togetherLove: 0,
            loveMe: 0
        },
        list: [{
            text: '我的相册',
            img: '',
            value: '',
            url: '../photo/photo'
        }, {
            text: '我的动态',
            img: '',
            value: ''
        }, {
            text: '邀请好友',
            img: '',
            value: ''
        }, {
            text: '意见反馈',
            img: '',
            value: ''
        }, {
            text: '关于我们',
            img: '',
            value: ''
        }]
    },

    getUserInfo () {
        wx.getUserInfo({
            success (res) {
                console.log(res)
                that.setData({ userInfo: res.userInfo })
            }
        })
    },

    onLoad (params) {
        // wx.login({
        //     success (res) {
        //         if (res.code) {
        //             console.log('登录成功！' + res.code)
        //         } else {
        //             console.error('获取用户登录态失败！' + res.errMsg)
        //         }
        //     }
        // })

        var that = this
        wx.getStorage({
            key: 'token',
            success: res => {
                if (res && res.data){
                    console.log('拿到token')
                    console.log(res)
                    this.fetchUsrInfo(res.data)
                }
                else{
                    console.log('拿到token为空，重登')
                    this.wxLogin()
                }
            },
            fail: () => {
                this.wxLogin()
            }
        })
    },

    getImage(){
      wx.chooseImage()
    },


    wxLogin() {
        wx.login({
            success: res => {
                if (res.code) {
                    wx.getUserInfo({
                        withCredentials: true,
                        success: res_user => {
                            this.loading = false
                            REQ.result({
                                url: REQ.baseUrl+'/wx/login', //替换自己的本地服务器地址
                                data: {
                                    code: res.code,
                                    encryptedData: res_user.encryptedData,
                                    iv: res_user.iv
                                }
                            }).then(user => {
                                console.log('wxLogin')
                                console.log(user)
                                if (!user) {
                                    this.loadtxt = '请求失败'
                                    setTimeout(() => { this.loading = true }, 200)
                                    return
                                }

                                var token = user.data.data

                                this.fetchUsrInfo(token)

                                wx.setStorage({
                                    key: "token",
                                    data: token
                                })
                                wx.setStorage({
                                    key: "userId",
                                    data: user.data.id
                                })

                                getApp().globalData.token = token
                                // console.log('user.data.data')
                                // console.log(token)
                                // console.log(getApp().globalData.token)
                            })

                        }
                    })
                }
            }
        })
    },

    fetchUsrInfo(token){
        REQ.result({
            url: 'http://holer.org:65015/user/userTokenByInfo', //替换自己的本地服务器地址
            data: token
        }).then(user => {
            console.log('fetchUsrInfo')
            console.log(user)
            if (user.data.status == 201) return this.wxLogin()
            this.setData({
                userInfo: user.data.data
            })
        })
    }

})
