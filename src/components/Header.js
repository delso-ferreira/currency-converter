import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../styles/header.css';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const sum = expenses.reduce((acc, moeda) => (
      acc + (Number(moeda.value) * Number(moeda.exchangeRates[moeda.currency].ask))), 0);

    const totalValue = sum.toFixed(2);
    return (
      <div className="header__container">
        <div className="header__container-email">
          <h1 data-testid="email-field">{ email }</h1>
        </div>
        <div className="header__container-currency">
          <p data-testid="total-field">{totalValue}</p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  email: globalState.user.email,
  expenses: globalState.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.any,
  expenses: PropTypes.shape({
    reduce: PropTypes.func,
  }),
}.isRequired;

export default connect(mapStateToProps)(Header);
