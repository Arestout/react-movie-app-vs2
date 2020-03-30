import React, { Component } from 'react';
import { API_URL, API_KEY_3 } from '../../../api/api';
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

  //===========

  // sendPromises = () => {
  //   const fetchApi = (url, options = {}) => {
  //     return new Promise((resolve, reject) => {
  //       fetch(url, options)
  //         .then((response) => {
  //           if (response.status < 400) {
  //             return response.json();
  //           } else {
  //             throw response;
  //           }
  //         })
  //         .then((data) => {
  //           resolve(data);
  //         })
  //         .catch((response) => {
  //           response.json().then((error) => {
  //             reject(error);
  //           });
  //         });
  //     });
  //   };

  //   fetchApi(`${API_URL}/authentication/token/new?api_key=${API_KEY_3}`)
  //     .then((data) => {
  //       return fetchApi(
  //         `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`,
  //         {
  //           method: 'POST',
  //           mode: 'cors',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           body: JSON.stringify({
  //             username: 'Hextus',
  //             password: 'moviepass',
  //             request_token: data.request_token,
  //           }),
  //         }
  //       );
  //     })
  //     .then((data) => {
  //       return fetchApi(
  //         `${API_URL}/authentication/session/new?api_key=${API_KEY_3}`,
  //         {
  //           method: 'POST',
  //           mode: 'cors',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           body: JSON.stringify({
  //             request_token: data.request_token,
  //           }),
  //         }
  //       );
  //     })
  //     .then((data) => {
  //       console.log('Success', data);
  //     })
  //     .catch((error) => {
  //       console.log('Error', error);
  //     });
  // };

  //================================

  // const getRequestToken = () => {
  //   return new Promise((resolve, reject) => {
  //     fetch(`${API_URL}/authentication/token/new?api_key=${API_KEY_3}`)
  //       .then((response) => {
  //         if (response.status < 400) {
  //           return response.json();
  //         } else {
  //           throw response;
  //         }
  //       })
  //       .then((data) => {
  //         resolve(data);
  //       })
  //       .catch((response) => {
  //         response.json().then((error) => {
  //           reject(error);
  //         });
  //       });
  //   });
  // };

  // const validateWithLogin = (body) => {
  //   return new Promise((resolve, reject) => {
  //     fetch(
  //       `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`,
  //       {
  //         method: 'POST',
  //         mode: 'cors',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(body),
  //       }
  //     )
  //       .then((response) => {
  //         if (response.status < 400) {
  //           return response.json();
  //         } else {
  //           throw response;
  //         }
  //       })
  //       .then((data) => {
  //         resolve(data);
  //       })
  //       .catch((response) => {
  //         response.json().then((error) => {
  //           reject(error);
  //         });
  //       });
  //   });
  // };

  //   fetch(`${API_URL}/authentication/token/new?api_key=${API_KEY_3}`)
  //     .then((response) => response.json())
  //     .then((data) =>
  //       fetch(
  //         `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`,
  //         {
  //           method: 'POST',
  //           mode: 'cors',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           body: JSON.stringify({
  //             username: 'Hextus',
  //             password: 'moviepass',
  //             request_token: data.request_token,
  //           }),
  //         }
  //       )
  //         .then((response) => response.json())
  //         .then((data) =>
  //           fetch(
  //             `${API_URL}/authentication/session/new?api_key=${API_KEY_3}`,
  //             {
  //               method: 'POST',
  //               mode: 'cors',
  //               headers: {
  //                 'Content-Type': 'application/json',
  //               },
  //               body: JSON.stringify({
  //                 request_token: data.request_token,
  //               }),
  //             }
  //           )
  //             .then((response) => response.json())
  //             .then((data) => console.log('session', data))
  //         )
  //     );
  // };

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
