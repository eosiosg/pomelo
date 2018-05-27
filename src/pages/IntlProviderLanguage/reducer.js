/*
 * HomeReducer
 *
 */
const initState = {
  Language: "zh",
};
export default function IntlProviderLanguageReducer (state = initState, action) {
    switch (action.type) {
    case "INTL_SETLANGUAGE_REDUCER":
        return Object.assign({}, state, {
            "Language": action.data
        });
    default:
        return state;
    }
}
