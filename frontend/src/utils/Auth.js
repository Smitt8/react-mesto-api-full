const BASE_URL = "https://auth.nomoreparties.co"

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

  authorize = ({jwt}) =>  {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {...this._headers,
        "Authorization" : `Bearer ${jwt}`},
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
