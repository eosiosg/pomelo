/**
 * Created by dongjie on 27/5/18.
 */
/*
 * FeaturePage Messages
 *
 * This contains all the text for the FeaturePage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
    account: {
        id: "VotePage account",
        defaultMessage: 'Account',
    },
    balance: {
        id: "VotePage balance" ,
        defaultMessage: "Balance",
    },
    stake: {
        id: 'VotePage stake',
        defaultMessage: 'Stake count',
    },
    cancel: {
        id: 'VotePage cancel',
        defaultMessage: 'Cancel',
    },
    confirm: {
        id: 'VotePage confirm',
        defaultMessage: 'Confirm',
    },
    submit: {
        id: 'VotePage submit',
        defaultMessage: 'Submit',
    },
    gotIt: {
        id: 'VotePage gotIt',
        defaultMessage: 'Got it',
    },
    delegatebw: {
        id: 'VotePage delegatebw',
        defaultMessage: 'Delegatebw',
    },
    bpList: {
        id: 'VotePage bpList',
        defaultMessage: 'Candidates you selected',
    },
    notice: {
        id: 'VotePage notice',
        defaultMessage: 'Notice',
    },
    noticeC: {
        id: 'VotePage noticeC',
        defaultMessage: "You could revote, delegatebw or undelegatebw anytime. Vote will use CPU+Network stake.",
    },
    RuleT: {
        id: 'VotePage RuleT',
        defaultMessage: "Rule*",
    },
    Rule1: {
        id: 'VotePage Rule1',
        defaultMessage: "· Vote will use a little CPU + Network stake;",
    },
    Rule2: {
        id: 'VotePage Rule2',
        defaultMessage: "· Weight  = seconds_count_since_year_2000/ seconds_count_per_year，means increase by second;",
    },
    Rule3: {
        id: 'VotePage Rule3',
        defaultMessage: "· Vote = (CPU stake + Network stake) * 2^weight;",
    },
    Rule4: {
        id: 'VotePage Rule4',
        defaultMessage: "· Could undelegatebw anytime，whitch will deduct corresponding votes from voted producers, and EOS will refund to account 3 days later;",
    },

});