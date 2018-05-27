import { put, call} from "redux-saga/effects";
import request from "../../utils/request";
import service from "../../utils/service";
export function* getVoteIndexPageAccountInfoPost() {
    try {
      const response = yield call(getAccount);
      yield put({ type: "VOTEINDEX_SETACCOUNTINFO_REDUCER", data: response });
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
  return this.eos.getAccount( { 'account_name': this.accountName } ).then( result => {
    console.log( '==============get account info==================' );
    console.log( result );
    return result;
  } );
}
export function* getVoteIndexPageCurrencyBalancePost () {
  try {
    const response = yield call(getCurrencyBalance);
    yield put({ type: "VOTEINDEX_SETCURRENCYBALANCE_REDUCER", data: response });
  } catch (err) {}
}
function getCurrencyBalance() {
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
  return this.eos.getCurrencyBalance( {
    "code": "eosio.token",
    "account": this.accountName,
  } ).then( ( res ) => {
    console.log( '==============get currency balance==================' );
    console.log( res );
    const balance = Number(res[0].replace(" SYS", ""));
    return balance;
  } );
}
export function* getVoteIndexPageRefundsPost () {
  try {
    const response = yield call(getRefunds);
    yield put({ type: "VOTEINDEX_SETREFUNDS_REDUCER", data: response });
  } catch (err) {}
}
function getRefunds() {
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
  return this.eos.getTableRows({
    'json': true,
    'code': 'eosio',
    'scope': 'eosiomeetone',
    'table': 'refunds',
    'table_key': 'owner'
  }).then(function (result) {
    console.log( '==============get Refunds==================' );
    console.log(result);
    const refunds = result.rows[0] ? Number(result.rows[0].cpu_amount.replace(" SYS", ""))+Number(result.rows[0].net_amount.replace(" SYS", "")) : 0;
    return refunds;
  });
}

export function* getVoteIndexPageBpsPost () {
  try {
    const response = yield call(getBps);
    yield put({ type: "VOTEINDEX_SETBPS_REDUCER", data: response });
  } catch (err) {}
}
function getBps() {
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
  return this.eos.getProducers( { json: true } ).then( result => {
    console.log( '============== get block producer list==================' );
    console.log( result );
    return result.rows;
  } );
}

