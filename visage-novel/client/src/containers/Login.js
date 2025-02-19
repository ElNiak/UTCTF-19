/* eslint-disable no-console */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

import {
  LinkButtons,
  SubmitButtons,
  registerButton,
  loginButton,
  inputStyle,
  HeaderBar,
} from '../components';

const title = {
  pageTitle: 'Login Screen',
};

class Login extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      loggedIn: false,
      showError: false,
      showNullError: false,
    };
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  loginUser = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    if (username === '' || password === '') {
      this.setState({
        showError: false,
        showNullError: true,
        loggedIn: false,
      });
    } else {
      axios
        .post('http://visagenovel.ga:3003/loginUser', {
          username,
          password,
        })
        .then((response) => {
          // console.log(response.data);
          localStorage.setItem('JWT', response.data.token);
          localStorage.setItem('logged_in_user', username);
          this.setState({
            loggedIn: true,
            showError: false,
            showNullError: false,
          });
        })
        .catch((error) => {
          console.error(error.response.data);
          if (
            error.response.data === 'bad username'
            || error.response.data === 'passwords do not match'
          ) {
            this.setState({
              showError: true,
              showNullError: false,
            });
          }
        });
    }
  };

  render() {
    const {
      username,
      password,
      showError,
      loggedIn,
      showNullError,
    } = this.state;
    if (!loggedIn) {
      return (
        <div>
          <HeaderBar title={title} />
          <form className="profile-form" onSubmit={this.loginUser}>
            <h1>Login</h1>
            <TextField
              style={inputStyle}
              id="username"
              label="username"
              value={username}
              onChange={this.handleChange('username')}
              placeholder="Username"
            />
            <br />
            <TextField
              style={inputStyle}
              id="password"
              label="password"
              value={password}
              onChange={this.handleChange('password')}
              placeholder="Password"
              type="password"
            />
            <br />
            <SubmitButtons buttonStyle={loginButton} buttonText="Login" />
          </form>
          {showNullError && (
            <div>
              <p>The username or password cannot be null.</p>
            </div>
          )}
          {showError && (
            <div>
              <p>
                That username or password isn&apos;t recognized. Please try
                again or register now.
              </p>
              <LinkButtons
                buttonText="Register"
                buttonStyle={registerButton}
                link="/register"
              />
            </div>
          )}
        </div>
      );
    }
    return <Redirect to={`/userProfile/${username}`} />;
  }
}

export default Login;
