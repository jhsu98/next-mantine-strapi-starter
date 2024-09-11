'use client';

import { ColorSchemeToggle } from '@/components/ui/ColorSchemeToggle/ColorSchemeToggle';
import { Grid, Title, Container, Skeleton, Paper, PasswordInput, Stack, Button, Group } from '@mantine/core';
import ChangePasswordForm  from '@/components/forms/ChangePassword/ChangePassword';

export default function ProfilePage() {
  return (
    <Container fluid pl="md" mb="md">
      <Title order={2} mb="lg" c="primary">
        Profile Page
      </Title>

      <Grid gutter="md">
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <ChangePasswordForm />
        </Grid.Col>
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <Stack gap="md">
            <ColorSchemeToggle />
          </Stack>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
