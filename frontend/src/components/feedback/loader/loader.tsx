import styles from './loader.module.css';

const Loader = () => {
  return (
    <div className={styles.modal}>
      <div className={styles.loader} data-testid="loader"></div>
    </div>
  );
};

export default Loader;