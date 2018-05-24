import { takeLatest } from "redux-saga/effects";
import { getHomeAllAsset } from "../pages/HomePage/saga";
/**
 * saga根函数，注册到store中；
 */
export default function* SagaInit() {
    yield takeLatest("HOME_GETALLASSET_POST", getHomeAllAsset);
}
