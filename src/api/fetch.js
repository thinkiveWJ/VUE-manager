import Vue from 'vue'
// ajax请求
import axios from 'axios'
let $axios = axios.create({
  baseURL: ' https://www.easy-mock.com/mock/5992bdbba1d30433d862a3ba/api/',
  timeout: 12000
})
Vue.prototype.$axios = $axios
function ajax (that, params, callback) {
  params['method'] = 'post'
//params['headers'] = params['headers'] ? params['headers'] : {}
//params['headers']['token'] = sessionStorage.getItem('token')
//params['headers']['origin-type'] = 'web'
  params['data'] = params['data'] ? params['data'] : {}
  // params['data'] = JSON.stringify(params['data'])
  return new Promise((resolve, reject) => {
    that.$axios(params).then(response => {
    	that.loading = false
      let res = response['data']
      let errorCode = res['errorCode']
      if (typeof res === 'string') {
        if (res.indexOf('errorCode=100') > -1 || res.indexOf('errorCode=-1') > -1) {
          return that.$router.push({path: '/'})
        }
        return that.$notify.error({
          message: res
        })
      } else if (errorCode !== 0) {
      	return that.$notify.error({
          message: res['msg']
        })
      }
      callback && typeof callback === 'function' && callback(res)
    }).catch((error) => {
      reject(error)
    })
  })
}
Vue.prototype.$ajax = ajax