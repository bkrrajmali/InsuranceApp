import { Title, Table, Button, Group } from '@mantine/core';
import { useState } from 'react';

export default function Claims() {
  const [claims] = useState([
    { id: 1, number: 'CLM-001', type: 'Auto Accident', customer: 'John Doe', status: 'Pending' },
    { id: 2, number: 'CLM-002', type: 'Property Damage', customer: 'Jane Smith', status: 'Approved' },
    { id: 3, number: 'CLM-003', type: 'Medical', customer: 'Bob Johnson', status: 'In Review' },
  ]);

  return (
    <>
      <Group justify="space-between" mb="md">
        <Title order={2}>Claims</Title>
        <Button>New Claim</Button>
      </Group>
      
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Claim Number</Table.Th>
            <Table.Th>Type</Table.Th>
            <Table.Th>Customer</Table.Th>
            <Table.Th>Status</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {claims.map((claim) => (
            <Table.Tr key={claim.id}>
              <Table.Td>{claim.number}</Table.Td>
              <Table.Td>{claim.type}</Table.Td>
              <Table.Td>{claim.customer}</Table.Td>
              <Table.Td>{claim.status}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </>
  );
}