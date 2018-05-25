/*
 * HomeReducer
 *
 */
const initState = {
    allAsset: [],
};
export default function HomePageReducer (state = initState, action) {
    switch (action.type) {
    case "HOME_GETALLASSET_REDUCER":
        return Object.assign({}, state, {
            "allAsset": action.data
        });
    default:
        return state;
    }
}
