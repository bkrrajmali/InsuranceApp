import { Title, Table, Card, Text, Group, Button, SimpleGrid, Badge, TextInput } from '@mantine/core';
import { useState } from 'react';

export default function AdminBilling() {
  const [invoices] = useState([
    { 
      id: 1, 
      number: 'INV-001', 
      customer: 'John Doe',
      policy: 'POL-001',
      amount: 150,
      dueDate: '2024-04-15',
      status: 'Pending'
    },
    { 
      id: 2, 
      number: 'INV-002', 
      customer: 'Jane Smith',
      policy: 'POL-002',
      amount: 200,
      dueDate: '2024-04-20',
      status: 'Paid'
    },
    { 
      id: 3, 
      number: 'INV-003', 
      customer: 'Bob Johnson',
      policy: 'POL-003',
      amount: 300,
      dueDate: '2024-04-25',
      status: 'Overdue'
    }
  ]);

  const [metrics] = useState({
    totalRevenue: 45000,
    pendingPayments: 12500,
    overdueAmount: 3500
  });

  return (
    <>
      <Title order={2} mb="xl">Billing Management</Title>

      <SimpleGrid cols={{ base: 1, md: 3 }} mb="xl">
        <Card withBorder padding="lg">
          <Text size="sm" c="dimmed">Total Revenue</Text>
          <Text size="xl" fw={500}>${metrics.totalRevenue}</Text>
          <Text size="xs" c="dimmed">This month</Text>
        </Card>

        <Card withBorder padding="lg">
          <Text size="sm" c="dimmed">Pending Payments</Text>
          <Text size="xl" fw={500}>${metrics.pendingPayments}</Text>
          <Text size="xs" c="dimmed">15 invoices pending</Text>
        </Card>

        <Card withBorder padding="lg">
          <Text size="sm" c="dimmed">Overdue Amount</Text>
          <Text size="xl" fw={500}>${metrics.overdueAmount}</Text>
          <Text size="xs" c="dimmed">8 invoices overdue</Text>
        </Card>
      </SimpleGrid>

      <Group justify="space-between" mb="md">
        <Title order={3}>Invoices</Title>
        <Button>Generate New Invoice</Button>
      </Group>

      <Group mb="md">
        <TextInput
          placeholder="Search invoices..."
          style={{ flex: 1 }}
        />
        <Button variant="light">Search</Button>
      </Group>

      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Invoice #</Table.Th>
            <Table.Th>Customer</Table.Th>
            <Table.Th>Policy</Table.Th>
            <Table.Th>Amount</Table.Th>
            <Table.Th>Due Date</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {invoices.map((invoice) => (
            <Table.Tr key={invoice.id}>
              <Table.Td>{invoice.number}</Table.Td>
              <Table.Td>{invoice.customer}</Table.Td>
              <Table.Td>{invoice.policy}</Table.Td>
              <Table.Td>${invoice.amount}</Table.Td>
              <Table.Td>{invoice.dueDate}</Table.Td>
              <Table.Td>
                <Badge 
                  color={
                    invoice.status === 'Paid' 
                      ? 'green' 
                      : invoice.status === 'Overdue'
                      ? 'red'
                      : 'yellow'
                  }
                >
                  {invoice.status}
                </Badge>
              </Table.Td>
              <Table.Td>
                <Group gap="xs">
                  <Button variant="light" size="xs">View</Button>
                  <Button variant="light" size="xs">Send Reminder</Button>
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </>
  );
}