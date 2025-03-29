import { TextInput, PasswordInput, Button, Paper, Title, Text, Stack, Alert } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { Link, useNavigate } from 'react-router-dom';
import { IconInfoCircle } from '@tabler/icons-react';
import useAuthStore from '../../store/authStore';

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length < 6 ? 'Password must be at least 6 characters' : null),
    },
  });

  const handleSubmit = async (values) => {
    try {
      // TODO: Replace with actual API call
      const response = {
        data: {
          user: {
            id: 1,
            email: values.email,
            name: 'John Doe',
            role: values.email.includes('admin') ? 'admin' : 'customer',
          },
          token: 'dummy-token',
        },
      };

      login(response.data.user);
      localStorage.setItem('token', response.data.token);
      
      notifications.show({
        title: 'Success',
        message: 'Logged in successfully',
        color: 'green',
      });

      navigate(response.data.user.role === 'admin' ? '/admin' : '/dashboard');
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: error.message || 'Failed to login',
        color: 'red',
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Paper radius="md" p="xl" withBorder className="w-full max-w-md">
        <Title order={2} mb="md" ta="center">
          Welcome to Insurance Portal
        </Title>

        <Alert icon={<IconInfoCircle />} title="Test Credentials" color="blue" mb="lg">
          <Text size="sm">
            Customer Login: customer@example.com<br />
            Admin Login: admin@example.com<br />
            Password: password123
          </Text>
        </Alert>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              required
              label="Email"
              placeholder="your@email.com"
              {...form.getInputProps('email')}
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              {...form.getInputProps('password')}
            />

            <Button type="submit" fullWidth mt="xl">
              Sign in
            </Button>
          </Stack>
        </form>

        <Text ta="center" mt="md">
          Don&apos;t have an account?{' '}
          <Link to="/register" style={{ textDecoration: 'none' }}>
            Register
          </Link>
        </Text>
      </Paper>
    </div>
  );
}