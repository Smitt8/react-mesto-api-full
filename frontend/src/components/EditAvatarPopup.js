import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

  const avatarInput = React.createRef();

  React.useEffect(() => {
    avatarInput.current.value = "";
  }, [isOpen]);

  function handleSubmitForm(event) {
    event.preventDefault();

    onUpdateAvatar({
      avatar: avatarInput.current.value,
    });

  }

  return (
    <PopupWithForm
          name="avatar"
          title="Обновить аватар"
          submit="Сохранить"
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmitForm}
        >
          <label className="popup__label">
            <input
              type="url"
              name="user-avatar"
              id="user-avatar"
              className="popup__input popup__input_type_place"
              placeholder="Ссылка на аватар"
              minLength="2"
              maxLength="150"
              ref={avatarInput}
              required
            />
            <span className="popup__error" id="user-avatar-error"></span>
          </label>
        </PopupWithForm>
  )
}

export default EditAvatarPopup;