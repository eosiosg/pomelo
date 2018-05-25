import { combineReducers } from "redux";
import HomePageReducer from "../pages/HomePage/reducer";
import VotePageReducer from "../pages/VotePage/reducer";

const reducers = combineReducers({
    HomePageReducer,
    VotePageReducer,
});
export default reducers;
