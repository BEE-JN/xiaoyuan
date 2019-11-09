//app.js
App({
  onLaunch: function () { // 全局只触发一次，在小程序初始化时

    // 登录
    qq.login({      
      success(res) {
        if (res.code) {
          console.log(res.code)
          // 发起网络请求
          qq.request({
            url: 'https://xiaoyuan.jngcs.top/onlogin',
            data: {
              code: res.code
            },
            success: res => {

            }
          })
        } else {
            console.log('登录失败！' + res.errMsg)
        }
      }
    })

    // 验证本地存储，如果有账户密码，则进入主页，否则进入登录界面
    try {
      const stuid = qq.getStorageSync('stuid')
      const password = qq.getStorageSync('password')
      if (stuid == "" || password == "") {
        qq.reLaunch({
          url: './pages/login/login'
        })
      } else {
        this.globalData.stuid = stuid
        this.globalData.password = password
        qq.reLaunch({
          url: './pages/index/index'
        })
      }
    } catch (e) {
      console.log(e)
    }

    // 获取用户信息
    qq.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          qq.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    stuid: "",
    password: ""
  }
})
