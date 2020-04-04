import queryString from 'query-string';
export const API_URL = 'https://api.themoviedb.org/3';

export const API_KEY_3 = 'b3999c3f3a12db3d3325f190c7a5e44f';

export const API_KEY_4 =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMzk5OWMzZjNhMTJkYjNkMzMyNWYxOTBjN2E1ZTQ0ZiIsInN1YiI6IjVlN2EzN2U3ZDE4YjI0MDAxMzgzZDg0OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CrF1NezmlzCAuEat5miZeA54Fo8okUDQPazc9-u6UHI';

export const fetchApi = (url, options = {}) => {
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then((response) => {
        if (response.status < 400) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then((data) => {
        resolve(data);
      })
      .catch((response) => {
        response.json().then((error) => {
          reject(error);
        });
      });
  });
};

export default class CallApi {
  static get(url, options = {}) {
    const { params = {} } = options;
    const queryStringParams = {
      api_key: API_KEY_3,
      ...params,
    };

    return fetchApi(
      `${API_URL}${url}?${queryString.stringify(queryStringParams)}`,
      {
        mode: 'cors',
        headers: {
          'Content-type': 'application/json',
        },
      }
    );
  }

  static post(url, options = {}) {
    const { params = {}, body = {} } = options;
    const queryStringParams = {
      api_key: API_KEY_3,
      ...params,
    };

    return fetchApi(
      `${API_URL}${url}?${queryString.stringify(queryStringParams)}`,
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );
  }

  static delete(url, options = {}) {
    const { params = {}, body = {} } = options;
    const queryStringParams = {
      api_key: API_KEY_3,
      ...params,
    };

    return fetchApi(
      `${API_URL}${url}?${queryString.stringify(queryStringParams)}`,
      {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );
  }
}
