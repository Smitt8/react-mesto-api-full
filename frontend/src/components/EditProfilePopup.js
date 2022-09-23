import React from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [user, setUser] = React.useState({
    name: currentUser.name,
    about: currentUser.about,
  });

  React.useEffect(() => {
    setUser({ name: currentUser.name, about: currentUser.about });
  }, [currentUser, isOpen]);

  function handleChangeName(event) {
    setUser({ name: event.target.value, about: user.about });
  }

  function handleChangeDescription(event) {
    setUser({ name: user.name, about: event.target.value });
  }

  function handleSubmitForm(event) {
    event.preventDefault();

    onUpdateUser(user);
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      submit="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmitForm}
    >
      <label className="popup__label">
        <input
          type="text"
          name="user-name"
          id="user-name"
          className="popup__input popup__input_type_name"
          placeholder="Имя Фамилия"
          minLength="2"
          maxLength="40"
          value={user.name}
          onChange={handleChangeName}
          required
        />
        <span className="popup__error" id="user-name-error"></span>
      </label>
      <label className="popup__label">
        <input
          type="text"
          name="user-about"
          id="user-about"
          className="popup__input popup__input_type_job"
          placeholder="Профессия"
          minLength="2"
          maxLength="200"
          value={user.about}
          onChange={handleChangeDescription}
          required
        />
        <span className="popup__error" id="user-about-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
