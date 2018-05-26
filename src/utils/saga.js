import { takeLatest } from "redux-saga/effects";
import { getHomeAllAsset } from "../pages/HomePage/saga";
import { getNodeListAllAsset } from "../pages/NodeListPage/saga";
import { getVotingList } from "../pages/VotePage/saga";
import { getVoteIndexPageAccountInfoPost, getVoteIndexPageCurrencyBalancePost, getVoteIndexPageRefundsPost, getVoteIndexPageBpsPost } from "../pages/VoteIndexPage/saga";
/**
 * saga根函数，注册到store中；
 */
export default function* SagaInit() {
    yield takeLatest("HOME_GETALLASSET_POST", getHomeAllAsset);
    yield takeLatest("NODE_LIST_GET_ALL_ASSET_POST", getNodeListAllAsset);
    yield takeLatest("VOTE_LIST_REDUCER", getVotingList);
    yield takeLatest("VOTE_INDEX_ACCOUNTINFO_POST", getVoteIndexPageAccountInfoPost);
    yield takeLatest("VOTE_INDEX_CURRENCYBALANCE_POST", getVoteIndexPageCurrencyBalancePost);
    yield takeLatest("VOTE_INDEX_REFUNDS_POST", getVoteIndexPageRefundsPost);
    yield takeLatest("VOTE_INDEX_BPS_POST", getVoteIndexPageBpsPost);
    yield takeLatest("VOTE_LIST_POST", getVotingList);
}
