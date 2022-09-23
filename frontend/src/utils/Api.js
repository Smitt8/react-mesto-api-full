import { serverConfig } from "./constants";

class Api {
  constructor({ url, cohort, headers}) {
    this._url = `${url}/v1/${cohort}`;
    this._headers = headers;
  }

  _checkResult(result) {
    if (result.ok) {
      return result.json();
    }
    return Promise.reject(`Ошибка: ${result.statusText}`);
  }

  getUserInfo = () => {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    })
      .then((result) => {
        return this._checkResult(result);
      })
  };

  patchUserInfo = (name, about) => {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    })
      .then((result) => {
        return this._checkResult(result);
      })
  };

  changeAvatar = (avatar) => {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    })
      .then((result) => {
        return this._checkResult(result);
      })
  };

  getCards = () => {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    })
      .then((result) => {
        return this._checkResult(result);
      })
  };

  postCard = (name, link) => {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
      .then((result) => {
        return this._checkResult(result);
      })
  };

  deleteCard = (cardId) => {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((result) => {
        return this._checkResult(result);
      })
  };

  changeLikeCardStatus = (cardId, isLiked) => {
    const method = isLiked ? "DELETE" : "PUT";
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: method,
      headers: this._headers,
    })
      .then((result) => {
        return this._checkResult(result);
      })
  }
}

export const api = new Api({
  url: serverConfig.url,
  cohort: serverConfig.cohort,
  headers: {
    "Content-type": "application/json",
    authorization: `${serverConfig.token}`,
  },
});
