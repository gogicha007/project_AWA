import styles from './side-bar.module.css';
import Link from 'next/link';
import Image from 'next/image';

const SideBar = () => {
  return (
    <div>
      <aside className={styles.sidebar}>
        <Link href="/">
          <Image
            src="./logo.svg"
            alt="logo"
            className={styles.logo}
            width={120}
            height={39}
            priority
          />
        </Link>
        <Link href="/">Dashboard</Link>
      </aside>
    </div>
  );
};

export default SideBar;
