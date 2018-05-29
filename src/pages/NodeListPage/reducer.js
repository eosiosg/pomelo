/*
 * HomeReducer
 *
 */
const initState = {
    selectedNodeList: [],
    testData2: 'aaaa'
};
export default function NodeListPageReducer( state = initState, action ) {
    switch ( action.type ) {
        case "NODELIST_SETSELECTEDNODELISTDATA_REDUCER":
            return Object.assign( {}, state, {
                "selectedNodeList": action.data
            } );
        default:
            return state;
    }
}
