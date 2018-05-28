import { put, call} from "redux-saga/effects";
import { GetEOS } from "../../actions/EosAction";
import {storage} from "../../utils/storage";

let accountPrivateKey = '5K6g9pgX6QUqvNinK2CNAScNvq7dc9tqocTUq1X9HvtEj1xdjFq';
let accountName = "meetone33333";
// 缓存中获取accountPublicKey 和 accountName
storage.load({key: "accountPrivateKey"}).then((ret) => {
  if (ret) {
    accountPrivateKey = ret
  } else {
    console.log("ret:",ret)
  }
}).catch(err => {
  console.log("err:",err)
});
storage.load({key: "accountName"}).then((ret) => {
  if (ret) {
    accountName = ret
  } else {
    console.log("ret:",ret)
  }
}).catch(err => {
  console.log("err:",err)
});

// getUnDelegatebwPageAccountPost
export function* getUnDelegatebwPageAccountPost() {
  try {
    const response = yield call(getAccount);
    yield put({ type: "UNDELEGATEBW_SETACCOUNTINFO_REDUCER", data: response });
  } catch (err) {}
}
function getAccount() {
  const eos = GetEOS(accountPrivateKey);
  return eos.getAccount( { 'account_name': accountName } ).then( result => result );
}

// getUnDelegatebwPageConfirmPost
export function* getUnDelegatebwPageConfirmPost (action) {
  try {
    yield call(undelegatebw, action);
  } catch (err) {}
}
function undelegatebw(action) {
  const eos = GetEOS(accountPrivateKey);
  return eos.transaction( tr => {
    tr.undelegatebw(action.data);
  } ).then( function ( result ) {
    if (result.broadcast) {
      action.nav.goBack();
    }
  } );
}

