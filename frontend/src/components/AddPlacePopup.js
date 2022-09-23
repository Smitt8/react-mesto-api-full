import React from "react"
import PopupWithForm from "./PopupWithForm"

function AddPlacePopup({isOpen, onClose, onAddPlace}) {

  const [place, setPlace] = React.useState({});

  React.useEffect(() => {
    setPlace({
      name:"",
      link: "",
    });
  }, [isOpen])
  
  function handleChangePlaceName(event) {
    setPlace({
      name: event.target.value,
      link: place.link
    });
  }

  function handleChangePlaceLink(event) {
    setPlace({
      name: place.name,
      link:event.target.value,
    });
  }

  function handleSubmitForm(event) {
    event.preventDefault();

    onAddPlace(place);
    
  }

  return (
    <PopupWithForm
        name="add"
        title="Новое место"
        submit="Сохранить"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmitForm}
      >
        <label className="popup__label">
          <input
            type="text"
            name="place-name"
            id="place-name"
            className="popup__input popup__input_type_place"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            onChange={handleChangePlaceName}
            value={place.name || ""}
            required
          />
          <span className="popup__error" id="place-name-error"></span>
        </label>
        <label className="popup__label">
          <input
            type="url"
            name="place-link"
            id="place-link"
            className="popup__input popup__input_type_link"
            placeholder="Ссылка на картинку"
            onChange={handleChangePlaceLink}
            value={place.link || ""}
            required
          />
          <span className="popup__error" id="place-link-error"></span>
        </label>
      </PopupWithForm>
  )
}
export default AddPlacePopup;