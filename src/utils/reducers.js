import { combineReducers } from "redux";

import HomePageReducer from "../pages/HomePage/reducer";
import VotePageReducer from "../pages/VotePage/reducer";
import NodeListPageReducer from "../pages/NodeListPage/reducer";
import VoteIndexPageReducer from "../pages/VoteIndexPage/reducer";
import DelegatebwPageReducer from "../pages/DelegatebwPage/reducer";
import UnDelegatebwPageReducer from "../pages/UnDelegatebwPage/reducer";

const reducers = combineReducers({
    HomePageReducer,
    NodeListPageReducer,
    VotePageReducer,
    VoteIndexPageReducer,
    DelegatebwPageReducer,
    UnDelegatebwPageReducer,
});
export default reducers;
