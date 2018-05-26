/**
 * Created by dongjie on 24/5/18.
 */


import { put, call} from "redux-saga/effects";
import request from "../../utils/request";
import service from "../../utils/service";

// 创建假数据
const votingList = [
    {
        id: 0,
        title: "eosio.sg",
    },
    {
        id: 1,
        title: "meet.one",
    },
    {
        id: 2,
        title: "canon",
    },
    {
        id: 3,
        title: "eoscananda",
    },
];

export function* getVotingList(action) {

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
        yield put({ type: "VOTE_GETLIST_REDUCER", data: votingList });

    } catch (err) {}
}

export function* postVotingList(action) {

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
        yield put({ type: "VOTE_SUBMITLIST_REDUCER", data: action.data });

    } catch (err) {}
}
