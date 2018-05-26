import { put } from "redux-saga/effects";

export function* getNodeListAllAsset() {
    const initData = [];

    for ( let index = 0; index < 30; index++ ) {
        initData.push( {
            id: index,
            title: "MEET.ONE " + index,
            website: "http://meet.one",
            description: '20% voter choose'
        } )
    }

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

        yield put( { type: "HOME_GETALLASSET_REDUCER", data: initData } );

    } catch ( err ) {
    }
}
