import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class User extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  };

  render() {
    const { user } = this.props;
    return (
      <div>
        <img
          className="avatar-img rounded-circle"
          src={`https://secure.gravatar.com/avatar/${user.avatar.gravatar.hash}.jpg?s=64"`}
          alt=""
        />
      </div>
    );
  }
}
