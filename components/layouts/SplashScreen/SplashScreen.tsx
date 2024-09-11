import React from 'react';
import { Container, Stack, Title, Text, Button, Image, Box, Group } from '@mantine/core';
import Link from 'next/link';
import Logo from 'components/ui/Logo/Logo'
import { SITE_DESCRIPTION, SITE_NAME } from '@/constants/config';

const SplashScreen = () => {
  return (
    <Container 
      size="md" 
      h="100vh" 
      style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center' 
      }}
    >
      <Stack align="center" gap="xl">
          <Logo />
        <Title order={1} ta="center">
          {SITE_NAME}
        </Title>
        <Text size="lg" ta="center">
          {SITE_DESCRIPTION}
        </Text>
        <Group gap="xl">
          <Button component={Link} href="/auth/login" size="lg" variant="filled">
            Login
          </Button>
          <Button component={Link} href="/auth/register" size="lg" variant="outline">
            Register
          </Button>
        </Group>
      </Stack>
    </Container>
  );
};

export default SplashScreen;