import styles from './ConfirmationBox.module.css'

interface Task {
    id: number;
    text: string;
    done: boolean;
}

interface ModalProps {
  task: Task | null;  
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: (id: number) => void;
  title?: string;
  children?: React.ReactNode;
}

function Modal({ task, isOpen, onClose, onConfirm, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>{title}</h3>

        <div className="content">
          {children}
        </div>

        <div className={styles.action}>
          {onConfirm && task &&<button className={styles.confirm} onClick={() => onConfirm(task.id)}>Confirm</button>}
          <button className={styles.cancel} onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;