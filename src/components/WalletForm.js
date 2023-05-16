import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrencies } from '../redux/actions';

class WalletForm extends Component {
  // chamar a função que esta nas actions para setar o currencies [ok]
  state = {
    currency: '',
  };

  componentDidMount() {
    // atualiza o estado
    // utilizar o dispatch e chamar a função getCurrencies
    // fazer o mapstatetoprops pra pegar o state global
    const { dispatch } = this.props;
    dispatch(getCurrencies());
  }

  handleCurrencies = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { currencies } = this.props;
    const { currency } = this.state;
    // aqui utilizar o currencies do props do estado global
    return (
      <form>
        <label htmlFor="valor">
          Valor
        </label>
        <input
          type="text"
          id="text"
          name="text"
          data-testid="value-input"
        />
        <label htmlFor="moeda">
          Moeda
        </label>
        <select
          data-testid="currency-input"
          onChange={ this.handleCurrencies }
          type="text"
          value={ currency }
          name="curency"
        >
          {
            currencies.map((coin) => (
              <option key={ coin } value={ coin.value }>
                {coin.value}
              </option>))
          }
        </select>
        <label htmlFor="descrição">
          Descrição
        </label>
        <input
          type="text"
          id="text"
          name="text"
          data-testid="description-input"
        />
        <label htmlFor="moeda">
          Método de Pagamento
        </label>
        <select data-testid="method-input">
          <option value="Dinheiro">Dinheiro</option>
          <option value="Crédito">Cartão de crédito</option>
          <option value="Débito">Cartão de débito</option>
        </select>
        <label htmlFor="categoria">
          Categoria
        </label>
        <select data-testid="tag-input">
          <option value="Lazer">Lazer</option>
          <option value="Alimentação">Alimentação</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        <button>
          Adicionar Despesa
        </button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (globalState) => ({
  currencies: globalState.currencies,
});

export default connect(mapStateToProps)(WalletForm);
