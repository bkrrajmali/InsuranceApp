import { Title, Table, Button, Group } from '@mantine/core';
import { useState } from 'react';

export default function Policies() {
  const [policies] = useState([
    { id: 1, number: 'POL-001', type: 'Auto Insurance', customer: 'John Doe', status: 'Active' },
    { id: 2, number: 'POL-002', type: 'Home Insurance', customer: 'Jane Smith', status: 'Active' },
    { id: 3, number: 'POL-003', type: 'Life Insurance', customer: 'Bob Johnson', status: 'Pending' },
  ]);

  return (
    <>
      <Group justify="space-between" mb="md">
        <Title order={2}>Policies</Title>
        <Button>New Policy</Button>
      </Group>
      
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Policy Number</Table.Th>
            <Table.Th>Type</Table.Th>
            <Table.Th>Customer</Table.Th>
            <Table.Th>Status</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {policies.map((policy) => (
            <Table.Tr key={policy.id}>
              <Table.Td>{policy.number}</Table.Td>
              <Table.Td>{policy.type}</Table.Td>
              <Table.Td>{policy.customer}</Table.Td>
              <Table.Td>{policy.status}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </>
  );
}