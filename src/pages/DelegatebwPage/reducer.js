/*
 * HomeReducer
 *
 */

import Toast from "react-native-root-toast";
import I18n from "../../../I18n";

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
    loading:false,
};
export default function DelegatebwPageReducer (state = initState, action) {
    switch (action.type) {
      case "DELEGATEBW_SETACCOUNTINFO_REDUCER":
        return Object.assign({}, state, {
          "accountInfo": action.data
        });
      case "DELEGATE_ONGOING_REDUCER":
        return Object.assign({}, state, {
          "loading": true
        });
      case "DELEGATE_SUCCESS_REDUCER":
          Toast.show(I18n.t('VotePage vote_success')+'!',{
              position: 36,
          });
        return Object.assign({}, state, {
          "loading": false
        });
      case "DELEGATE_FAIL_REDUCER":
          Toast.show(I18n.t('VotePage vote_fail')+'!',{
              position: 36,
          });
        return Object.assign({}, state, {
          "loading": false
        });
      case "DELEGATEBW_SETCURRENCYBALANCE_REDUCER":
        return Object.assign({}, state, {
          "CurrencyBalance": action.data
        });
      default:
          return state;
    }
}
