import { createPortal } from "react-dom";
import css from "./Modal.module.css";

export interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal = ({children, onClose }: ModalProps) => {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  return createPortal(
    <div
      onClick={handleBackdropClick}
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal}>
        <button
          className={css.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        {children} 
      </div>
    </div>,
    document.body
  );
};

export default Modal;
