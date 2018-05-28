import { takeLatest } from "redux-saga/effects";
import { getHomeAccountName } from "../pages/HomePage/saga";
import { getVotingList,postVotingList } from "../pages/VotePage/saga";
import { getVoteIndexPageAccountInfoPost, getVoteIndexPageCurrencyBalancePost, getVoteIndexPageRefundsPost, getVoteIndexPageBpsPost, getVoteIndexPageUsdPricePost } from "../pages/VoteIndexPage/saga";
import { getDelegatebwPageAccountInfoPost, getDelegatebwPageCurrencyBalancePost, getDelegatebwPageConfirmPost } from "../pages/DelegatebwPage/saga";
import { getUnDelegatebwPageAccountPost, getUnDelegatebwPageConfirmPost } from "../pages/UnDelegatebwPage/saga";
import { getEOSPrice ,getWalletPageAccountInfoPost, getWalletPageCurrencyBalancePost, getWalletPageRefundsPost } from "../pages/WalletPage/saga";

/**
 * saga根函数，注册到store中；
 */
export default function* SagaInit() {
    yield takeLatest("HOME_ACCOUNT_NAME", getHomeAccountName);
    yield takeLatest("VOTE_INDEX_ACCOUNTINFO_POST", getVoteIndexPageAccountInfoPost);
    yield takeLatest("VOTE_INDEX_CURRENCYBALANCE_POST", getVoteIndexPageCurrencyBalancePost);
    yield takeLatest("VOTE_INDEX_REFUNDS_POST", getVoteIndexPageRefundsPost);
    yield takeLatest("VOTE_INDEX_BPS_POST", getVoteIndexPageBpsPost);
    yield takeLatest("VOTE_INDEX_GETUSDPRICE_POST", getVoteIndexPageUsdPricePost);
    yield takeLatest("VOTE_GETLIST_POST", getVotingList);
    yield takeLatest("VOTE_SUBMITLIST_POST", postVotingList);
    yield takeLatest("DELEGATEBW_ACCOUNTINFO_POST", getDelegatebwPageAccountInfoPost);
    yield takeLatest("DELEGATEBW_CURRENCYBALANCE_POST", getDelegatebwPageCurrencyBalancePost);
    yield takeLatest("DELEGATEBW_CONFIRM_POST", getDelegatebwPageConfirmPost);
    yield takeLatest("UNDELEGATEBW_ACCOUNTINFO_POST", getUnDelegatebwPageAccountPost);
    yield takeLatest("UNDELEGATEBW_CONFIRM_POST", getUnDelegatebwPageConfirmPost);
    yield takeLatest("EOS_PRICE_GET", getEOSPrice);
    yield takeLatest("WALLET_ACCOUNTINFO_POST", getWalletPageAccountInfoPost);
    yield takeLatest("WALLET_CURRENCYBALANCE_POST", getWalletPageCurrencyBalancePost);
    yield takeLatest("WALLET_REFUNDS_POST", getWalletPageRefundsPost);
}
