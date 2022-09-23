import React from 'react';
import { CurrentUserContext } from "./CurrentUserContext";


function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  const user = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === user._id;
  const btnRemoveDisabledClass = !isOwn ? 'card__remove_disabled' : "";
  const isLiked = card.likes.some(i =>  i._id === user._id );
  const btnLikeClass = isLiked ? "card__btn-like_active" : "";
  

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="card">
      <img
        className="card__photo"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <button
        className={`button card__remove ${btnRemoveDisabledClass}`}
        type="button"
        aria-label="Удалить"
        onClick={handleDeleteClick}
      ></button>
      <div className="card__info">
        <h3 className="card__heading">{card.name}</h3>
        <div className="card__like">
          <button
            className={`button card__btn-like ${btnLikeClass}`}
            type="button"
            aria-label="Поставить лайк"
            onClick={handleLikeClick}
          ></button>
          <p className="card__cnt-like">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
