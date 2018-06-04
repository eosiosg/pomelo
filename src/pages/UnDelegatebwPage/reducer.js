/*
 * HomeReducer
 *
 */
import Toast from "react-native-root-toast";
import I18n from "../../../I18n";

const initState = {
  accountInfo: {
    net_weight: 0,
    cpu_weight: 0,
      loading:false,
  },
};
export default function UnDelegatebwPageReducer (state = initState, action) {
    switch (action.type) {
        case "UNDELEGATEBW_SETACCOUNTINFO_REDUCER":
            return Object.assign({}, state, {
                "accountInfo": action.data
            });
        case "UNDELEGATE_ONGOING_REDUCER":
            return Object.assign({}, state, {
                "loading": true
            });
        case "UNDELEGATE_SUCCESS_REDUCER":
            Toast.show(I18n.t('VotePage vote_success')+'!',{
                position: 36,
            });
            return Object.assign({}, state, {
                "loading": false
            });
        // case "UNDELEGATEBW_GETUSERINFOFALSE_REDUCER":
        //     return Object.assign({}, state, {
        //         "needGetUserInfo" : false,
        //     });
        case "UNDELEGATE_FAIL_REDUCER":
            Toast.show(I18n.t('VotePage vote_fail')+'!',{
                position: 36,
            });
            return Object.assign({}, state, {
                "loading": false
            });
        default:
            return state;
    }
}
