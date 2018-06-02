import { put, call} from "redux-saga/effects";
import { GetEOS } from "../../actions/EosAction";

// getUnDelegatebwPageAccountPost
export function* getUnDelegatebwPageAccountPost(action) {
  try {
    const response = yield call(getAccount, action);
    yield put({ type: "UNDELEGATEBW_SETACCOUNTINFO_REDUCER", data: response });
  } catch (err) {}
}
function getAccount(action) {
  const eos = GetEOS(action.data.accountPrivateKey);
  return eos.getAccount( { 'account_name': action.data.accountName } ).then( result => result );
}

// getUnDelegatebwPageConfirmPost
export function* getUnDelegatebwPageConfirmPost (action) {
  try {
      yield put({type:"UNDELEGATE_ONGOING_REDUCER"});
      let response = yield call(undelegatebw, action);
    if(response){
        yield put({type:"UNDELEGATE_SUCCESS_REDUCER"});
        yield put({ type: "VOTEINDEX_GETINFO_TRUE_REDUCER", data:{ needGetUserInfo:true }});
        action.nav.goBack();
    }
  } catch (err) {
      yield put({type:"UNDELEGATE_FAIL_REDUCER"});
  }
}
function undelegatebw(action) {
  const eos = GetEOS(action.accountPrivateKey);
  return eos.transaction( tr => {
    tr.undelegatebw(action.data);
  } ).then( function ( result ) {
    if (result.broadcast) {
      return result.broadcast
    }
  } );
}

