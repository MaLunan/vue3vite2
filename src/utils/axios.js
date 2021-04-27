import axios from "axios";
import {ElMessageBox} from 'element-plus';

var instance = axios.create({
    timeout: 30000,
    //baseURL : "/api",
    baseURL : process.env.NODE_ENV === 'production'? '/' :'/api'
    // withCredentials: true,
    // headers: {
    //   'Content-Type': 'application/json; charset=utf-8',
    //   //'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    //   //'X-Requested-With': 'XMLHttpRequest'  
    // }
  });
  
  let loading ;
  var openFullScreen = function() {
    loading = Loading.service({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });
  }
  var closeFullScreen = function(){
    loading.close();
  }
  
  // 添加请求拦截器
  instance.interceptors.request.use(function (config) {
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
    if(!config.noLoading){
      openFullScreen();
    }
  
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
  
  
  // 添加响应拦截器
  instance.interceptors.response.use(function (response) {
    closeFullScreen();
    console.log(response  )
      if(response.config && response.config.responseType == 'blob') { 
        if(response.data.type!=='application/vnd.ms-excel') return false
        ////application/json;charset=utf-8
  // application/vnd.ms-excel;charset=utf-8
  // 'application/octet-stream;charset=utf-8'
             const blob = new Blob([response.data], { type: 'application/json;charset=UTF-8' }); //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
             if(response.config['filename']){
              var filename = decodeURI(response.config['filename']+'.xlsx');
             }else{
              var filename = decodeURI('ecl'+'.xlsx');
             }  
             if ('download' in document.createElement('a')) {
                 const downloadElement = document.createElement('a');
                 let href = '';
                 if(window.URL) href = window.URL.createObjectURL(blob);
                 else href = window.webkitURL.createObjectURL(blob);
             　　 downloadElement.href = href;
             　　 downloadElement.download = filename;
             　　 document.body.appendChild(downloadElement);
             　　 downloadElement.click();
             　　 if(window.URL) window.URL.revokeObjectURL(href);
                 else window.webkitURL.revokeObjectURL(href);
                 document.body.removeChild(downloadElement);
             } else {
                 navigator.msSaveBlob(blob, filename);
             }
             return true;
         }
    //为枚举类型提供
    console.log(response)
    // if(Object.prototype.toString.call(response.data) === '[object Array]'){
    //   console.log(3333333)
    //   return response.data;
    // }
    if(response.data.success){
      return response.data.data;
    }else{
      Message.error(response.data.msg);
      return Promise.reject(response.data.msg);
    }
  }, function (error) {
    // 对响应错误做点什么
    // Do something with response error
    closeFullScreen();
    let res = error.response
    if (error && res) {
      switch (res.status) {
        case 400:
          error.message = '错误请求'
          break
        case 401:
        error.message = '重新定向'
        case 403:
          error.message = '拒绝访问'
          break
        case 404:
          error.message = '请求错误,未找到该资源'
          break
        case 405:
          error.message = '请求方法未允许'
          break
        case 408:
          error.message = '请求超时'
          break
        case 500:
          error.message = '服务器端出错'
          break
        case 501:
          error.message = '网络未实现'
          break
        case 502:
          error.message = '网络错误'
          break
        case 503:
          error.message = '服务不可用'
          break
        case 504:
          error.message = '网络超时'
          break
        case 505:
          error.message = 'http版本不支持该请求'
          break
        default:
          error.message = `连接错误${error.response.status}`
      }
      ElMessageBox({
        message : error.message,
        type : "error"
      });
    }
    return Promise.reject(error);
  });
  export default instance;