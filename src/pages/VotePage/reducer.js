/**
 * Created by dongjie on 24/5/18.
 */
import Toast from "react-native-root-toast";
import I18n from "../../../I18n";


const initState = {
    votingList: [],
    IsSubmitSuccess: false,
};


export default function VotePageReducer (state = initState, action) {
    switch (action.type) {
        case "VOTE_ONGOING_REDUCER":
            return Object.assign({}, state, {
                "isVoting": true,
                "isSubmitSuccess":false,
            });
        case "VOTE_SUCCESS_REDUCER":
            Toast.show(I18n.t('VotePage vote_success')+'!',{
                position: 36,
            });
            return Object.assign({}, state, {
                "isVoting": false,
                "IsSubmitSuccess": true
            });
        case "VOTE_FAIL_REDUCER":
            Toast.show(I18n.t('VotePage vote_fail')+'.',{
                position: 36,
            });
            return Object.assign({}, state, {
                "isVoting": false,
                "IsSubmitSuccess": false
            });
        default:
            return state;
    }
}
