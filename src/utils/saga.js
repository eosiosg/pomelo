import { takeLatest } from "redux-saga/effects";
import { getHomeAllAsset } from "../pages/HomePage/saga";
import { getNodeListAllAsset } from "../pages/NodeListPage/saga";
import { getVotingList } from "../pages/VotePage/saga";
/**
 * saga根函数，注册到store中；
 */
export default function* SagaInit() {
    yield takeLatest("HOME_GETALLASSET_POST", getHomeAllAsset);
    yield takeLatest("NODE_LIST_GET_ALL_ASSET_POST", getNodeListAllAsset);
    yield takeLatest("VOTE_LIST_REDUCER", getVotingList);
}