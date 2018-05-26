/*
 * HomeReducer
 *
 */
const initState = {
  accountInfo: {
    net_weight: 0,
    cpu_weight: 0,
  },
};
export default function UnDelegatebwPageReducer (state = initState, action) {
    switch (action.type) {
        case "UNDELEGATEBW_SETACCOUNTINFO_REDUCER":
            return Object.assign({}, state, {
                "accountInfo": action.data
            });
        default:
            return state;
    }
}
