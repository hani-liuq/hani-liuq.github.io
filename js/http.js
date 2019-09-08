/**
 * url:请求地址
 * data:请求数据
 * config={ //更多配置
 *  sessionToken:''.
 *  ...
 * }
 * */
//get请求
const getRequest = function (url, params, sessionFlag, config) {
    if (config == undefined) {config = {}}
    if (params == undefined) {params = {}}
    if (sessionFlag == undefined) {sessionFlag == false}
    config.method = 'get'
    return _http(url, params, config)
};
//post 请求
const postRequest = function (url, data, sessionFlag, config) {
    if (config == undefined) {config = {}}
    if (data == undefined) {data = {}}
    config.method = 'post'
    return _http(url, data, config)
};
 
const _http = function (u,p,c){
    const config = {
        baseURL: apiServer,
        url: u + '?_time=' + new Date().getTime(),
        // `transformRequest` 允许在向服务器发送前，修改请求数据
        // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
        // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
        transformRequest: [function (data) {
            // 对 data 进行任意转换处理
            if (typeof data === 'string') {
                try {
                    data = JSON.parse(data)
                } catch (e) { /* Ignore */ }
            }
            let ret = '';
            for (let it in data) {
                ret += it + '=' + data[it] + '&';
            }
            return ret.substring(0, ret.length - 1)
        }],
        // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
        transformResponse: [function (data) {
            // 对 data 进行任意转换处理
            if (typeof data === 'string') {
                try {
                    data = JSON.parse(data)
                } catch (e) { /* Ignore */ }
            }
            return data;
        }],
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type' : 'application/x-www-form-urlencoded;charset=UTF-8'
        },// `headers` 是即将被发送的自定义请求头
        timeout: 120000,//超时时间，毫秒
        responseType: 'json', // 默认的
        maxContentLength: 2000, // `maxContentLength` 定义允许的响应内容的最大尺寸
    }
    if('post' == c.method){
        config.method = 'post'
        config.data=p// `data` 是作为请求主体被发送的数据  POST 请求使用
    }else{
        config.method = 'get'
        config.params=p //params 链接请求参数 get请求使用
    }
    return new Promise((resolve, reject) => {
        axios(config).then(res=>{
            // 这里可以做全局异常判断 。。
            resolve(res.data)
        }).catch(err=>{
            reject(err)
        })
    })
}