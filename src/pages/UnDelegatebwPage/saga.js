import { put, call} from "redux-saga/effects";
import request from "../../utils/request";
import service from "../../utils/service";

export function* getUnDelegatebwPageAccountPost() {
  try {
    const response = yield call(getAccount);
    yield put({ type: "UNDELEGATEBW_SETACCOUNTINFO_REDUCER", data: response });
  } catch (err) {}
}
function getAccount() {
  const Eos = require( 'eosjs' );
  const { ecc } = Eos.modules;

  this.accountPrivateKey = '5K6g9pgX6QUqvNinK2CNAScNvq7dc9tqocTUq1X9HvtEj1xdjFq';
  this.accountName = 'eosiomeetone';
  this.accountPublicKey = ecc.privateToPublic( this.accountPrivateKey );
  let nodeAddress = 'http://13.229.70.163:8888';
  const config = {
    keyProvider: this.accountPrivateKey,
    httpEndpoint: nodeAddress,
    expireInSeconds: 60,
    broadcast: true,
    debug: false,
    sign: true
  };
  this.eos = Eos.Testnet( config );
  console.log( '==============get account info==================' );
  return this.eos.getAccount( { 'account_name': this.accountName } ).then( result => {
    console.log( result );
    return result;
  } );
}


export function* getUnDelegatebwPageConfirmPost (action) {
  try {
    yield call(undelegatebw, action);
    // yield put({ type: "DELEGATEBW_SETCURRENCYBALANCE_REDUCER", data: response });
  } catch (err) {}
}
function undelegatebw(action) {
  const Eos = require( 'eosjs' );
  const { ecc } = Eos.modules;

  this.accountPrivateKey = '5K6g9pgX6QUqvNinK2CNAScNvq7dc9tqocTUq1X9HvtEj1xdjFq';
  this.accountName = 'eosiomeetone';
  this.accountPublicKey = ecc.privateToPublic( this.accountPrivateKey );
  let nodeAddress = 'http://13.229.70.163:8888';
  const config = {
    keyProvider: this.accountPrivateKey,
    httpEndpoint: nodeAddress,
    expireInSeconds: 60,
    broadcast: true,
    debug: false,
    sign: true,
    chainId: '706a7ddd808de9fc2b8879904f3b392256c83104c1d544b38302cc07d9fca477',
  };
  this.eos = Eos.Testnet( config );
  console.log( '============== undelegatebw ==================' );
  return this.eos.transaction( tr => {
    tr.undelegatebw(action.data);
  } ).then( function ( result ) {
    console.log( result );
    if (result.broadcast) {
      action.nav.goBack();
    }
  } );
}

