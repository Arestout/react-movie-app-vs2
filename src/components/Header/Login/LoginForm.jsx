import React from 'react';
import PropTypes from 'prop-types';
import CallApi from '../../../api/api';
import UIInput from '../../UIComponents/UIInput';
import { withAuth } from '../../../hoc/withAuth';

class LoginForm extends React.Component {
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
    const name = e.target.name;
    const errors = this.validateFields();
    const error = errors[name];

    if (error) {
      this.setState((state) => ({
        errors: {
          ...state.errors,
          [name]: error,
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
    let session_id = null;
    CallApi.get('/authentication/token/new')
      .then((data) => {
        return CallApi.post('/authentication/token/validate_with_login', {
          body: {
            username: this.state.username,
            password: this.state.password,
            request_token: data.request_token,
          },
        });
      })
      .then((data) => {
        return CallApi.post('/authentication/session/new', {
          body: {
            request_token: data.request_token,
          },
        });
      })
      .then((data) => {
        session_id = data.session_id;
        return CallApi.get('/account', {
          params: {
            session_id: data.session_id,
          },
        });
      })
      .then((user) => {
        this.setState(
          {
            submitting: false,
          },
          () => {
            this.props.authActions.updateAuth({ user, session_id });
            this.props.authActions.toggleLoginModal();
          }
        );
      })
      .catch((error) => {
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

export default withAuth(LoginForm);
