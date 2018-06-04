import { put, call} from "redux-saga/effects";
import { GetEOS } from "../../actions/EosAction";
import { decryptObject, encryptObjectToString, storage } from "../../utils/storage";
import { contributorInfo } from "../../../config/configParams";


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
      if(!res){
        return 0
      }else if(!res.length){
          return 0
      }else{
          return Number(res[0].split(' ')[0]);
      }
  }).catch(()=>0);
}

// getVoteIndexPageRefundsPost
export function* getVoteIndexPageRefundsPost (action) {
  try {
    const response = yield call(getRefunds, action);
    yield put({ type: "VOTEINDEX_SETREFUNDS_REDUCER", data: response });
  } catch (err) {

  }
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

    const refunds = result.rows[0] ? Number(result.rows[0].cpu_amount.split(' ')[0])+Number(result.rows[0].net_amount.split(' ')[0]) : 0;
    const refundMoneyDetail = result.rows[0] ? {cpu: Number(result.rows[0].cpu_amount.split(' ')[0]), net:Number(result.rows[0].net_amount.split(' ')[0])} : {cpu:0,net:0};
    const request_time = result.rows[0] ? result.rows[0].request_time : null;
    return { refunds, request_time, refundMoneyDetail };
  }).catch(
      err=>err
  );
}

// getVoteIndexPageBpsPost
export function* getVoteIndexPageBpsPost (action) {
  try {
    const response = yield call(getBps, action);
    yield put({ type: "VOTEINDEX_SETBPS_REDUCER", data: response });
  } catch (err) {}
}
function getBps(action) {
  const eos = GetEOS(action.data.accountPrivateKey);
  return eos.getProducers( { json: true } ).then( result => {
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
        response.bp_info_list.map((bp)=>{
            accountDic[bp.producer_name] = {
                logo:bp.logo,
                organization_name : bp.organization_name
            }
        });

        yield put({ type: "GET_NODESIDINFO_REDUCER", data: {accountDic, contributors:response.contributors} });

    }catch(err){

    }
}


function getNodesInfo(){

    return fetch(contributorInfo).then((res)=>{
        return res.json()
    }).then((res)=>{
        return res
    }).catch(err=>{
        console.log(err)
    })
}