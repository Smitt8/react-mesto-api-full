import React from "react";

import errImg from "../images/popup/popup__auth-err.svg";
import okImg from  "../images/popup/popup__auth-ok.svg"

function InfoTooltip({ isOpen, isOK, onClose }){
  const style = isOpen ? "popup_opened" : "Вы успешно зарегистрировались!";
  const alt = isOK ? "Выполнено успешно" : "Выполнено с ошибкой";
  const text = isOK ? "Вы успешно зарегистрировались!" :"Что-то пошло не так! Попробуйте еще раз."

  return (
    <div className={`popup popup_type_tooltip ${style}`} onClick={onClose}>
    <div className="popup__container popup__container_type_input">
      <button
        className="button popup__close-btn"
        type="button"
        aria-label="Закрыть"
        onClick={onClose}
      ></button>
      <div className="popup__auth">
        <img className="popup__status" src={isOK ? okImg : errImg } alt={alt} />
        <h2 className="popup__title">{text}</h2>
      </div>
    </div>
  </div>
  );
}

export default InfoTooltip;