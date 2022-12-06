import "./modal.scss";

const Modal = ({ handleClose, show, childern }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">{childern}</section>
      <button type="button" onClick={handleClose}>
        Sigunp First
      </button>
    </div>
  );
};

export default Modal;