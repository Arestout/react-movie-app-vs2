import React, { Component } from 'react';
import Login from './Login/Login';
import UserMenu from './UserMenu';

export default class Header extends Component {
  render() {
    const { user } = this.props;
    return (
      <nav className="navbar navbar-dark bg-primary">
        <div className="container">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                Home
              </a>
            </li>
          </ul>
          {user ? <UserMenu /> : <Login user={user} />}
        </div>
      </nav>
    );
  }
}
