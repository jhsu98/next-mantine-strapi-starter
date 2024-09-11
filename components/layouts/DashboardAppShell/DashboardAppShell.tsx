'use client';

import { DashboardNavbar } from 'components/layouts/DashboardNavbar/DashboardNavbar';
import { AppShell, Burger, Title, useMantineTheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Logo from '@/components/ui/Logo/Logo';
import { SITE_NAME } from '@/constants/config';

interface DashboardAppShellProps {
  children: React.ReactNode;
}

export function DashboardAppShell({ children }: DashboardAppShellProps) {
  const [opened, { toggle }] = useDisclosure(false);
  const theme = useMantineTheme();

  return (
    <AppShell
      header={{ height: 80 }}
      navbar={{
        width: 250,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header
        style={{
          display: 'flex',
        }}
      >
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="md"
          my="auto"
          ml="md"
          mr="lg"
        />
        <Logo />
        <Title my="auto" order={2}>
          {SITE_NAME}
        </Title>
      </AppShell.Header>

      <AppShell.Navbar>
        <DashboardNavbar />
      </AppShell.Navbar>

      <AppShell.Main mb="xl">{children}</AppShell.Main>
      <AppShell.Footer
        p="sm"
        style={{
          display: 'flex',
          justifyContent: 'center',
          fontSize: theme.fontSizes.sm,
        }}
      >
        Copyright &copy; {new Date().getFullYear()} {SITE_NAME}
      </AppShell.Footer>
    </AppShell>
  );
}
