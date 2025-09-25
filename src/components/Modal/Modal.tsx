import css from "./Modal.module.css"
import { useEffect, type ReactPortal } from "react";
import { createPortal } from "react-dom";


interface NoteModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal = ({ isOpen, onClose , children }: NoteModalProps):ReactPortal | null => {
    useEffect(() => {
        //кнопка Esc
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [isOpen, onClose]);

    useEffect(() => {
        if (!isOpen) return;
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";// заблокувати скролл фону

        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, [isOpen]);

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) onClose();
    };
    
    if (!isOpen) return null;

    return createPortal(
        <div
            className={css.backdrop}
            role="dialog"
            aria-modal="true"
            onClick={handleBackdropClick}
        >
            <div className={css.modal}>{children}
                <button
                    className={css.closeButton}
                    aria-label="Close modal"
                    onClick={onClose}
                >
                    &times;
                </button>
            </div>
        </div>,
        document.getElementById("modal-root") as HTMLDivElement
    )
}

export default Modal