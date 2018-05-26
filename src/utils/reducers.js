import { combineReducers } from "redux";

import HomePageReducer from "../pages/HomePage/reducer";
import VotePageReducer from "../pages/VotePage/reducer";
import NodeListPageReducer from "../pages/NodeListPage/reducer";
import VoteIndexPageReducer from "../pages/VoteIndexPage/reducer";

const reducers = combineReducers({
    HomePageReducer,
    NodeListPageReducer,
    VotePageReducer,
    VoteIndexPageReducer,
});
export default reducers;
