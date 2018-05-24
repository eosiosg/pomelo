/**
 * 设置接口域名；
 * 统一管理请求接口；
 * */
const service = {
    ENV: "dev",
    ENVOption: {
        dev: "http://192.168.1.104:1101/",
        pro: "/dpos/v1/",
    },
    API: {
      HomePageGetAllAsset: "user/asset",
    },
};
export default service;
