import { Title, Table, Button, Group } from '@mantine/core';
import { useState } from 'react';

export default function Billing() {
  const [invoices] = useState([
    { id: 1, number: 'INV-001', customer: 'John Doe', amount: 500, status: 'Paid' },
    { id: 2, number: 'INV-002', customer: 'Jane Smith', amount: 750, status: 'Pending' },
    { id: 3, number: 'INV-003', customer: 'Bob Johnson', amount: 1000, status: 'Overdue' },
  ]);

  return (
    <>
      <Group justify="space-between" mb="md">
        <Title order={2}>Billing</Title>
        <Button>New Invoice</Button>
      </Group>
      
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Invoice Number</Table.Th>
            <Table.Th>Customer</Table.Th>
            <Table.Th>Amount</Table.Th>
            <Table.Th>Status</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {invoices.map((invoice) => (
            <Table.Tr key={invoice.id}>
              <Table.Td>{invoice.number}</Table.Td>
              <Table.Td>{invoice.customer}</Table.Td>
              <Table.Td>${invoice.amount}</Table.Td>
              <Table.Td>{invoice.status}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </>
  );
}