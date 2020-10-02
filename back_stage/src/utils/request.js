import axios from "axios";

const request = axios.create({
  baseURL: 'http://112.74.111.183:20020/api',
  withCredentials: true,
  // headers: { // 所有请求都需要token值！
  //   Authorization
  // }
})

//请求拦截 
request.interceptors.request.use(function (config) {
  //在这块处理一些 请求拦截时的公共 部分  比如 一个发起请求的时候 需要携带token
  const userInfo = localStorage.getItem('userInfo')
  config.headers.authorization = userInfo.Authorization
  return config;
}, function (error) {
  return Promise.reject(error);
});

//响应拦截
request.interceptors.response.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error)
})


//对axios的二次封装 

// axios中的get请求 -> axios.request(config) config里面所有的配置参数
// axios#get(url[, config]) 其中 [] -> 代表的是 里面的参数可以省略
export async function get(url, data, config = {}) { //参数1：url 参数2：get请求的参数 参数3：配置的参数
  const {
    data: result
  } = await request({
    ...config,
    method: "get",
    url,
    params: data
  })
  return result
}

//post请求
export async function post(url, data, config = {}) {
  const {
    data: result
  } = await request({
    ...config,
    url,
    method: 'post', //post方式
    data
  })
  return result
}

//put请求
export async function put(url, data, config = {}) {
  const {
    data: result
  } = await request.put(url, data, config);
  return result;
}

//remove请求
export async function remove(url, data, config = {}) {
  const {
    data: result
  } = await request.delete(url, {
    ...config,
    params: data
  });

  return result;
}

export default {
  get,
  post,
  put,
  remove
}