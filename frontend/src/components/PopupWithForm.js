function PopupWithForm({
  name,
  title,
  submit,
  isOpen,
  onClose,
  onSubmit,
  children,
}) {
  const style = isOpen ? "popup_opened" : "";

  return (
    <div className={`popup popup_type_${name} ${style}`} onClick={onClose}>
      <div className="popup__container popup__container_type_input">
        <button
          className="button popup__close-btn"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form
          className="popup__form"
          name={name}
          onSubmit={onSubmit}
          noValidate
        >
          {children}
          <button
            type="submit"
            value={submit}
            className="button popup__save"
            aria-label={submit}
          >
            {submit}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
