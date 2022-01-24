import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Overlay, ModalEl } from "./modal.styles";
import PropTypes from "prop-types";

const modalRoot = document.querySelector("#modal-root");
function Modal({ onClose, children }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.code === "Escape") {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = (event) => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };
  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalEl>{children}</ModalEl>
    </Overlay>,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};
export default Modal;
