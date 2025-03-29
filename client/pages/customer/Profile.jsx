import { TextInput, Button, Paper, Title, Grid, Avatar, Text, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';

export default function CustomerProfile() {
  const [profile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '555-0123',
    address: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    zipCode: '12345',
  });

  const form = useForm({
    initialValues: profile,
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      phone: (value) => (/^\d{3}-\d{4}$/.test(value) ? null : 'Invalid phone format (e.g., 555-0123)'),
      zipCode: (value) => (/^\d{5}$/.test(value) ? null : 'Invalid ZIP code'),
    },
  });

  const handleSubmit = (values) => {
    notifications.show({
      title: 'Success',
      message: 'Profile updated successfully',
      color: 'green',
    });
  };

  return (
    <>
      <Title order={2} mb="xl">My Profile</Title>

      <Grid>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Paper withBorder p="xl" radius="md">
            <Group justify="center" mb="md">
              <Avatar size={120} radius={120} color="blue">JD</Avatar>
            </Group>
            <Text ta="center" fz="lg" fw={500}>{profile.firstName} {profile.lastName}</Text>
            <Text ta="center" c="dimmed">{profile.email}</Text>
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 8 }}>
          <Paper withBorder p="xl" radius="md">
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Grid>
                <Grid.Col span={6}>
                  <TextInput
                    label="First Name"
                    {...form.getInputProps('firstName')}
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <TextInput
                    label="Last Name"
                    {...form.getInputProps('lastName')}
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <TextInput
                    label="Email"
                    {...form.getInputProps('email')}
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <TextInput
                    label="Phone"
                    {...form.getInputProps('phone')}
                  />
                </Grid.Col>
                <Grid.Col span={12}>
                  <TextInput
                    label="Address"
                    {...form.getInputProps('address')}
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <TextInput
                    label="City"
                    {...form.getInputProps('city')}
                  />
                </Grid.Col>
                <Grid.Col span={3}>
                  <TextInput
                    label="State"
                    {...form.getInputProps('state')}
                  />
                </Grid.Col>
                <Grid.Col span={3}>
                  <TextInput
                    label="ZIP Code"
                    {...form.getInputProps('zipCode')}
                  />
                </Grid.Col>
              </Grid>

              <Group justify="flex-end" mt="xl">
                <Button type="submit">Save Changes</Button>
              </Group>
            </form>
          </Paper>
        </Grid.Col>
      </Grid>
    </>
  );
}