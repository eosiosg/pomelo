import { combineReducers } from "redux";

import HomePageReducer from "../pages/HomePage/reducer";
import NodeListPageReducer from "../pages/NodeListPage/reducer";

const reducers = combineReducers({
    HomePageReducer,
    NodeListPageReducer,
});
export default reducers;
