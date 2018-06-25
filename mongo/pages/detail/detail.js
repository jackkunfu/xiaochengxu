import newData from '../../Datas/mgtv.js';
Page({
    data: {
        userInfo: {
            ask: ['a', 'b', 'c']
        },
        ask: [{ it: 'a' }, { it: 'a' }, { it: 'a' }, { it: 'a' }]
    },

    onLoad(params) {
        // console.log(params)
        this.userInfo(params.id || 90)
        console.log(1)
        // wx.showLoading({
        //   title: '加载中',
        // })

        // setTimeout(function () {
        //   wx.hideLoading()

        //   wx.showToast({
        //       title: '成功',
        //       icon: 'success',
        //       duration: 2000
        //   })
        // }, 2000)

    },

    userInfo(id) {
        newData.result({
        url: 'http://holer.org:65015/user/userinfo', //替换自己的本地服务器地址
        data: id
        }).then(res => {
            var data = res.data
            var userInfo = {
                basic: {
                    name: data.userInfoVo.nikename,
                    sex: data.userInfoVo.nikename,
                    introduce: data.introduce,
                    img: data.imgS[0] || ''
                },
                imgs: data.imgS,
                self: this.getValues(data.userLovePlabVo),
                ask: this.getValues(data.userLikeVo),
                work: this.getValues(data.userSchollWorkVo),
                // work: 
            }
            console.log(userInfo)
            this.setData({
                userInfo: userInfo
            })
        })
    },

    getValues(obj){
        var arr = []
        Object.keys(obj).forEach(el=>{
            arr.push(obj[el])
        })
        return arr
    }

})
