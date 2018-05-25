import { put, call} from "redux-saga/effects";
import request from "../../utils/request";
import service from "../../utils/service";

// 创建假数据
const initData = [
  {
    id: 0,
    title: "假数据0",
  },
  {
    id: 1,
    title: "假数据1",
  },
  {
    id: 2,
    title: "假数据2",
  },
  {
    id: 3,
    title: "假数据3",
  },
  {
    id: 4,
    title: "假数据4",
  },
  {
    id: 5,
    title: "假数据5",
  },
];
export function* getHomeAllAsset() {
    try {
      // 以下是正式的请求方式，暂不使用
      // // 组装请求数据
      // const requestOption = {
      //     url: service.API.HomePageGetAllAsset,
      //     body: {
      //         method: "get",
      //     },
      // };
      // // 发起异步请求
      // const response = yield call(request, requestOption);
      // // 根据返回数据，渲染结果
      // if (response.code === 0) {
      //     yield put({ type: "HOME_GETALLASSET_REDUCER", response.data });
      // }
      yield put({ type: "HOME_GETALLASSET_REDUCER", data: initData });
    } catch (err) {}
}
