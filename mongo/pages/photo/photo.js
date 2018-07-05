/*
* @Author: mark
* @Date:   2016-10-08 12:25:29
* @Last Modified by:   mark
* @Last Modified time: 2016-11-25 15:35:19
*/

// mgtv API 操作
import REQ from '../../Datas/mgtv.js';

Page({
    data:{
        list: []
    },

    onLoad: function(params){
        this.getList()
    },

    delPhoto(v){
        console.log(v.currentTarget.dataset)
        console.log(v.currentTarget.dataset)
        var url = v.currentTarget.dataset.url
        REQ.result({
            url: '/userphoto/delete', //替换自己的本地服务器地址
            data: {
                photoUrl: url
            },
            method: 'post'
        }).then(res => {
            this.getList()
        })
    },

    getList(){
        REQ.result({
            url: '/userphoto/userTokenByPhoto', //替换自己的本地服务器地址
            data: {},
            method: 'get'
        }).then(res => {
            this.setData({
                list: res.data.data
            })
        })
    },

    upfile(){
        var allList = this.data.list
        if(allList.length == 6){
            wx.showToast({
                title: '最多只能6张',
            })
            return
        }
        wx.chooseImage({
            success: (res) => {
                var tempFilePaths = res.tempFilePaths
                wx.uploadFile({
                    url: REQ.baseUrl +'/pic/upload',
                    filePath: tempFilePaths[0],
                    name: 'file',
                    formData: {
                        // 'user': 'test'
                    },
                    success:  (res) => {
                        var data = res.data ? JSON.parse(res.data).data : ''
                        if(!data) return
                        
                        console.log(this.data.list)
                        var arr = []
                        arr.push(data)
                        REQ.result({
                            url: '/userphoto/save/photo', //替换自己的本地服务器地址
                            data: {
                                data: JSON.stringify(arr)
                            }
                        }).then(res => {
                            allList.push(data)
                            this.setData({
                                list: allList
                            })
                        })
                        //do something
                    }
                })
            }
        })
    }

})