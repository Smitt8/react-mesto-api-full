import React from "react";
import logo from "../images/header/header__logo.svg";

import "../index.css";
import { api } from "../utils/Api";
import { auth } from "../utils/Auth.js";
import Footer from "./Footer.js";
import Header from "./Header.js";
import ImagePopup from "./ImagePopup.js";
import Main from "./Main.js";
import PopupWithForm from "./PopupWithForm.js";
import EditProfilePopup from "./EditProfilePopup";
import { CurrentUserContext } from "./CurrentUserContext";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import InfoTooltip from "./InfoTooltip";
import { Switch, Route, useHistory, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isTooltipPopupOpen, setTooltipPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [userEmail, setUserEmail] = React.useState("");
  const [cards, setCards] = React.useState([]);
  const [isOK, setOK] = React.useState(true);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const history = useHistory();

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getCards()])
        .then(([userData, cards]) => {
          setCurrentUser(userData);
          setCards(cards);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  React.useEffect(() => {
    const authorized = localStorage.getItem('auth');
    if (authorized) {
      auth
        .authorize()
        .then((res) => {
          setLoggedIn(true);
          setUserEmail(res.email);
          history.push("/");
        })
        .catch((err) => {
          setOK(false);
          setTooltipPopupOpen(true);
          console.log(err);
        });
    }
  }, [history]);

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups(event) {
    if (typeof event === "undefined" || event.target === event.currentTarget) {
      setEditAvatarPopupOpen(false);
      setEditProfilePopupOpen(false);
      setAddPlacePopupOpen(false);
      setTooltipPopupOpen(false);
      setSelectedCard({});
    }
  }

  function handleUpdateUser({ name, about }) {
    api
      .patchUserInfo(name, about)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    console.log(avatar);
    api
      .changeAvatar(avatar)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        setOK(false);
        setTooltipPopupOpen(true);
        console.log(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        console.log(newCard);
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        setOK(false);
        setTooltipPopupOpen(true);
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        setOK(false);
        setTooltipPopupOpen(true);
        console.log(err);
      });
  }

  function handleAddPlaceSubmit({ name, link }) {
    api
      .postCard(name, link)
      .then((newCard) => {
        console.log(newCard);
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        setOK(false);
        setTooltipPopupOpen(true);
        console.log(err);
      });
  }

  function handleLogin(data) {
    auth
      .login(data)
      .then((res) => {
        localStorage.setItem('auth', true);
        setUserEmail(data.username);
        setLoggedIn(true);
        history.push("/");
      })
      .catch((err) => {
        setOK(false);
        setTooltipPopupOpen(true);
        console.log(err);
      });
  }

  function handleRegister(data) {
    auth
      .register(data)
      .then(() => {
        setOK(true);
        setTooltipPopupOpen(true);
        history.push("/sign-in");
      })
      .catch((err) => {
        setOK(false);
        setTooltipPopupOpen(true);
      });
  }

  function handleSignOut(e) {
    auth.logout().then(() => {
      localStorage.removeItem('auth');
      history.push('/sign-in');
    })
    .catch(() => {
      setOK(false);
      setTooltipPopupOpen(true);
    });
  }

  return (
    <div className="page">
      <Header logo={logo} email={userEmail} onSignOut={handleSignOut} />
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
            <ProtectedRoute
              exact
              path="/"
              loggedIn={loggedIn}
              component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          <Route path="/sign-in">
            <Login title="Вход" bntText="Войти" onLogin={handleLogin} />
          </Route>
          <Route path="/sign-up">
            <Register
              title="Регистрация"
              bntText="Зарегестрироваться"
              onRegister={handleRegister}
            />
          </Route>
          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        <Footer />
        {currentUser.avatar && (
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
        )}
        {currentUser.name && (
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
        )}
      </CurrentUserContext.Provider>
      {cards && (
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
      )}
      <PopupWithForm
        name="confirm"
        title="Вы уверены?"
        submit="Да"
        onClose={closeAllPopups}
      />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <InfoTooltip
        isOpen={isTooltipPopupOpen}
        onClose={closeAllPopups}
        isOK={isOK}
      />
    </div>
  );
}

export default App;
