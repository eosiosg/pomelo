import { combineReducers } from "redux";

import HomePageReducer from "../pages/HomePage/reducer";
import VotePageReducer from "../pages/VotePage/reducer";


import NodeListPageReducer from "../pages/NodeListPage/reducer";

const reducers = combineReducers({
    HomePageReducer,
    NodeListPageReducer,
    VotePageReducer
});
export default reducers;
