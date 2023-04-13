import { Cfetch, interceptors } from './fetch'
// 这里是我项目使用到的js-cookie库，主要是为了拿到token，你们这里改成你们获取token的方式即可
// import Cookies from 'js-cookie'

/**
 * config 自定义配置项
 * @param withoutCheck 不使用默认的接口状态校验，直接返回 response
 * @param returnOrigin 是否返回整个 response 对象，为 false 只返回 response.data
 * @param showError 全局错误时，是否使用统一的报错方式
 * @param canEmpty 传输参数是否可以为空
 * @param mock 是否使用 mock 服务
 * @param timeout 接口请求超时时间，默认10秒
 */
let configDefault = {
  showError: true,
  canEmpty: false,
  returnOrigin: false,
  withoutCheck: false,
  mock: false,
  timeout: 10000,
  responseType: 'json',
}

// 添加请求拦截器
interceptors.request.use((config) => {
  // 这里是我项目使用到的js-cookie库，主要是为了拿到token，你们这里改成你们获取token的方式即可
  // const token = Cookies.get('access_token')
  configDefault = Object.assign({
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      // authorization: `Bearer ${token}`
    },
  }, configDefault, config)
  console.log('添加请求拦截器 configDefalut ==>', configDefault)
  return configDefault
})

// 添加响应拦截器
interceptors.response.use(async response => {
  console.log('拦截器response ==>', response)
  console.log('configDefault', configDefault)

  // TODO: 这里是复制一份结果处理，在这里可以做一些操作
  const res = await resultReduction(response.clone())

  // HTTP 状态码 2xx 状态入口，data.code 为 200 表示数据正确，无任何错误
  if (response.status >= 200 && response.status < 300) {
    return response
  } else { // 非 2xx 状态入口
    if (configDefault.withoutCheck) { // 不进行状态状态检测
      return Promise.reject(response)
    }
    return Promise.reject(response)
  }
})

// 结果处理，fetch请求响应结果是promise，还得处理
async function resultReduction(response) {
  let res = ''
  switch (configDefault.responseType) {
    case 'json':
      res = await response.json()
      break
    case 'text':
      res = await response.text()
      break
    case 'blod':
      res = await response.blod()
      break
    default:
      res = await response.json()
      break
  }
  console.log('结果处理', res)
  return res
}

function request(method, path, data) {
  let myInit = {
    method,
    ...configDefault,
    // ...config,
    body: JSON.stringify(data),
  }
  if (method === 'GET') {
    let params = ''
    if (data) {
      // 对象转url参数
      const dataCopy: any = JSON.stringify(data);
      params = dataCopy.replace(/:/g, '=').replace(/"/g, '').replace(/,/g, '&').match(/\{([^)]*)\}/)[1]
    }
    return Cfetch(`${path}?${params}`, {
      ...configDefault,
      // ...config,
    })
  }

  return Cfetch(path, myInit)
}

const fetchApi = {
  get(path, data) {
    return request('GET', path, data)
  },
  post(path, data) {
    return request('POST', path, data)
  },
  put(path, data) {
    return request('PUT', path, data)
  },
  del(path, data) {
    return request('DELETE', path, data)
  }
}
// // get请求方法使用封装
// function get(path, data, config) {
//   return request('GET', path, data, config)
// }

// // post请求方法使用封装
// function post(path, data, config) {
//   return request('POST', path, data, config)
// }

// // put请求方法使用封装
// function put(path, data, config) {
//   return request('PUT', path, data, config)
// }

// // delete请求方法使用封装
// function del(path, data, config) {
//   return request('DELETE', path, data, config)
// }

// export default {
//   fetch: Cfetch,
//   get,
//   post,
//   put,
//   delete: del
// }

export default fetchApi;