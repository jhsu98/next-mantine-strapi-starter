'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Anchor, Button, PasswordInput, Text, TextInput, Title } from '@mantine/core';
import { useForm, UseFormReturnType } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { SITE_NAME } from '@/constants/config';
import { handleAuthentication } from '@/utils/strapi';
import classes from './Login.module.css';

interface FormValues {
  email: string;
  password: string;
}

function Login() {
  const router = useRouter();
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const form: UseFormReturnType<FormValues> = useForm<FormValues>({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) =>
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
          ? null
          : 'Please enter a valid email address',
      password: (value) => (value.length > 6 ? null : 'Password must be at least 6 characters'),
    },
  });

  // Define the function to handle form submission
  const handleSubmit = async (values: FormValues) => {
    setIsAuthenticating(true);
    try {
      const { error } = await handleAuthentication(values.email, values.password);

      if (error) {
        notifications.show({
          title: 'Error',
          message: error,
          color: 'failure',
        });
      } else {
        notifications.show({
          title: 'Success',
          message: 'You have successfully logged in',
          color: 'success',
        });

        router.push('/dashboard');
      }
    } catch (error: any) {
      notifications.show({
        title: 'Error',
        message: error?.message,
        color: 'failure',
      });
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
        Welcome back to {SITE_NAME}!
      </Title>

      <TextInput
        size="md"
        withAsterisk
        label="Email address"
        placeholder="hello@gmail.com"
        key={form.key('email')}
        {...form.getInputProps('email')}
      />
      <PasswordInput
        withAsterisk
        mt="md"
        size="md"
        label="Password"
        placeholder="Your password"
        key={form.key('password')}
        {...form.getInputProps('password')}
      />
      <Button
        type="submit"
        fullWidth
        mt="xl"
        size="md"
        disabled={isAuthenticating}
        loading={isAuthenticating}
      >
        Login
      </Button>
      <Text ta="center" mt="md">
        Trouble logging in?{' '}
        <Anchor<'a'> href="/auth/forgot-password" fw={700}>
          Forgot Password
        </Anchor>
      </Text>
      <Text ta="center" mt="md">
        Don't have an account?{' '}
        <Anchor<'a'> href="/auth/register" fw={700}>
          Register
        </Anchor>
      </Text>
    </form>
  );
}

export { Login };
