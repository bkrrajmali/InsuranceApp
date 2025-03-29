import { Title, SimpleGrid, Card, Text } from '@mantine/core';
import { useState } from 'react';

export default function Analytics() {
  const [metrics] = useState([
    { title: 'Claims Ratio', value: '15%', description: 'Claims to policies ratio' },
    { title: 'Average Claim Value', value: '$2,500', description: 'Average claim amount' },
    { title: 'Customer Satisfaction', value: '4.5/5', description: 'Based on recent surveys' },
    { title: 'Policy Renewal Rate', value: '85%', description: 'Policy renewal percentage' },
    { title: 'Processing Time', value: '3.2 days', description: 'Average claim processing time' },
    { title: 'Revenue Growth', value: '+12%', description: 'Year over year growth' },
  ]);

  return (
    <>
      <Title order={2} mb="md">Analytics</Title>
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }}>
        {metrics.map((metric, index) => (
          <Card key={index} withBorder padding="lg">
            <Text size="sm" c="dimmed">{metric.title}</Text>
            <Text size="xl" fw={500}>{metric.value}</Text>
            <Text size="xs" c="dimmed">{metric.description}</Text>
          </Card>
        ))}
      </SimpleGrid>
    </>
  );
}