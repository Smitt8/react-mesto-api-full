const BASE_URL = "http://localhost:3001"

class Auth {
  constructor({ url, headers}) {
    this._url = `${url}`;
    this._headers = headers;
  }

  _checkResult(result) {
    if (result.ok) {
      return result.json();
    }
    return Promise.reject(new Error (`Ошибка: ${result.status} --> ${result.statusText}`));
  }

  login = ({username: email, password}) => {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({email, password}),
      credentials: 'include',
    })
    .then(result => {
      return this._checkResult(result);
    });
  }

  register = ({username: email, password}) => {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({password, email}),
    })
    .then(result => {
      return this._checkResult(result);
    });
  }

  authorize = () =>  {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
      credentials: 'include',
    })
    .then(result => {
      return this._checkResult(result);
    });
  }

  logout = () => {
    return fetch(`${this._url}/signout`, {
      method: "DELETE",
      headers: this._headers,
      credentials: 'include',
    })
    .then(result => {
      return this._checkResult(result);
    });
  }
}

export const auth = new Auth({
  url: BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
});
