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
  BPs: [
    {
      owner: "",
      total_votes: "",


      producer_key: "1",
    },
  ],
  USD: 6.2,
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
          "Refunds": action.data
        });
      case "VOTEINDEX_SETREFUNDSTIME_REDUCER":
        return Object.assign({}, state, {
          "RefundsTime" : action.data
        });
    case "VOTEINDEX_SETBPS_REDUCER":
        return Object.assign({}, state, {
          "BPs": action.data.rows,
            "totalVoteWeight" : action.data.total_producer_vote_weight,
        });
    case "VOTEINDEX_GETINFO_TRUE_REDUCER":
        return Object.assign({}, state, {
            "needGetUserInfo" : true
        });

        case "GET_NODESIDINFO_REDUCER":
            return Object.assign({}, state, {
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
