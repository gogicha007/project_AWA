import styles from './side-bar.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface IMenuItem {
  label: string;
  href: string;
  submenu?: [];
}
interface IMultiMenu {
  label: string;
  href: string;
  submenu?: IMenuItem[];
}
const SideBar = ({ collapsed }: { collapsed: boolean }) => {
  const tS = useTranslations('SideBar');
  const sideBarItems = [
    {
      label: tS('home'),
      href: '/',
    },
    {
      label: tS('settings'),
      href: '/',
      submenu: [
        {
          label: tS('masterData'),
          href: '/',
        },
      ],
    },
  ];

  const toggleSubMenu = () => {
    console.log('submenu clicked');
  };

  const renderSubMenu = (subMenu: IMultiMenu[]) => {
    return (
      <ul>
        {subMenu.map((subItem, idx) => (
          <Link href={subItem.href} key={idx}>
            {subItem.label}
            {subItem.submenu && renderSubMenu(subItem.submenu)}
          </Link>
        ))}
      </ul>
    );
  };

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
          {sideBarItems.map((item, idx) => (
            <Link href={item.href} key={idx} onClick={toggleSubMenu}>
              {item.label}
              {item.submenu && renderSubMenu(item.submenu)}
            </Link>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default SideBar;
