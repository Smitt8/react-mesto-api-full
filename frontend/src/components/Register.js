import React from "react";
import { Link } from "react-router-dom";

function Register({title, bntText, onRegister}) {

  const [user, setUser] = React.useState({
    username: "",
    password: "",
  });

  function handleChange(event) {
    const {name, value} = event.target;
    setUser({...user,
      [name]: value
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!user.username || !user.password) {
      return;
    }

    onRegister(user);
  } 

  return (
    <section className="auth">
    <h1 className="auth__title">{title}</h1>
    <form className="auth__form" onSubmit={handleSubmit}>
      <label className="auth__label">
        <input
          type="email"
          className="auth__input"
          name="username"
          placeholder="Email"
          minLength="2"
          maxLength="30"
          onChange={handleChange}
          value={ user.username || "" }
          required
        />
      </label>
      <label className="auth__label">
        <input
          type="password"
          className="auth__input"
          name="password"
          placeholder="Пароль"
          minLength="6"
          maxLength="30"
          onChange={handleChange}
          value={ user.password || "" }
          required
        />
      </label>
      <button type="submit" className="button auth__submit">
        {bntText}
      </button>
    </form>
    <p className="auth__text">Уже зарегестрированы? <Link className="auth__link" to="/sign-in">Войти</Link></p>
  </section>
  );
}

export default Register;