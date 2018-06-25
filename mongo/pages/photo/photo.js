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

    getList(){
        REQ.result({
            url: REQ.baseUrl + '/user/userTokenByPhoto', //替换自己的本地服务器地址
            data: {}
        }).then(res => {

        })
    },

    upfile(){
        wx.chooseImage({
            success: (res) => {
                var tempFilePaths = res.tempFilePaths
                wx.uploadFile({
                    url: REQ.baseUrl+'/pic/upload',
                    filePath: tempFilePaths[0],
                    name: 'file',
                    formData: {
                        // 'user': 'test'
                    },
                    success:  (res) => {
                        var data = res.data ? JSON.parse(res.data).data : ''
                        if(!data) return
                        var list = this.data.list
                        list.push(data)
                        this.setData({
                            list
                        })
                        REQ.result({
                            url: REQ.baseUrl+'/userphoto/save/photo', //替换自己的本地服务器地址
                            data: [data]
                        }).then(res => {

                        })
                        //do something
                    }
                })
            }
        })
    }

})