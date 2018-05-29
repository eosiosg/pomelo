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
    case "VOTEINDEX_SETBPS_REDUCER":
        return Object.assign({}, state, {
          "BPs": action.data
        });
    case "VOTEINDEX_SETUSD_REDUCER":
      return Object.assign({}, state, {
        "USD": action.data
      });
    default:
        return state;
    }
}
