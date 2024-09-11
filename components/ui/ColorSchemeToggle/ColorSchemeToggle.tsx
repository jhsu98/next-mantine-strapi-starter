'use client';

import { Button, Group, useMantineColorScheme, Grid, Paper, Title } from '@mantine/core';

export function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme();

  return (
    <Paper radius="md" p="md" shadow="md" withBorder>
      <Title c="primary" order={4} mx="auto">
        Color Theme
      </Title>
      <Group justify="center" mx="auto" px="md" pt="md" pb="sm">
        <Button onClick={() => setColorScheme('light')}>
          Light
        </Button>
        <Button onClick={() => setColorScheme('dark')}>
          Dark
        </Button>
        <Button onClick={() => setColorScheme('auto')}>
          Auto
        </Button>
      </Group>
    </Paper>
  );
}
