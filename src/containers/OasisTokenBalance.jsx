import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
// import ImmutablePropTypes from 'react-immutable-proptypes';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { formatAmount } from '../utils/tokens/pair';
import balances from '../store/selectors/balances';
import { ETH_UNIT_ETHER } from '../constants';
import styles from './OasisTokenBalance.scss';
import CSSModules from 'react-css-modules';
import OasisIcon from '../components/OasisIcon';

const propTypes = PropTypes && {
  tokenName: PropTypes.string,
  decimalPlaces: PropTypes.number,
  fromWei: PropTypes.bool,
  balanceUnit: PropTypes.string
};

export class OasisTokenBalanceWrapper extends PureComponent {
  render() {
    const { balance, tokenName, fromWei, balanceUnit } = this.props;
    if(!balance) {
      return (
        <div className={styles.loading}><OasisIcon icon="loading"/></div>
      );
    } else {
      return (
        <div className={styles.available}>
          <span className={styles["available-amount"]}>
          { formatAmount(balance, fromWei, balanceUnit ||  ETH_UNIT_ETHER, this.props.decimalPlaces) }
          </span>
          <span className={styles["available-currency"]}>
            <b>{tokenName}</b>
          </span>
        </div>
      );
    }

  }
}

export function mapStateToProps(state, { tokenName }) {
  return {
    balance: balances.tokenBalance(state, { tokenName, balanceUnit: ETH_UNIT_ETHER, toBigNumber: false })
  };
}
export function mapDispatchToProps(dispatch) {
  const actions = {};
  return { actions: bindActionCreators(actions, dispatch) };
}

OasisTokenBalanceWrapper.propTypes = propTypes;
OasisTokenBalanceWrapper.displayName = 'OasisTokenBalance';
export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(OasisTokenBalanceWrapper,styles));