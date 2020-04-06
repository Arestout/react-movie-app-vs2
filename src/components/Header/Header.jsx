import React, { Component } from 'react';
import UserMenu from './UserMenu';
import AppContextHOC from '../HOC/AppContextHOC';

class Header extends Component {
  render() {
    const { user, toggleLoginModal } = this.props;
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
            <UserMenu />
          ) : (
            <button
              className="btn btn-success"
              type="button"
              onClick={toggleLoginModal}
            >
              Login
            </button>
          )}
        </div>
      </nav>
    );
  }
}

export default AppContextHOC(Header);
