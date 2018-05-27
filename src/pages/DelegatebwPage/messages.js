/*
 * FeaturePage Messages
 *
 * This contains all the text for the FeaturePage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  DelegatebwPage: {
    id: 'DelegatebwPage DelegatebwPage',
    defaultMessage: 'Add DelegatebwPage',
  },
  Balance: {
    id: 'DelegatebwPage Balance',
    defaultMessage: 'Balance',
  },
  StakeCount: {
    id: 'DelegatebwPage StakeCount',
    defaultMessage: 'Stake Count',
  },
  StakeQuantity: {
    id: 'DelegatebwPage StakeQuantity',
    defaultMessage: 'Stake Quantity',
  },
  CPU: {
    id: 'DelegatebwPage CPU',
    defaultMessage: 'CPU',
  },
  Network: {
    id: 'DelegatebwPage Network',
    defaultMessage: 'Network',
  },
  Rule: {
    id: 'DelegatebwPage Rule',
    defaultMessage: 'Rule*',
  },
  Rule1: {
    id: 'DelegatebwPage Rule1',
    defaultMessage: '· Vote will use a little CPU + Network stake;',
  },
  Rule2: {
    id: 'DelegatebwPage Rule2',
    defaultMessage: '· Weight  = seconds_count_since_year_2000/ seconds_count_per_year，means increase by second;',
  },
  Rule3: {
    id: 'DelegatebwPage Rule3',
    defaultMessage: '· Vote = (CPU stake + Network stake) * 2^weight;',
  },
  Rule4: {
    id: 'DelegatebwPage Rule4',
    defaultMessage: '· Could undelegatebw anytime，whitch will deduct corresponding votes from voted producers, and EOS will refund to account 3 days later;',
  },
  Confirm: {
    id: 'DelegatebwPage Confirm',
    defaultMessage: 'Confirm',
  },
});
