import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "./CurrentUserContext";

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete }) {
  const user = React.useContext(CurrentUserContext);
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__user">
          <div className="profile__avatar">
            {user.avatar && (
              <img
                className="profile__avatar-img"
                alt="Аватар"
                src={user.avatar}
              />
            )}
            <div
              className="profile__overlay"
              onClick={onEditAvatar}
            ></div>
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{user.name}</h1>
            <button
              className="button profile__edit-btn"
              type="button"
              aria-label="Править профиль"
              onClick={onEditProfile}
            />
            <p className="profile__about">{user.about}</p>
          </div>
        </div>
        <button
          className="button profile__add-btn"
          type="button"
          aria-label="Добавить фото"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="places">
        <ul className="cards">
          {user && cards.map((card) => {
            return (
              <Card
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}
export default Main;
