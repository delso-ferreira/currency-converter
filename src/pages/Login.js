import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { submitUserForm } from '../redux/actions';

class Login extends React.Component {
  state = {
    btnDisabled: true,
    email: '',
    password: '',
  };

  handleLoginValidation = () => {
    const { email, password } = this.state;

    const minEmail = 6;
    const minLength = password.length >= minEmail;

    const confirm = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // https://stackoverflow.com/questions/39356826/how-to-check-if-it-a-text-input-has-a-valid-email-format-in-reactjs
    if (confirm.test(email)) {
      this.setState({
        btnDisabled: !(confirm.test(email) && minLength),
      });
    }
  };

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, this.handleLoginValidation);
  };

  handleSubmit = () => {
    const { email } = this.state;
    const { dispatch, history } = this.props;

    dispatch(submitUserForm(email));
    history.push('/carteira');
  };

  render() {
    const {
      email,
      password,
    } = this.state;

    const { btnDisabled } = this.state;
    return (
      <form>
        <label htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          data-testid="email-input"
          value={ email }
          onChange={ this.handleInputChange }
        />
        <label htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          data-testid="password-input"
          value={ password }
          onChange={ this.handleInputChange }
        />
        <button
          type="button"
          name="btnDisabled"
          disabled={ btnDisabled }
          onClick={ this.handleSubmit }
        >
          Entrar
        </button>
      </form>

    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
