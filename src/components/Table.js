import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteTabledata } from '../redux/actions';
import '../styles/table.css';

class Table extends Component {
  handleClick = (id) => {
    const { dispatch } = this.props;
    dispatch(deleteTabledata(id));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div className="table__container">
        <table className="wallet__table">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Excluir</th>
            </tr>
          </thead>
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
                <td>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.handleClick(data.id) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
