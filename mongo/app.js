/*
* @Author: mark
* @Date:   2016-09-27 16:27:19
* @Last Modified by:   mark
* @Last Modified time: 2016-09-29 10:17:44
*/
App(
    {
        onLaunch: function () {
          console.log('芒果TV 初始化成功')
          
        },
        onShow: function () {
            console.log('页面显示')
            // wx.redirectTo({
            //   url: 'pages/trump/trump'　　// 页面
            // })
        },
        onPageNotFound(res) {
            // 如果是 tabbar 页面，请使用 wx.switchTab
            // 如果不是 tabbar 页面，请使用 wx.redirectTo
            wx.switchTab({
                url: 'pages/trump/trump'
            })
        },
        onHide: function () {
            console.log('页面隐藏')

        },
        globalData: {
            hasLogin: false,
            userInfo: null,
            token: null
        }
    }
)

var appInstance = getApp()
// console.log(appInstance) // I am global data
