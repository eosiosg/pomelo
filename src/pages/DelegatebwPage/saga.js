import { put, call} from "redux-saga/effects";
import { GetEOS } from "../../actions/EosAction";

// getDelegatebwPageAccountInfoPost
export function* getDelegatebwPageAccountInfoPost(action) {
  try {
    const response = yield call(getAccount, action);
    yield put({ type: "DELEGATEBW_SETACCOUNTINFO_REDUCER", data: response });
  } catch (err) {}
}
async function getAccount(action) {
  const eos =await GetEOS(action.data.accountPrivateKey);
  return eos.getAccount( { 'account_name': action.data.accountName } ).then( result => {
    return result;
  } );
}

// getDelegatebwPageCurrencyBalancePost
export function* getDelegatebwPageCurrencyBalancePost (action) {
  try {
    const response = yield call(getCurrencyBalance, action);
    yield put({ type: "DELEGATEBW_SETCURRENCYBALANCE_REDUCER", data: response });
  } catch (err) {}
}
async function getCurrencyBalance(action) {
  const eos = await GetEOS(action.data.accountPrivateKey);
  return eos.getCurrencyBalance( {
    "code": "eosio.token",
    "account": action.data.accountName,
  } ).then( ( res ) => {
    const balance = Number(res[0].split(' ')[0]);
    return balance;
  } );
}

// getDelegatebwPageConfirmPost
export function* getDelegatebwPageConfirmPost (action) {
  try {
    yield put({type:"DELEGATE_ONGOING_REDUCER"});
    let result = yield call(delegatebw, action);
    if(result){
        yield put({ type: "DELEGATE_SUCCESS_REDUCER"});
        yield put({ type: "VOTEINDEX_GETINFO_TRUE_REDUCER", data:{ needGetUserInfo:true }});
        setTimeout(()=>action.nav.goBack(),100);
      }
  } catch (err) {
      yield put({ type: "DELEGATE_FAIL_REDUCER"});
  }
}
async function delegatebw(action) {
  const eos = await GetEOS(action.accountPrivateKey);
  return eos.transaction( tr => {
    tr.delegatebw(action.data);
  } ).then( function ( result ) {
    return result
  });
}
