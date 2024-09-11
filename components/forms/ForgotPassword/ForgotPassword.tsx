'use client';

import { useState } from 'react';
import { Anchor, Button, Text, TextInput, Title } from '@mantine/core';
import { useForm, UseFormReturnType } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { SITE_NAME } from '@/constants/config';
import { forgotPassword } from '@/utils/strapi';
import classes from './ForgotPassword.module.css';

interface FormValues {
  email: string;
}

function ForgotPassword() {
  const [isProcessing, setIsProcessing] = useState(false);

  const form: UseFormReturnType<FormValues> = useForm<FormValues>({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
    },
    validate: {
      email: (value) =>
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
          ? null
          : 'Please enter a valid email address',
    },
  });

  // Define the function to handle form submission
  const handleSubmit = async (values: FormValues) => {
    setIsProcessing(true);
    try {
      const { error } = await forgotPassword(values.email);

      if (error) {
        notifications.show({
          title: 'Error',
          message: error,
          color: 'failure',
        });
      } else {
        notifications.show({
          title: 'Success',
          message: 'Password reset email sent successfully',
          color: 'success',
        });
      }
    } catch (error: any) {
      notifications.show({
        title: 'Error',
        message: error?.message || 'An error occurred while resetting your password',
        color: 'failure',
      });
    } finally {
      setIsProcessing(false);
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
      <Button
        type="submit"
        fullWidth
        mt="xl"
        size="md"
        disabled={isProcessing}
        loading={isProcessing}
      >
        Forgot Password
      </Button>
      <Text ta="center" mt="md">
        Think you remember?{' '}
        <Anchor<'a'>
          href="/auth/login"
          fw={700}
          //   onClick={(event) => event.preventDefault()}
        >
          Login
        </Anchor>
      </Text>
    </form>
  );
}

export { ForgotPassword };
