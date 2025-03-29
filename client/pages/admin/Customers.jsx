import { Title, Table, Button, Group, TextInput, ActionIcon, Menu, Badge } from '@mantine/core';
import { IconDots, IconEdit, IconTrash, IconMail, IconPhone } from '@tabler/icons-react';
import { useState } from 'react';

export default function AdminCustomers() {
  const [customers] = useState([
    { 
      id: 1, 
      name: 'John Doe', 
      email: 'john@example.com', 
      phone: '555-0123', 
      policies: 2,
      status: 'Active',
      joinDate: '2024-01-15'
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      email: 'jane@example.com', 
      phone: '555-0124', 
      policies: 1,
      status: 'Active',
      joinDate: '2024-02-20'
    },
    { 
      id: 3, 
      name: 'Bob Johnson', 
      email: 'bob@example.com', 
      phone: '555-0125', 
      policies: 3,
      status: 'Inactive',
      joinDate: '2024-03-10'
    },
  ]);

  return (
    <>
      <Group justify="space-between" mb="xl">
        <Title order={2}>Customer Management</Title>
        <Button>Add New Customer</Button>
      </Group>

      <Group mb="md">
        <TextInput
          placeholder="Search customers..."
          style={{ flex: 1 }}
        />
        <Button variant="light">Search</Button>
      </Group>
      
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Contact</Table.Th>
            <Table.Th>Policies</Table.Th>
            <Table.Th>Join Date</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {customers.map((customer) => (
            <Table.Tr key={customer.id}>
              <Table.Td>{customer.name}</Table.Td>
              <Table.Td>
                <Group gap="xs">
                  <ActionIcon variant="subtle" color="blue">
                    <IconMail size="1.2rem" />
                  </ActionIcon>
                  <ActionIcon variant="subtle" color="blue">
                    <IconPhone size="1.2rem" />
                  </ActionIcon>
                </Group>
              </Table.Td>
              <Table.Td>{customer.policies}</Table.Td>
              <Table.Td>{customer.joinDate}</Table.Td>
              <Table.Td>
                <Badge color={customer.status === 'Active' ? 'green' : 'red'}>
                  {customer.status}
                </Badge>
              </Table.Td>
              <Table.Td>
                <Menu>
                  <Menu.Target>
                    <ActionIcon variant="subtle">
                      <IconDots size="1.2rem" />
                    </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item leftSection={<IconEdit size="1.2rem" />}>
                      Edit Details
                    </Menu.Item>
                    <Menu.Item leftSection={<IconMail size="1.2rem" />}>
                      Send Email
                    </Menu.Item>
                    <Menu.Item 
                      leftSection={<IconTrash size="1.2rem" />}
                      color="red"
                    >
                      Delete
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </>
  );
}