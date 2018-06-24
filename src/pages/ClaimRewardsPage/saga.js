/**
 * Created by dongjie on 20/6/18.
 */

import { put, call} from "redux-saga/effects";
import { GetEOS, EOSVoteProducer, EOSGetInfo } from "../../actions/EosAction";

export function* claimRewards(action) {
    try {
        yield put({ type: "CLAIM_ONGOING_REDUCER"});
        const response = yield call(claim, action.data);

        if(response.broadcast){
            yield put({ type: "CLAIM_SUCCESS_REDUCER"});
            yield put({ type: "VOTEINDEX_GETINFO_TRUE_REDUCER", data:{ needGetUserInfo:true }});
            setTimeout(()=>action.data.nav.goBack(),100);
        }else{
            yield put({ type: "CLAIM_FAIL_REDUCER"});
        }
    } catch (err) {
        yield put({ type: "CLAIM_FAIL_REDUCER"});
    }
}

async function claim(account = {}) {
    let eos = await GetEOS(account.accountPrivateKey);
    return eos.claimrewards({'owner':account.accountName}).then((res)=>{
        return res
    }).catch(err=>{
        return []
    });
}