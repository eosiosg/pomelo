import { put, call} from "redux-saga/effects";
import Eos from "eosjs"
import { GetEOS } from "../../actions/EosAction";
import Toast from "react-native-root-toast";
import I18n from "../../../I18n";

const noAccount = I18n.t( "HomePage NoAccountFound" );
const somethingWrong = I18n.t( "HomePage SomethingWrong" );
const invalidPriKey = I18n.t( "HomePage InvalidPrivateKey" );

export function* getHomeAccountName (action) {
  try {
      const response = yield call(getAccountName , action.data);
      if(!response){
        return
      }else if(response.account_names&&response.account_names.length==0){
          Toast.show(noAccount,{
              position: 200,
          });
      }
    yield put({ type: "HOME_SETACCOUNTNAMES_REDUCER", data: response });

  } catch (err) {
      Toast.show(somethingWrong,{
          position: 200,
      });
  }
}
async function getAccountName(privateKey) {
  let {ecc} = Eos.modules;
    let isValidPrivateKey = ecc.isValidPrivate(privateKey);
    if(!isValidPrivateKey){
        Toast.show(invalidPriKey,{
            position: 200,
        });
      return false
    }
  let accountPublicKey = ecc.privateToPublic(privateKey);

  const eos = await GetEOS(privateKey);

  return eos.getKeyAccounts( {'public_key':accountPublicKey} ).then(( result ,error ) => {
      return result;
  }).catch(err=>{

      Toast.show(somethingWrong,{
          position: 200,
      });
      "use strict";
    return err
  });
}

