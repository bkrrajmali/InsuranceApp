import { Title, Card, Text, Group, Button, SimpleGrid, Badge } from '@mantine/core';
import { useState } from 'react';

export default function CustomerPolicies() {
  const [policies] = useState([
    {
      id: 1,
      type: 'Auto Insurance',
      number: 'POL-001',
      premium: 150,
      nextPayment: '2024-04-15',
      coverage: 100000,
      status: 'Active',
      vehicle: '2022 Toyota Camry'
    },
    {
      id: 2,
      type: 'Home Insurance',
      number: 'POL-002',
      premium: 200,
      nextPayment: '2024-04-20',
      coverage: 400000,
      status: 'Active',
      property: '123 Main St, Anytown, CA'
    }
  ]);

  return (
    <>
      <Group justify="space-between" mb="xl">
        <Title order={2}>My Policies</Title>
        <Button>Get New Policy Quote</Button>
      </Group>

      <SimpleGrid cols={{ base: 1, md: 2 }}>
        {policies.map((policy) => (
          <Card key={policy.id} withBorder padding="lg">
            <Group justify="space-between" mb="xs">
              <Text fw={500}>{policy.type}</Text>
              <Badge color={policy.status === 'Active' ? 'green' : 'red'}>
                {policy.status}
              </Badge>
            </Group>
            
            <Text size="sm" c="dimmed" mb="md">Policy #{policy.number}</Text>
            
            <Text size="sm" mb="xs">
              {policy.vehicle || policy.property}
            </Text>
            
            <Text size="sm" mb="md">
              Coverage: ${policy.coverage.toLocaleString()}
            </Text>
            
            <Group justify="space-between" mb="md">
              <Text size="sm">Monthly Premium:</Text>
              <Text size="sm" fw={500}>${policy.premium}</Text>
            </Group>
            
            <Group justify="space-between" mb="xl">
              <Text size="sm">Next Payment:</Text>
              <Text size="sm">{policy.nextPayment}</Text>
            </Group>

            <Group>
              <Button variant="light" size="sm">View Details</Button>
              <Button variant="light" size="sm">File Claim</Button>
              <Button variant="light" size="sm">Make Payment</Button>
            </Group>
          </Card>
        ))}
      </SimpleGrid>
    </>
  );
}