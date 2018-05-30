import { put, call} from "redux-saga/effects";
import Eos from "eosjs"
import { GetEOS } from "../../actions/EosAction";

export function* getHomeAccountName (action) {
    try {
        yield put({ type: "HOME_SETACCOUNTNAMESERR_REDUCER", data: false });
    } catch (err) {
        yield put({ type: "HOME_SETACCOUNTNAMESERR_REDUCER", data: true });

    }
}