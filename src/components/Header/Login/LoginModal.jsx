import React, { Component } from 'react';
import LoginForm from './LoginForm';
import { Modal, ModalBody } from 'reactstrap';
import { withAuth } from '../../../hoc/withAuth';

class LoginModal extends Component {
  render() {
    const { auth, authActions } = this.props;
    return (
      <Modal isOpen={auth.showLoginModal} toggle={authActions.toggleLoginModal}>
        <ModalBody>
          <LoginForm />
        </ModalBody>
      </Modal>
    );
  }
}

export default withAuth(LoginModal);
