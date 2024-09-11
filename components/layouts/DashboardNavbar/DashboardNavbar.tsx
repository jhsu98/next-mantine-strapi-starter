import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { IconLogout, IconUserCircle } from '@tabler/icons-react';
import { Code, Group, useMantineTheme } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { DASHBOARD_NAV_ITEMS } from '@/constants/config';
import { logout } from '@/utils/strapi';
import classes from './DashboardNavbar.module.css';

export function DashboardNavbar() {
  const theme = useMantineTheme();
  const router = useRouter();
  const pathname = usePathname();
  const [active, setActive] = useState('');

  useEffect(() => {
    setActive(pathname.split('/dashboard/')[1] || 'home');
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await logout();

      notifications.show({
        title: 'Success',
        message: 'You have successfully logged out',
        color: 'success',
      });

      router.push('/auth/login');
    } catch (error: any) {
      notifications.show({
        title: 'Error',
        message: error?.message,
        color: 'failure',
      });
    }
  };

  const links = DASHBOARD_NAV_ITEMS.map((item) => (
    <a
      className={classes.link}
      data-active={item.key === active || undefined}
      href={item.link}
      key={item.key}
      onClick={(event) => {
        event.preventDefault();
        router.push(item.link);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>{links}</div>

      <div className={classes.footer}>
        <a
          href="/dashboard/profile"
          className={classes.link}
          data-active={active === 'profile' || undefined}
          key="profile"
          onClick={(event) => {
            event.preventDefault();
            router.push('/dashboard/profile');
          }}
        >
          <IconUserCircle className={classes.linkIcon} stroke={1.5} />
          <span>Profile</span>
        </a>

        <a href="#" className={classes.link} onClick={handleLogout}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}
