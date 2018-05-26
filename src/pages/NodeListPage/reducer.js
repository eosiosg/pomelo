/*
 * HomeReducer
 *
 */
const initState = {
    allAsset: [],
};
export default function NodeListPageReducer (state = initState, action) {
    switch (action.type) {
        case "GET_ALL_NODE_LIST_REDUCER":
            console.log('node list get all');
            return Object.assign({}, state, {
                "allAsset": action.data
            });
        default:
            return state;
    }
}
