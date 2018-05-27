import { combineReducers } from "redux";

import HomePageReducer from "../pages/HomePage/reducer";
import VotePageReducer from "../pages/VotePage/reducer";
import NodeListPageReducer from "../pages/NodeListPage/reducer";
import VoteIndexPageReducer from "../pages/VoteIndexPage/reducer";
import DelegatebwPageReducer from "../pages/DelegatebwPage/reducer";
import UnDelegatebwPageReducer from "../pages/UnDelegatebwPage/reducer";
<<<<<<< HEAD
import IntlProviderLanguageReducer from "../pages/IntlProviderLanguage/reducer";
=======
import WalletPageReducer from "../pages/WalletPage/reducer";

>>>>>>> f2d2b119ae7f68efeb9af7bee7aaa45c4329d55d

const reducers = combineReducers({
    HomePageReducer,
    NodeListPageReducer,
    VotePageReducer,
    VoteIndexPageReducer,
    DelegatebwPageReducer,
    UnDelegatebwPageReducer,
<<<<<<< HEAD
    IntlProviderLanguageReducer,
=======
    WalletPageReducer
>>>>>>> f2d2b119ae7f68efeb9af7bee7aaa45c4329d55d
});
export default reducers;
