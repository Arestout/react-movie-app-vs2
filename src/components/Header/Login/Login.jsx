import React, { Component } from 'react';
import { Modal, ModalBody } from 'reactstrap';
import LoginForm from './LoginForm';

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      showModal: false,
    };
  }

  toggleModal = () => {
    this.setState((state) => ({
      showModal: !state.showModal,
    }));
  };

  render() {
    return (
      <div>
        <button
          className="btn btn-success"
          type="button"
          onClick={this.toggleModal}
        >
          Login
        </button>
        <Modal isOpen={this.state.showModal} toggle={this.toggleModal}>
          <ModalBody>
            <LoginForm
              updateUser={this.props.updateUser}
              updateSessionID={this.props.updateSessionID}
            />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
