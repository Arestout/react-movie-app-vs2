import React, { Component } from 'react';
import Login from './Login/Login';
import User from './User';

export default class Header extends Component {
  render() {
    const { user, updateUser, updateSessionID } = this.props;
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
          {user ? (
            <User user={user} />
          ) : (
            <Login updateUser={updateUser} updateSessionID={updateSessionID} />
          )}
        </div>
      </nav>
    );
  }
}
