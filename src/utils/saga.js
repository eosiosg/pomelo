import { takeLatest } from "redux-saga/effects";
import { getHomeAccountName } from "../pages/HomePage/saga";
import { postVotingList } from "../pages/VotePage/saga";
import { getVoteIndexPageAccountInfoPost, getVoteIndexPageCurrencyBalancePost, getVoteIndexPageRefundsPost, getVoteIndexPageBpsPost, getVoteIndexPageUsdPricePost,getNodesIDInfo } from "../pages/VoteIndexPage/saga";
import { getDelegatebwPageAccountInfoPost, getDelegatebwPageCurrencyBalancePost, getDelegatebwPageConfirmPost } from "../pages/DelegatebwPage/saga";
import { getUnDelegatebwPageAccountPost, getUnDelegatebwPageConfirmPost } from "../pages/UnDelegatebwPage/saga";
import { claimRewards } from "../pages/ClaimRewardsPage/saga";

/**
 * saga根函数，注册到store中；
 */
export default function* SagaInit() {
    yield takeLatest("HOME_ACCOUNT_NAME", getHomeAccountName);
    yield takeLatest("GET_NODESIDINFO_POST", getNodesIDInfo);
    yield takeLatest("VOTE_INDEX_ACCOUNTINFO_POST", getVoteIndexPageAccountInfoPost);
    yield takeLatest("VOTE_INDEX_CURRENCYBALANCE_POST", getVoteIndexPageCurrencyBalancePost);
    yield takeLatest("VOTE_INDEX_REFUNDS_POST", getVoteIndexPageRefundsPost);
    yield takeLatest("VOTE_INDEX_BPS_POST", getVoteIndexPageBpsPost);
    yield takeLatest("VOTE_INDEX_GETUSDPRICE_POST", getVoteIndexPageUsdPricePost);
    yield takeLatest("VOTE_SUBMITLIST_POST", postVotingList);
    yield takeLatest("DELEGATEBW_ACCOUNTINFO_POST", getDelegatebwPageAccountInfoPost);
    yield takeLatest("DELEGATEBW_CURRENCYBALANCE_POST", getDelegatebwPageCurrencyBalancePost);
    yield takeLatest("DELEGATEBW_CONFIRM_POST", getDelegatebwPageConfirmPost);
    yield takeLatest("UNDELEGATEBW_ACCOUNTINFO_POST", getUnDelegatebwPageAccountPost);
    yield takeLatest("UNDELEGATEBW_CONFIRM_POST", getUnDelegatebwPageConfirmPost);
    yield takeLatest("CLAIMREWARDS_CLAIM_POST", claimRewards);
}
