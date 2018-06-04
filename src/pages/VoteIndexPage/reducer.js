/*
 * HomeReducer
 *
 */
const initState = {
  accountInfo: {
    account_name: "",
    delegated_bandwidth: {
      cpu_weight: "",
      net_weight: "",
    },
    total_resources: {
      ram_bytes: 0,
    },
    voter_info: {
      producers: [],
    },
  },
  CurrencyBalance: 0,
  Refunds: 0,
  RefundsTime: "",
    refundMoneyDetail:{cpu:0,net:0},
  BPs: [
    {
      owner: "",
      total_votes: "",


      producer_key: "1",
    },
  ],
    HAVE_NODE_ID_INFO:false,
    HAVE_BPS_INFO:false,
  USD: 6.2,
  needGetUserInfo: false,
  accountDic: {
    logo: "",
    organization_name: "",
  },
    showLabel:false,
  contributors: "",
  totalVoteWeight: 0,
};
export default function VoteIndexPageReducer (state = initState, action) {
    switch (action.type) {
    case "VOTEINDEX_SETACCOUNTINFO_REDUCER":
        return Object.assign({}, state, {
            "accountInfo": action.data
        });
    case "VOTEINDEX_SETCURRENCYBALANCE_REDUCER":
        return Object.assign({}, state, {
          "CurrencyBalance": action.data
        });
    case "VOTEINDEX_SETREFUNDS_REDUCER":
        return Object.assign({}, state, {
          "Refunds": action.data.refunds,
          "RefundsTime": action.data.request_time,
          "refundMoneyDetail": action.data.refundMoneyDetail,
        });
    case "VOTEINDEX_GETBPS_SUCCESS_REDUCER":
        return Object.assign({}, state, {
            "HAVE_BPS_INFO":true,
            "totalVoteWeight" : action.total_producer_vote_weight,
        });
    case "VOTEINDEX_SETBPS_SUCCESS_REDUCER":
        return Object.assign({}, state, {
            "BPs": action.data,
        });
    case "VOTEINDEX_GETINFO_TRUE_REDUCER":
        return Object.assign({}, state, {
            "needGetUserInfo" : true
        });

        case "GET_NODESIDINFO_SUCCESS_REDUCER":
            return Object.assign({}, state, {
                "HAVE_NODE_ID_INFO": true,
                "showLabel":action.data.showLabel,
                "accountDic": action.data.accountDic,
                "contributors": action.data.contributors,
            });

    case "VOTEINDEX_GETINFO_FALSE_REDUCER":
        return Object.assign({}, state, {
            "needGetUserInfo" : false
        });

    case "VOTEINDEX_SETUSD_REDUCER":
        return Object.assign({}, state, {
          "USD": action.data
      });
        case "VOTEINDEX_TOTALWEIGHT_REDUCER":{
            return Object.assign({}, state, {
                "totalVoteWeight" :action.data.totalVoteWeight
            })
        }
    default:
        return state;
    }
}
