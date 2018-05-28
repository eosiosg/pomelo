import { put, call} from "redux-saga/effects";
import { GetEOS } from "../../actions/EosAction";
import { localSave ,storage } from "../../utils/storage";

//===============
// 缓存中获取accountPublicKey 和 accountName
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

//const accountPrivateKey = '5K6g9pgX6QUqvNinK2CNAScNvq7dc9tqocTUq1X9HvtEj1xdjFq';
//const accountName = "meetone33333";
//===============

export function* getEOSPrice () {
  try {
    // 组装请求数据
    const requestOption = {
      url: "https://api.coinmarketcap.com/v2/ticker/1765/?convert=USD",
      body: {
        method: 'get',
      },
    };
    const _fetch = () => {
      return fetch(requestOption.url, requestOption.body)
        .then((response) => response.json())
        .then((response) => response)
        .catch((err) => err);
    };
    const response = yield call(_fetch);
    yield put({ type: "EOSPRICE_REDUCER", data: response.data.quotes.USD.price });
  } catch (err) {}
}


// getWalletPageAccountInfoPost
export function* getWalletPageAccountInfoPost() {
  try {
    const res = yield call(getAccountByEos);
    yield put({ type: "VOTEINDEX_SETACCOUNTINFO_REDUCER", data: res });
  } catch (err) {}
}
function getAccountByEos() {
  const eos = GetEOS(accountPrivateKey);
  return eos.getAccount( { 'account_name': accountName } ).then(( result ) => {
    return result;
  });
}

// getVoteIndexPageCurrencyBalancePost
export function* getWalletPageCurrencyBalancePost () {
  try {
    const response = yield call(getCurrencyBalance);
    yield put({ type: "VOTEINDEX_SETCURRENCYBALANCE_REDUCER", data: response });
  } catch (err) {}
}
function getCurrencyBalance() {
  const eos = GetEOS(accountPrivateKey);
  return eos.getCurrencyBalance( { "code": "eosio.token", "account": accountName }).then(( res ) => {
    const balance = Number(res[0].replace(" SYS", ""));
    return balance;
  });
}

// getVoteIndexPageRefundsPost
export function* getWalletPageRefundsPost () {
  try {
    const response = yield call(getRefunds);
    yield put({ type: "VOTEINDEX_SETREFUNDS_REDUCER", data: response });
  } catch (err) {}
}
function getRefunds() {
  const eos = GetEOS(accountPrivateKey);
  return eos.getTableRows({
    'json': true,
    'code': 'eosio',
    'scope': 'eosiomeetone',
    'table': 'refunds',
    'table_key': 'owner'
  }).then(function (result) {
    const refunds = result.rows[0] ? Number(result.rows[0].cpu_amount.replace(" SYS", ""))+Number(result.rows[0].net_amount.replace(" SYS", "")) : 0;
    return refunds;
  });
}
