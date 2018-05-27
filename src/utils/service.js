/**
 * 设置接口域名；
 * 统一管理请求接口；
 * */
const service = {
    ENV: "dev",
    ENVOption: {
        dev: "http://13.229.70.163:8888/",
        pro: "http://13.229.70.163:8888/",
    },
    API: {
      HomePageGetAllAsset: "user/asset",
      EOSPriceGet : "https://api.coinmarketcap.com/v2/ticker/1765/?convert=USD"
    },
};
export default service;
