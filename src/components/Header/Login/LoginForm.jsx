import React from 'react';
import PropTypes from 'prop-types';
import { API_URL, API_KEY_3, fetchApi } from '../../../api/api';
import UIInput from '../../UIComponents/UIInput';

export default class LoginForm extends React.Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      repeatPassword: '',
      errors: {},
      submitting: false,
    };
  }

  static propTypes = {
    updateUser: PropTypes.func.isRequired,
    updateSessionID: PropTypes.func.isRequired,
  };

  onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState((state) => ({
      [name]: value,
      errors: {
        ...state.errors,
        base: null,
        [name]: null,
      },
    }));
  };

  handleBlur = (e) => {
    console.log('on blur');
    const name = e.target.name;
    const errors = this.validateFields();
    if (Object.keys(errors).length > 0) {
      this.setState((state) => ({
        errors: {
          ...state.errors,
          [name]: errors[name],
        },
      }));
    }
  };

  validateFields = () => {
    const errors = {};
    const { username, password, repeatPassword } = this.state;

    if (username === '') {
      errors.username = 'Should not be empty';
    }

    if (password.length === 0) {
      errors.password = 'Should not be empty';
    }

    if (repeatPassword.length === 0 || repeatPassword !== password) {
      errors.repeatPassword = 'Should be equal to password';
    }

    return errors;
  };

  onSubmit = () => {
    this.setState({
      submitting: true,
    });

    fetchApi(`${API_URL}/authentication/token/new?api_key=${API_KEY_3}`)
      .then((data) => {
        return fetchApi(
          `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`,
          {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify({
              username: this.state.username,
              password: this.state.password,
              request_token: data.request_token,
            }),
          }
        );
      })
      .then((data) => {
        return fetchApi(
          `${API_URL}/authentication/session/new?api_key=${API_KEY_3}`,
          {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify({
              request_token: data.request_token,
            }),
          }
        );
      })
      .then((data) => {
        this.props.updateSessionID(data.session_id);
        return fetchApi(
          `${API_URL}/account?api_key=${API_KEY_3}&session_id=${data.session_id}`
        );
      })
      .then((user) => {
        console.log('session', user);
        this.props.updateUser(user);
        this.setState({
          submitting: false,
        });
      })
      .catch((error) => {
        console.log('error', error);
        this.setState({
          submitting: false,
          errors: {
            base: error.status_message,
          },
        });
      });
  };

  onLogin = (e) => {
    e.preventDefault();
    const errors = this.validateFields();
    if (Object.keys(errors).length > 0) {
      this.setState((prevState) => ({
        errors: {
          ...prevState.errors,
          ...errors,
        },
      }));
    } else {
      this.onSubmit();
    }
  };

  render() {
    const {
      username,
      password,
      errors,
      submitting,
      repeatPassword,
    } = this.state;
    return (
      <div className="form-login-container">
        <form className="form-login">
          <h1 className="h3 mb-3 font-weight-normal text-center">Log in</h1>
          <UIInput
            type="text"
            id="username"
            placeholder="Username"
            labelText="Username"
            name="username"
            value={username}
            onChange={this.onChange}
            onBlur={this.handleBlur}
            error={errors.username}
          />

          <UIInput
            type="password"
            id="password"
            placeholder="Password"
            labelText="Password"
            name="password"
            value={password}
            onChange={this.onChange}
            onBlur={this.handleBlur}
            error={errors.password}
          />

          <UIInput
            type="password"
            id="repeatPassword"
            placeholder="Repeat password"
            labelText="Repeat password"
            name="repeatPassword"
            value={repeatPassword}
            onChange={this.onChange}
            onBlur={this.handleBlur}
            error={errors.repeatPassword}
          />

          <button
            type="submit"
            className="btn btn-lg btn-primary btn-block"
            onClick={this.onLogin}
            disabled={submitting}
          >
            Log in
          </button>
          {errors.base && (
            <div className="invalid-feedback text-center">{errors.base}</div>
          )}
        </form>
      </div>
    );
  }
}
