import styles from './side-bar.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const SideBar = ({ collapsed }: { collapsed: boolean }) => {
  const tS = useTranslations('SideBar');
  const sideBarItems = [
    {
      name: tS('home'),
      href: '/',
    },
    {
      name: tS('settings'),
      href: '/',
    },
  ];
  return (
    <>
      <aside
        className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}
      >
        <div className={styles.sidebarHeader}>
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
        </div>
        <ul className={styles.sidebar__list}>
          {sideBarItems.map((item) => (
            <Link href={item.href} key={item.name}>
              {item.name}
            </Link>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default SideBar;
