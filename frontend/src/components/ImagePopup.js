function ImagePopup(props) {

  const style = (props.card._id) && "popup_opened"
  return (
    <div className={`popup popup_type_viewer ${style}`}
    onClick={props.onClose}>
      <figure className="popup__container popup__container_type_viewer">
        <button
          className="button popup__close-btn popup__close-btn_place_viewer"
          type="button"
          aria-label="Закрыть"
          onClick={props.onClose}
        ></button>
        <img className="popup__img" src={props.card.link} alt={props.card.name} />
        <figcaption className="popup__text">{props.card.name}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;