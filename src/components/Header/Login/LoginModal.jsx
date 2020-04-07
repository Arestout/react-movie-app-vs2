import React, { Component } from 'react';
import LoginForm from './LoginForm';
import { Modal, ModalBody } from 'reactstrap';

export default class LoginModal extends Component {
  render() {
    return (
      <Modal
        isOpen={this.props.showLoginModal}
        toggle={this.props.toggleLoginModal}
      >
        <ModalBody>
          <LoginForm />
        </ModalBody>
      </Modal>
    );
  }
}
