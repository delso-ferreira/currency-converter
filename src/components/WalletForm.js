import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrencies, addUserExpense } from '../redux/actions';

class WalletForm extends Component {
  // chamar a função que esta nas actions para setar o currencies [ok]

  /* state = {
    currency: 'teste',
  }; -> estava atualizando de acordo com o estado local que está com a string
  vazia, precisa pegar do estado global como abaixo */

  // o estadeo local precisa existir para os inputs que o usuário coloca nessa tela para depois ir ao global

  state = {
    value: '',
    currency: 'USD',
    description: '',
    method: 'Dinheiro',
    tag: 'Alimentação',
    id: 0,
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
    // muda as informações de acordo com o value
  };

  handleClick = () => {
    const { dispatch } = this.props;
    dispatch(addUserExpense(this.state));

    this.setState((prevstate) => ({
      value: '',
      currency: 'USD',
      description: '',
      method: 'Dinheiro',
      tag: 'Alimentação',
      id: prevstate.id + 1,
    }));
  };

  render() {
    const { currencies } = this.props;
    // const { currency } = this.state -> não precisa de um estado local;
    // aqui utilizar o currencies do props do estado global
    const { value, currency, description, method, tag } = this.state;
    return (
      <form>
        <label htmlFor="valor">
          Valor
        </label>
        <input
          type="text"
          name="value"
          onChange={ this.handleCurrencies }
          value={ value }
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
          name="currency"
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
          name="description"
          onChange={ this.handleCurrencies }
          value={ description }
          data-testid="description-input"
        />
        <label htmlFor="moeda">
          Método de Pagamento
        </label>
        <select
          data-testid="method-input"
          type="text"
          onChange={ this.handleCurrencies }
          value={ method }
          name="method"
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <label htmlFor="categoria">
          Categoria
        </label>
        <select
          data-testid="tag-input"
          type="text"
          onChange={ this.handleCurrencies }
          name="tag"
          value={ tag }
        >
          <option value="Lazer">Lazer</option>
          <option value="Alimentação">Alimentação</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        <button
          onClick={ this.handleClick }
          type="button"
        >
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
