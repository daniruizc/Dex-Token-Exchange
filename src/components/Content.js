import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  web3Selector,
  exchangeSelector,
  tokenSelector,
  accountSelector
} from '../store/selectors';
import { loadAllOrders, subscribeToEvents } from '../store/interactions';
import OrderBook from './OrderBook';
import Trades from './Trades';
import MyTransactions from './MyTransactions';
import PriceChart from './PriceChart';
import Balance from './Balance';
import NewOrder from './NewOrder';

class Content extends Component {

  componentWillMount() {
    this.loadBlockchainData(this.props)
  }

  async loadBlockchainData(props) {

    const { dispatch, web3, exchange, token, account } = props;

    await loadAllOrders(exchange, dispatch);
    await subscribeToEvents(web3, exchange, token, account, dispatch);
  }

  render() {
    return (
      <div className="content">
        <div className="vertical-split">
          <Balance />
          <NewOrder />
        </div>
        <OrderBook />
        <div className="vertical-split">
          <PriceChart />
          <MyTransactions />
        </div>
        <Trades />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    'web3': web3Selector(state),
    'account': accountSelector(state),
    'exchange': exchangeSelector(state),
    'token': tokenSelector(state)
  };
}

export default connect(mapStateToProps)(Content);
