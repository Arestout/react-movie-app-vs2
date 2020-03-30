import React, { Component } from 'react';

export default class User extends Component {
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
