import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { DEVHOST, PROHOST, conmomPrams } from "~/config/index";

declare type Methods = | "GET" | "OPTIONS" | "HEAD" | "POST" | "PUT" | "DELETE" | "TRACE" | "CONNECT";
declare interface Datas {
  method?: Methods;
  [key: string]: any;
}

console.log(process.env.NODE_ENV)
console.log(import.meta.env.MODE + '11')

const baseUrl = process.env.NODE_ENV === "development"
  ? DEVHOST
  : PROHOST;
class HttpRequest {
  public queue: any;
  public constructor() {
    this.queue = {};
  }
  getInsideConfig() {
    const config = {
      baseURL: baseUrl,
      headers: {}
    };
    return config;
  }
  destroy(url: string) {
    delete this.queue[url];
    if (!Object.keys(this.queue).length) {
      // hide loading
    }
  }
  interceptors(instance: any, url?: string) {
    // 请求拦截
    instance
      .interceptors
      .request
      .use((config: AxiosRequestConfig) => {
        // 添加全局的loading...
        if (!Object.keys(this.queue).length) { }
        if (url) {
          this.queue[url] = true;
        }
        return config;
      }, (error: any) => {
        return Promise.reject(error);
      });
    // 响应拦截
    instance
      .interceptors
      .response
      .use((res: AxiosResponse) => {
        if (url) {
          this.destroy(url);
        }
        const { data, status } = res;
        if (data.type == "application/octet-stream") {
          return Object.assign({}, {
            data,
            status
          }, { header: res.headers });
        } else {
          return { data, status };
        }
        return { data, status };
      }, (error: any) => {
        if (url) {
          this.destroy(url);
        }
        if (error && error.request) {
          let status = error.request.status;
          let message = ''
          switch (status) {
            case 401:
              message = "接口配置未经授权！"
              break;
            case 404:
              message = "服务端接口未找到！"
              break;
            case 415:
              message = "HTTP协议不匹配，请确认！"
              break;
            case 500:
              message = "服务器未启动！"
              break;
            default:
              message = "未知错误！"
              break;
          }
          window.$message.error(message, { duration: 2000, closable: true })
        }

        return Promise.reject(error);
      });
  }
  async request(options: AxiosRequestConfig) {
    const instance = axios.create();
    options = Object.assign(this.getInsideConfig(), options);
    await this.interceptors(instance, options.url);
    return instance(options);
  }
}

const $axios = new HttpRequest();

export default $axios as any;
