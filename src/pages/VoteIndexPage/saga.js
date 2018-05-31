import { put, call} from "redux-saga/effects";
import { GetEOS } from "../../actions/EosAction";
import { decryptObject, encryptObjectToString, storage } from "../../utils/storage";

// getVoteIndexPageAccountInfoPost
export function* getVoteIndexPageAccountInfoPost(action) {
    try {
      const res = yield call(getAccountByEos, action);
      yield put({ type: "VOTEINDEX_SETACCOUNTINFO_REDUCER", data: res });
    } catch (err) {}
}

function getAccountByEos(action) {
  const eos = GetEOS(action.data.accountPrivateKey);
  return eos.getAccount( { 'account_name': action.data.accountName } ).then(( result ) => {
    console.log(result);
      return result;
    });
}

// getVoteIndexPageCurrencyBalancePost
export function* getVoteIndexPageCurrencyBalancePost (action) {
  try {
    const response = yield call(getCurrencyBalance, action);
    yield put({ type: "VOTEINDEX_SETCURRENCYBALANCE_REDUCER", data: response });
  } catch (err) {}
}
function getCurrencyBalance(action) {
  const eos = GetEOS(action.data.accountPrivateKey);
  return eos.getCurrencyBalance( { "code": "eosio.token", "account": action.data.accountName }).then(( res ) => {
    const balance = Number(res[0].replace(" SYS", ""));
    console.log(balance);
    return balance;
  });
}

// getVoteIndexPageRefundsPost
export function* getVoteIndexPageRefundsPost (action) {
  try {
    const response = yield call(getRefunds, action);
    yield put({ type: "VOTEINDEX_SETREFUNDS_REDUCER", data: response.refunds });
    yield put({ type: "VOTEINDEX_SETREFUNDSTIME_REDUCER", data: response.request_time });
  } catch (err) {}
}
function getRefunds(action) {
  const eos = GetEOS(action.data.accountPrivateKey);
  return eos.getTableRows({
    'json': true,
    'code': 'eosio',
    'scope': action.data.accountName,
    'table': 'refunds',
    'table_key': 'active'
  }).then(function (result) {
    console.log(result);
    const refunds = result.rows[0] ? Number(result.rows[0].cpu_amount.replace(" SYS", ""))+Number(result.rows[0].net_amount.replace(" SYS", "")) : 0;
    const request_time = result.rows[0] ? result.rows[0].request_time : null;
    return { refunds, request_time };
  });
}

// getVoteIndexPageBpsPost
export function* getVoteIndexPageBpsPost (action) {
  console.log('action, getnew bps: ', action);
  try {
    const response = yield call(getBps, action);
    yield put({ type: "VOTEINDEX_SETBPS_REDUCER", data: response });
  } catch (err) {}
}
function getBps(action) {
  const eos = GetEOS(action.data.accountPrivateKey);
  return eos.getProducers( { json: true } ).then( result => {
    console.log(result);
      return result;
  } );
}

// getVoteIndexPageBpsPost
export function* getVoteIndexPageUsdPricePost () {
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
    yield put({ type: "VOTEINDEX_SETUSD_REDUCER", data: response.data.quotes.USD.price });
  } catch (err) {}
}



export function* getNodesIDInfo(){
    try{
        const response = yield call(getNodesInfo);
        let accountDic = {};
        console.log('!!!!!!!!!!!!!!!!!!!!=======')
        console.log(response)
        response.bp_info_list.map((bp)=>{
            accountDic[bp.producer_name] = {
                logo:bp.logo,
                organization_name : bp.organization_name
            }
        });

        console.log('bp got+++++++++++++++++');
        console.log(accountDic)
        yield put({ type: "GET_NODESIDINFO_REDUCER", data: {accountDic, contributors:response.contributors} });

    }catch(err){

    }
}


function getNodesInfo(){

    return fetch('https://api.eosio.sg/bp/info').then((res)=>{
        return res.json()
    }).then((res)=>{
        return res
    }).catch(err=>{
        console.log(err)
    })
}