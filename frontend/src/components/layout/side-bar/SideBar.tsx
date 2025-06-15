import styles from './side-bar.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface IMenuItem {
  label: string;
  href?: string;
  submenu?: IMenuItem[];
}
const SideBar = ({ collapsed }: { collapsed: boolean }) => {
  const tS = useTranslations('SideBar');
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {}
  );

  const sideBarItems = [
    {
      label: tS('home'),
      href: '/',
    },
    {
      label: tS('logistics'),
      href: '/shipments',
    },
    {
      label: tS('warehouse'),
      href: '/warehouse',
    },
    {
      label: tS('settings'),
      submenu: [
        {
          label: tS('masterData'),
          href: '/settings//master-data',
        },
        {
          label: tS('vendors'),
          href: '/settings/vendors',
        },
      ],
    },
  ];

  const toggleSubMenu = (itemPath: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemPath]: !prev[itemPath],
    }));
  };

  const renderSubMenu = (subMenu: IMenuItem[], parentPath = '') => {
    return (
      <ul className={`${styles.sidebar__list} ${styles.submenu}`}>
        {subMenu.map((subItem, idx) => {
          const itemPath = `${parentPath}-${idx}`;
          const isExpanded = expandedItems[itemPath];

          return (
            <li key={idx}>
              {subItem.submenu ? (
                <div className={styles.sidebar__list_item}>
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSubMenu(itemPath);
                    }}
                    className={styles.submenu_toggle}
                  >
                    {subItem.label}
                  </span>
                  {isExpanded && renderSubMenu(subItem.submenu, itemPath)}
                </div>
              ) : (
                <Link href={subItem.href as string}>{subItem.label}</Link>
              )}
            </li>
          );
        })}
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
              src="/logo.svg"
              alt="logo"
              className={styles.logo}
              width={120}
              height={39}
              priority
            />
          </Link>
        </div>
        <ul className={styles.sidebar__list}>
          {sideBarItems.map((item, idx) => {
            const itemPath = `root-${idx}`;
            const isExpanded = expandedItems[itemPath];
            return (
              <li key={idx}>
                {item.submenu ? (
                  <div className={styles.sidebar__list_item}>
                    <span
                      onClick={() => toggleSubMenu(itemPath)}
                      className={styles.submenu_toggle}
                    >
                      {item.label}
                    </span>
                    {isExpanded && renderSubMenu(item.submenu, itemPath)}
                  </div>
                ) : (
                  <Link href={item.href}>{item.label} </Link>
                )}
              </li>
            );
          })}
        </ul>
      </aside>
    </>
  );
};

export default SideBar;
