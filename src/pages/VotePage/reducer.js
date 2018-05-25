/**
 * Created by dongjie on 24/5/18.
 */

const initState = {
    allAsset: [],
};
export default function VotePageReducer (state = initState, action) {
    switch (action.type) {
        case "VOTE_LIST_REDUCER":
            return Object.assign({}, state, {
                "votingList": action.data
            });
        default:
            return state;
    }
}