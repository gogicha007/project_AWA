import React from 'react';
import styles from './snackbar.module.css';

interface SnackbarProps {
  message: string;
  open: boolean;
  onClose: () => void;
  duration?: number;
}

const Snackbar: React.FC<SnackbarProps> = ({ message, open, onClose, duration = 4000 }) => {
  React.useEffect(() => {
    if (!open) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [open, duration, onClose]);

  if (!open) return null;

  return (
    <div className={styles.snackbar} onClick={onClose}>
      {message}
    </div>
  );
};

export default Snackbar;