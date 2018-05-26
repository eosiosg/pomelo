/*
 * HomeReducer
 *
 */
const initState = {
  accountInfo: {
    account_name: "",
    net_weight: 0,
    cpu_weight: 0,
    total_resources: {
      ram_bytes: 0,
    },
  },
  CurrencyBalance: 0,
};
export default function DelegatebwPageReducer (state = initState, action) {
    switch (action.type) {
      case "DELEGATEBW_SETACCOUNTINFO_REDUCER":
        return Object.assign({}, state, {
          "accountInfo": action.data
        });
      case "DELEGATEBW_SETCURRENCYBALANCE_REDUCER":
        return Object.assign({}, state, {
          "CurrencyBalance": action.data
        });
        default:
            return state;
    }
}
