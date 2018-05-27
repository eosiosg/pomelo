import { put, call} from "redux-saga/effects";
import { localSave } from "../../utils/storage";
import Eos from "eosjs"

// 创建假数据
const initData = [

];
export function* getHomeAccountName (action) {
  console.log("action====",action)
  try {
    const response = yield call(getAccountName , action.data)
    console.log("response:",response)
    yield put({ type: "HOME_SETACCOUNTNAMES_REDUCER", data: response.account_names });

  } catch (err) {
    console.log("err:",err)

  }
}
//get privateKey
function getAccountName(Key){
  console.log("Key:",Key)
  let nodeAddress = 'http://52.74.197.107:8888';
  let {ecc} = Eos.modules
  let accountPublicKey = ecc.privateToPublic(Key);
  localSave.setAccountPublicKey(accountPublicKey);
  localSave.setAccountPrivateKey(Key);
  let config = {
    keyProvider: Key, // WIF string or array of keys..
    httpEndpoint: nodeAddress,
//    mockTransactions: () => 'pass', // or 'fail'
//    transactionHeaders: (expireInSeconds, callback) => {
//      callback(null/*error*/, headers)
//    },
    expireInSeconds: 60,
    broadcast: true,
    debug: false,
    sign: true
  };

  let eos = Eos.Testnet(config);

  //try {
  //  const response = yield call(getPrivateKey,privateKey);
  //  yield put({ type: "HOME_SETPRIVATE_REDUCER", data: response });
  //} catch (err) {}

  return eos.getKeyAccounts({'public_key':accountPublicKey}).then((result , error) =>{
      console.log("result:" ,result );
      console.log("error:" ,error );
      return result;
    })

}


//
////获取accountName
//function getAccountName(accountPublicKey) {
//  const Eos = require( 'eosjs' );
//  storage.load({key: accountPublicKey}).then((ret) => {
//    if (!ret) {
//      const accountPublicKey = ret
//    } else {
//      console.log("accountPublicKey get err")
//    }
//  }).catch(err => {
//    console.log("accountPublicKey get err")
//  });
//
//  let nodeAddress = 'http://52.77.224.13:8888';
//  const config = {
//    keyProvider: accountPublicKey,
//    httpEndpoint: nodeAddress,
//    expireInSeconds: 60,
//    broadcast: true,
//    debug: false,
//    sign: true
//  };
//  this.eos = Eos.Testnet( config );
//  console.log( '============== get  getKeyAccounts list==================' );
//  return this.eos.getKeyAccounts({'public_key':accountPublicKey}).then((error,result) =>{
//      console.log( result );
//      return result.rows;
//    })
//    .catch((err)=>{
//      console.log(err)
//    });
//
//}
