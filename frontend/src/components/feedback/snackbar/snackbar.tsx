import React from 'react';
import styles from './snackbar.module.css';

interface SnackbarProps {
  status: {
    message: string;
    success: boolean;
  };
  open: boolean;
  onClose: () => void;
  duration?: number;
}

const Snackbar: React.FC<SnackbarProps> = ({
  status,
  open,
  onClose,
  duration = 4000,
}) => {
  React.useEffect(() => {
    if (!open) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [open, duration, onClose]);

  if (!open) return null;

  return (
    <div
      className={`${styles.snackbar} ${status.success ? styles.success : ''}`}
      onClick={onClose}
    >
      {status.message}
    </div>
  );
};

export default Snackbar;
