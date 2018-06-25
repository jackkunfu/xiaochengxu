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
        
    },

    upfile(){
        wx.chooseImage({
            success: function (res) {
                var tempFilePaths = res.tempFilePaths
                wx.uploadFile({
                    url: REQ.baseUrl+'/pic/upload',
                    filePath: tempFilePaths[0],
                    name: 'file',
                    formData: {
                        // 'user': 'test'
                    },
                    success: function (res) {
                        var data = res.data
                        console.log(data)
                        //do something
                    }
                })
            }
        })
    }

})