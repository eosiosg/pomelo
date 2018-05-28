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
    case "HOME_SETACCOUNTNAME_REDUCER":
        return Object.assign({}, state, {
            "accountName": action.data
        });
    case "HOME_SETACCOUNTNAMES_REDUCER":
        console.log("action:",action)
        return Object.assign({}, state, {
            "accountNames": action.data
        });
    case "HOME_SETACCOUNTNAMESERR_REDUCER":
        console.log("action:",action)
        return Object.assign({}, state, {
            "accountNamesErr": action.data
        });
    default:
        return state;
    }
}
