import { put, call} from "redux-saga/effects";
import { GetEOS } from "../../actions/EosAction";
import { decryptObject, encryptObjectToString, storage } from "../../utils/storage";
import { contributorInfo } from "../../../config/configParams";


var BPS = null;
var contributors = null;
var needNotrSort = false;

// getVoteIndexPageAccountInfoPost
export function* getVoteIndexPageAccountInfoPost(action) {
    try {
      const res = yield call(getAccountByEos, action);
      yield put({ type: "VOTEINDEX_SETACCOUNTINFO_REDUCER", data: res });
    } catch (err) {}
}

async function getAccountByEos(action) {
  const eos = await GetEOS(action.data.accountPrivateKey);
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
async function getCurrencyBalance(action) {
  const eos = await GetEOS(action.data.accountPrivateKey);
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
    console.log('-------------------')
    console.log(response);
    yield put({ type: "VOTEINDEX_SETREFUNDS_REDUCER", data: response });
  } catch (err) {

  }
}
async function getRefunds(action) {
    console.log('!!!!! refunds!!!!')
  const eos = await GetEOS(action.data.accountPrivateKey);
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
    BPS = response.rows;

      yield put({ type: "VOTEINDEX_GETBPS_SUCCESS_REDUCER", total_producer_vote_weight:response.total_producer_vote_weight});
      if(BPS&&contributors){
          let data = sortBPS();
          yield put({ type: "VOTEINDEX_SETBPS_SUCCESS_REDUCER", data });
      }
  } catch (err) {}
}
async function getBps(action) {
  const eos = await GetEOS(action.data.accountPrivateKey);
  return eos.getProducers( { json: true, limit:5 } ).then( result => {
      console.log("bps")
      console.log("bps：" , result)
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



export function* getNodesIDInfo(action){
    try{
        const response = yield call(getNodesInfo);
        let accountDic = {};

        response.bp_info_list.map((bp)=>{
            accountDic[bp.producer_name] = {
                logo:bp.logo,
                organization_name : bp.organization_name
            }
        });
        contributors = response.contributors;
        needNotrSort = response.needNotrSort;
        let showLabel = response.showLabel?true:false;
        yield put({ type: "GET_NODESIDINFO_SUCCESS_REDUCER", data: {accountDic, contributors:response.contributors,showLabel} });

        if(BPS&&contributors){
            let data = sortBPS();
            yield put({ type: "VOTEINDEX_SETBPS_SUCCESS_REDUCER", data });
        }

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


function sortBPS(){

    if(needNotrSort){
        return BPS
    }

    let sortedBPS = [];
    let normalBPS = [];
    let contributorBPS = [];
    let tmpDic = {};


    BPS.map((bp)=>{
        if(contributors.indexOf(bp.owner) !== -1 ){
            tmpDic[bp.owner] = bp;
        }else{
            normalBPS.push(bp);
        }
    });

    contributors.map((c)=>{
        tmpDic[c]&&contributorBPS.push(tmpDic[c])
    })

    sortedBPS = contributorBPS.concat(normalBPS);

    return sortedBPS

}