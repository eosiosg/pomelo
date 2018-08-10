/**
 * Created by dongjie on 20/6/18.
 */

import Toast from "react-native-root-toast";
import I18n from "../../../I18n";

const initState = {
    isClaiming:false,
};


export default function ClaimRewardsReducer (state = initState, action) {
    switch (action.type) {
        case "CLAIM_ONGOING_REDUCER":
            return Object.assign({}, state, {
                "isClaiming": true
            });
        case "CLAIM_SUCCESS_REDUCER":
            Toast.show('Claim Success',{
                position: 36,
            });
            return Object.assign({}, state, {
                "isClaiming": false
            });
        case "CLAIM_FAIL_REDUCER":
            Toast.show('Claim Failed',{
                position: 36,
            });
            return Object.assign({}, state, {
              "isClaiming": false
            });

        default:
            return state;
    }
}
