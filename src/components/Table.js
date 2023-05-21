import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
/* import { addUserExpense } from '../redux/actions'; */

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <div>
        <header>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </header>
        <tbody>
          {expenses.map((data) => (
            <tr key={ data.id }>
              <td>{data.description}</td>
              <td>{data.tag}</td>
              <td>{data.method}</td>
              <td>{Number(data.value).toFixed(2)}</td>
              <td>{data.exchangeRates[data.currency].name}</td>
              <td>{Number(data.exchangeRates[data.currency].ask).toFixed(2)}</td>
              <td>
                {(Number(data.value) * Number(data.exchangeRates[data.currency].ask))
                  .toFixed(2)}

              </td>
              <td>Real</td>
            </tr>
          ))}
        </tbody>
      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  expenses: globalState.wallet.expenses,
});

Table.propTypes = {
  dispatch: PropTypes.func,
  expenses: PropTypes.shape({
    map: PropTypes.func,
  }),
}.isRequired;

export default connect(mapStateToProps)(Table);
