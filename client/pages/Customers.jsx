import { Title, Table, Button, Group } from '@mantine/core';
import { useState } from 'react';

export default function Customers() {
  const [customers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '555-0123', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '555-0124', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '555-0125', status: 'Inactive' },
  ]);

  return (
    <>
      <Group justify="space-between" mb="md">
        <Title order={2}>Customers</Title>
        <Button>New Customer</Button>
      </Group>
      
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Phone</Table.Th>
            <Table.Th>Status</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {customers.map((customer) => (
            <Table.Tr key={customer.id}>
              <Table.Td>{customer.name}</Table.Td>
              <Table.Td>{customer.email}</Table.Td>
              <Table.Td>{customer.phone}</Table.Td>
              <Table.Td>{customer.status}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </>
  );
}