import React, { Component } from 'react';
import { Modal, ModalBody } from 'reactstrap';
import LoginForm from './LoginForm';

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      showModal: true,
    };
  }

  toggleModal = () => {
    this.setState((state) => ({
      showModal: !state.showModal,
    }));
  };

  render() {
    return <div></div>;
  }
}
