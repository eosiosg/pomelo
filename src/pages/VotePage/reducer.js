/**
 * Created by dongjie on 24/5/18.
 */

const initState = {
    votingList: [],
    IsSubmitSuccess: false,
};


export default function VotePageReducer (state = initState, action) {
    switch (action.type) {
        case "VOTE_GETLIST_REDUCER":
            return Object.assign({}, state, {
                "votingList": action.data
            });
        case "VOTE_SUBMITLIST_REDUCER":
            return Object.assign({}, state, {
                "IsSubmitSuccess": action.data
            });
        default:
            return state;
    }
}
