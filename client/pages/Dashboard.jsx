import { SimpleGrid, Card, Text, Title } from '@mantine/core';

export default function Dashboard() {
  return (
    <>
      <Title order={2} mb="md">Dashboard</Title>
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }}>
        <Card withBorder padding="lg">
          <Text size="sm" c="dimmed">Total Policies</Text>
          <Text size="xl" fw={500}>156</Text>
        </Card>
        <Card withBorder padding="lg">
          <Text size="sm" c="dimmed">Active Claims</Text>
          <Text size="xl" fw={500}>23</Text>
        </Card>
        <Card withBorder padding="lg">
          <Text size="sm" c="dimmed">Total Customers</Text>
          <Text size="xl" fw={500}>1,204</Text>
        </Card>
        <Card withBorder padding="lg">
          <Text size="sm" c="dimmed">Monthly Revenue</Text>
          <Text size="xl" fw={500}>$45,678</Text>
        </Card>
      </SimpleGrid>
    </>
  );
}