import { SimpleGrid, Card, Text, Title, Group, Button } from '@mantine/core';
import { useState } from 'react';

export default function AdminDashboard() {
  const [metrics] = useState({
    totalPolicies: 156,
    activeClaims: 23,
    totalCustomers: 1204,
    monthlyRevenue: 45678,
    pendingApprovals: 15,
    customerSatisfaction: 4.5
  });

  return (
    <>
      <Title order={2} mb="xl">Admin Dashboard</Title>
      
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} mb="xl">
        <Card withBorder padding="lg">
          <Text size="sm" c="dimmed">Total Policies</Text>
          <Text size="xl" fw={500}>{metrics.totalPolicies}</Text>
          <Text size="xs" c="dimmed">+5% from last month</Text>
        </Card>
        
        <Card withBorder padding="lg">
          <Text size="sm" c="dimmed">Active Claims</Text>
          <Text size="xl" fw={500}>{metrics.activeClaims}</Text>
          <Text size="xs" c="dimmed">8 require immediate attention</Text>
        </Card>
        
        <Card withBorder padding="lg">
          <Text size="sm" c="dimmed">Total Customers</Text>
          <Text size="xl" fw={500}>{metrics.totalCustomers}</Text>
          <Text size="xs" c="dimmed">+12% from last month</Text>
        </Card>
        
        <Card withBorder padding="lg">
          <Text size="sm" c="dimmed">Monthly Revenue</Text>
          <Text size="xl" fw={500}>${metrics.monthlyRevenue}</Text>
          <Text size="xs" c="dimmed">+8% from last month</Text>
        </Card>
        
        <Card withBorder padding="lg">
          <Text size="sm" c="dimmed">Pending Approvals</Text>
          <Text size="xl" fw={500}>{metrics.pendingApprovals}</Text>
          <Text size="xs" c="dimmed">5 high priority</Text>
        </Card>
        
        <Card withBorder padding="lg">
          <Text size="sm" c="dimmed">Customer Satisfaction</Text>
          <Text size="xl" fw={500}>{metrics.customerSatisfaction}/5.0</Text>
          <Text size="xs" c="dimmed">Based on 234 reviews</Text>
        </Card>
      </SimpleGrid>

      <Group justify="space-between" mb="md">
        <Title order={3}>Recent Activity</Title>
        <Button variant="light">View All</Button>
      </Group>

      <SimpleGrid cols={{ base: 1, md: 2 }}>
        <Card withBorder padding="lg">
          <Title order={4} mb="md">Latest Claims</Title>
          {[
            { id: 1, type: 'Auto Accident', customer: 'John Doe', amount: 5000 },
            { id: 2, type: 'Property Damage', customer: 'Jane Smith', amount: 2500 },
            { id: 3, type: 'Medical', customer: 'Bob Johnson', amount: 7500 },
          ].map((claim) => (
            <Group key={claim.id} justify="space-between" mb="sm">
              <div>
                <Text size="sm">{claim.type}</Text>
                <Text size="xs" c="dimmed">{claim.customer}</Text>
              </div>
              <Text size="sm">${claim.amount}</Text>
            </Group>
          ))}
        </Card>

        <Card withBorder padding="lg">
          <Title order={4} mb="md">New Customers</Title>
          {[
            { id: 1, name: 'Alice Brown', date: '2024-03-29' },
            { id: 2, name: 'Charlie Davis', date: '2024-03-28' },
            { id: 3, name: 'Eva Wilson', date: '2024-03-27' },
          ].map((customer) => (
            <Group key={customer.id} justify="space-between" mb="sm">
              <Text size="sm">{customer.name}</Text>
              <Text size="xs" c="dimmed">{customer.date}</Text>
            </Group>
          ))}
        </Card>
      </SimpleGrid>
    </>
  );
}