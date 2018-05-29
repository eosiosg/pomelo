import { put, call} from "redux-saga/effects";
import Eos from "eosjs"
import { GetEOS } from "../../actions/EosAction";

export function* getHomeAccountName (action) {
  try {
    const response = yield call(getAccountName , action.data);
    yield put({ type: "HOME_SETACCOUNTNAMES_REDUCER", data: response });
    yield put({ type: "HOME_SETACCOUNTNAMESERR_REDUCER", data: false });

  } catch (err) {
    yield put({ type: "HOME_SETACCOUNTNAMESERR_REDUCER", data: true });

  }
}
function getAccountName(data) {
  let {ecc} = Eos.modules;
  let accountPublicKey = ecc.privateToPublic(data);
  const eos = GetEOS(data);
  return eos.getKeyAccounts( {'public_key':accountPublicKey} ).then(( result ,error ) => {
    return result;
  }).catch(err=>{
    "use strict";
    return err
  });
}
