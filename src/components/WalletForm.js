import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrencies } from '../redux/actions';

class WalletForm extends Component {
  // chamar a função que esta nas actions para setar o currencies [ok]

  /* state = {
    currency: 'teste',
  }; -> estava atualizando de acordo com o estado local que está com a string
  vazia, precisa pegar do estado global como abaixo */

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
    // muda as informações das moedas de acordo com o value
  };

  render() {
    const { currencies } = this.props;
    // const { currency } = this.state -> não precisa de um estado local;
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
          value={ currencies }
          name="currencies"
        >
          {
            currencies.map((coin) => (
              <option key={ coin } value={ coin }>
                {coin}
              </option>))
          // esse map e para iterar sobre todas as moedas retornadas pelo estado
          // global e utilizar elas em cada option
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
  currencies: globalState.wallet.currencies,
  // acessando o array de currencies e pegando do estado global o walletReducer (que tem o alias de wallet) e depois acessar a chave
  // currencies que me retorna a action.payload da action 'fetchWalletForm'
});

export default connect(mapStateToProps)(WalletForm);
