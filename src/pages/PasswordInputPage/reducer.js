/*
 * HomeReducer
 *
 */
const initState = {
    password: [],
};
export default function PasswordInputPageReducer( state = initState, action ) {
    switch ( action.type ) {
        case "PASSWORD_SET_REDUCER":
            return Object.assign( {}, state, {
                "password": action.password
            } );
        default:
            return state;
    }
}
