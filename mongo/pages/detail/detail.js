import newData from '../../Datas/mgtv.js';
Page({
    data: {
        userInfo: {
            // ask: []
        }
    },

    onLoad(params) {
        console.log(params)
        wx.showLoading({
            title: '加载中',
        })
        this.userInfo(params.id)
        //   wx.showToast({
        //       title: '成功',
        //       icon: 'success',
        //       duration: 2000
        //   })
    },

    userInfo(id) {
        newData.result({
        url: '/user/userinfo', //替换自己的本地服务器地址
        data: id
        }).then(res => {
            wx.hideLoading()
            var data = res.data.data || {}
            console.log(data)
            var userInfo = {
                basic: {
                    name: data.userInfoVo.nikename,
                    sex: data.userInfoVo.nikename,
                    introduce: data.introduce,
                    img: data.imgS[0] || '',
                    tags: data.tagS || []
                },
                imgs: data.imgS,
                self: this.getValues(data.userLovePlabVo),
                ask: this.getValues(data.userLikeVo),
                work: this.getValues(data.userSchollWorkVo),
                family: this.getValues(data.userFamilyVo)
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
            arr.push({
                k: el,
                v: obj[el]
            })
        })
        return arr
    }

})
