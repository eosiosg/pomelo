/**
 * Created by dongjie on 24/5/18.
 */

const initState = {
    votingList: [],
};


export default function VotePageReducer (state = initState, action) {
    switch (action.type) {
        case "VOTE_GETLIST_REDUCER":
            console.log('data/reducer: ', action.data);
            return Object.assign({}, state, {
                "votingList": action.data
            })
        // case "VOTE_LIST_POST":
        //     console.log('data...', action.data);
        //     return
        default:
            return state;
    }
}