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
  console.log( '==============get Refunds==================' );
  return this.eos.getTableRows({
    'json': true,
    'code': 'eosio',
    'scope': 'eosiomeetone',
    'table': 'refunds',
    'table_key': 'owner'
  }).then(function (result) {
    //这个是refunds
    console.log(result);
    const refunds = result.rows[0].amount ? result.rows[0].amount : 0;
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
  console.log( '============== get block producer list==================' );
  return this.eos.getProducers( { json: true } ).then( result => {
    console.log( result );
    return result.rows;
  } );
}

export function* getEOSPrice () {
  try {
    // 组装请求数据
    const requestOption = {
      url: "https://api.coinmarketcap.com/v2/ticker/1765/?convert=USD",
      body: {
        method: 'get',
      },
    };
    // 发起异步请求
    const response = yield call(request, requestOption);
    // 根据返回数据，渲染结果
    console.log("response:",response)
    console.log("requestOption:",requestOption)
    if (response.data ) {
      yield put({ type: 'EOSPRICE_REDUCER', data: response.data.quotes.USD.price });
    } else {
      yield put({ type: 'EOSPRICE_REDUCER', data: response });
    }
  } catch (err) {
    yield put({ type: 'EOSPRICE_REDUCER', data: '请求异常' });
  }
}


