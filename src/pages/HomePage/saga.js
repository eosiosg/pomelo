import { put, call} from "redux-saga/effects";
import { localSave , storage } from "../../utils/storage";
import Eos from "eosjs"
import { GetEOS } from "../../actions/EosAction";

// 创建假数据
let accountPrivateKey = ''
let accountName = ''
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

export function* getHomeAccountName (action) {
  console.log("action====",action)
  try {
    const response = yield call(getAccountName , action.data)
    yield put({ type: "HOME_SETACCOUNTNAMES_REDUCER", data: response });
    yield put({ type: "HOME_SETACCOUNTNAMESERR_REDUCER", data: true });

  } catch (err) {
    console.log("err:",err)
    yield put({ type: "HOME_SETACCOUNTNAMESERR_REDUCER", data: false });

  }
}
function getAccountName(data) {
  let {ecc} = Eos.modules
  let accountPublicKey = ecc.privateToPublic(data);
  const eos = GetEOS(data);
  return eos.getKeyAccounts( {'public_key':accountPublicKey} ).then(( result ,error ) => {
    console.log("error:",error)
    return result;
  }).catch(err=>{
    "use strict";
    return err
  });
}
