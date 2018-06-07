/*
 * HomeReducer
 *
 */

import {MAIN_NET_NAME, TEST_NET_NAME} from './index';


const initState = {
    allAsset: [],
    accountName: "",
    accountNames: [],
    defaultNet:"",
    mainNetInfo:{domains:[]},
    testNetInfo:{domains:[]},
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
        console.log('acount name:', action.data)
        return Object.assign({}, state, {
            "accountNames": action.data.account_names
        });
    case "HOME_DELACCOUNTNAMES_REDUCER":
        return Object.assign({}, state, {
            "accountNames": []
        });

    case "HOME_MAINNETINFO_REDUCER":
        let defaultNet = action.data[0].chain_id?MAIN_NET_NAME:TEST_NET_NAME;
        return Object.assign({}, state, {
            mainNetInfo : action.data[0],
            testNetInfo : action.data[1],
            defaultNet
        });
    default:
        return state;
    }
}
