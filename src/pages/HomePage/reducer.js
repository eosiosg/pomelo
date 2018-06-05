/*
 * HomeReducer
 *
 */
const initState = {
    allAsset: [],
    accountName: "",
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
        return Object.assign({}, state, {
            "accountNames": action.data
        });
    case "HOME_MAINNETINFO_REDUCER":
        console.log('main net info');
        console.log(action.data);
        return Object.assign({}, state, {
            mainNetInfo : action.data[0],
            testNetInfo : action.data[1]
        });
    default:
        return state;
    }
}
