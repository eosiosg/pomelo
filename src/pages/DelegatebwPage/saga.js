import { put, call} from "redux-saga/effects";
import request from "../../utils/request";
import service from "../../utils/service";
export function* getDelegatebwPageAccountInfoPost() {
  try {
    const response = yield call(getAccount);
    yield put({ type: "DELEGATEBW_SETACCOUNTINFO_REDUCER", data: response });
  } catch (err) {}
}
function getAccount() {
  const Eos = require( 'eosjs' );
  const { ecc } = Eos.modules;

  this.accountPrivateKey = '5K6g9pgX6QUqvNinK2CNAScNvq7dc9tqocTUq1X9HvtEj1xdjFq';
  this.accountName = 'eosiomeetone';
  this.accountPublicKey = ecc.privateToPublic( this.accountPrivateKey );
  let nodeAddress = 'http://52.77.224.13:8888';
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
export function* getDelegatebwPageCurrencyBalancePost () {
  try {
    const response = yield call(getCurrencyBalance);
    yield put({ type: "DELEGATEBW_SETCURRENCYBALANCE_REDUCER", data: response });
  } catch (err) {}
}
function getCurrencyBalance() {
  const Eos = require( 'eosjs' );
  const { ecc } = Eos.modules;

  this.accountPrivateKey = '5K6g9pgX6QUqvNinK2CNAScNvq7dc9tqocTUq1X9HvtEj1xdjFq';
  this.accountName = 'eosiomeetone';
  this.accountPublicKey = ecc.privateToPublic( this.accountPrivateKey );
  let nodeAddress = 'http://52.77.224.13:8888';
  const config = {
    keyProvider: this.accountPrivateKey,
    httpEndpoint: nodeAddress,
    expireInSeconds: 60,
    broadcast: true,
    debug: false,
    sign: true
  };
  this.eos = Eos.Testnet( config );
  console.log( '==============get currency balance==================' );
  return this.eos.getCurrencyBalance( {
    "code": "eosio.token",
    "account": this.accountName,
  } ).then( ( res ) => {
    console.log( res );
    const balance = Number(res[0].replace("EOS", ""));
    return balance;
  } );
}
export function* getDelegatebwPageConfirmPost (action) {
  try {
    yield call(delegatebw, action);
    // yield put({ type: "DELEGATEBW_SETCURRENCYBALANCE_REDUCER", data: response });
  } catch (err) {}
}
function delegatebw(action) {
  const Eos = require( 'eosjs' );
  const { ecc } = Eos.modules;

  this.accountPrivateKey = '5K6g9pgX6QUqvNinK2CNAScNvq7dc9tqocTUq1X9HvtEj1xdjFq';
  this.accountName = 'eosiomeetone';
  this.accountPublicKey = ecc.privateToPublic( this.accountPrivateKey );
  let nodeAddress = 'http://52.77.224.13:8888';
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
  console.log( '============== delegatebw ==================' );
  return this.eos.transaction( tr => {
    tr.delegatebw(action.data);
  } ).then( function ( result ) {
    console.log( result );
    // action.nav.navigate("VoteIndexPage");
  } );
}
