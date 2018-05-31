/**
 * Created by dongjie on 24/5/18.
 */

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
            return Object.assign({}, state, {
                "isVoting": false,
                "IsSubmitSuccess": true
            });
        case "VOTE_FAIL_REDUCER":
            return Object.assign({}, state, {
                "isVoting": false,
                "IsSubmitSuccess": false
            });
        default:
            return state;
    }
}
