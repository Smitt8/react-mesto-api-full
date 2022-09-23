import React from "react";
import { Link, Route, Switch } from "react-router-dom";

function Header({ logo, email, onSignOut }) {
  
  function handleSignOut() {
    onSignOut();
  }

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Место Россия" />
      <nav className="header__navbar">
        <Switch>
          <Route path="/sign-in">
            <Link className="header__link" to="/sign-up">
              Регистрация
            </Link>
          </Route>
          <Route path="/sign-up">
            <Link className="header__link" to="/sign-in">
              Войти
            </Link>
          </Route>
          <Route exact path="/">
            <div className="header__signout">
              {email && <p className="header__email">{email}</p>}
              <button className="header__link header__button" onClick={handleSignOut}>Выйти</button>
            </div>
          </Route>
        </Switch>
      </nav>
    </header>
  );
}

export default Header;
