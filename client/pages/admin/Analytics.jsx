import { Title, SimpleGrid, Card, Text, Group, Button, Select, RingProgress, Stack, Table, Badge } from '@mantine/core';
import { IconArrowUpRight, IconArrowDownRight, IconDownload } from '@tabler/icons-react';
import { useState } from 'react';

export default function AdminAnalytics() {
  const [timeframe, setTimeframe] = useState('30d');
  const [metrics] = useState([
    { 
      title: 'Claims Ratio',
      value: '15%',
      change: '+2.3%',
      description: 'Claims to policies ratio',
      trend: 'up',
      details: {
        total: 156,
        approved: 89,
        pending: 45,
        rejected: 22
      }
    },
    {
      title: 'Average Claim Value',
      value: '$2,500',
      change: '-5.2%',
      description: 'Average claim amount',
      trend: 'down',
      details: {
        auto: '$3,200',
        property: '$2,800',
        medical: '$1,500'
      }
    },
    {
      title: 'Customer Satisfaction',
      value: '4.5/5',
      change: '+0.3',
      description: 'Based on recent surveys',
      trend: 'up',
      details: {
        responses: 234,
        positive: 180,
        neutral: 42,
        negative: 12
      }
    },
    {
      title: 'Policy Renewal Rate',
      value: '85%',
      change: '+1.2%',
      description: 'Policy renewal percentage',
      trend: 'up',
      details: {
        total: 450,
        renewed: 382,
        pending: 48,
        cancelled: 20
      }
    },
    {
      title: 'Processing Time',
      value: '3.2 days',
      change: '-0.5 days',
      description: 'Average claim processing time',
      trend: 'down',
      details: {
        auto: '2.8 days',
        property: '3.5 days',
        medical: '3.3 days'
      }
    },
    {
      title: 'Revenue Growth',
      value: '+12%',
      change: '+3.4%',
      description: 'Year over year growth',
      trend: 'up',
      details: {
        newPolicies: '$125,000',
        renewals: '$450,000',
        claims: '-$89,000'
      }
    }
  ]);

  const [topPerformers] = useState([
    { type: 'Auto Insurance', revenue: 250000, growth: 15, policies: 450 },
    { type: 'Home Insurance', revenue: 180000, growth: 12, policies: 320 },
    { type: 'Life Insurance', revenue: 150000, growth: 8, policies: 280 },
    { type: 'Health Insurance', revenue: 120000, growth: 10, policies: 210 }
  ]);

  const [recentClaims] = useState([
    { id: 'CLM-001', type: 'Auto', amount: 5000, status: 'Pending', date: '2024-03-29' },
    { id: 'CLM-002', type: 'Property', amount: 2500, status: 'Approved', date: '2024-03-28' },
    { id: 'CLM-003', type: 'Medical', amount: 7500, status: 'In Review', date: '2024-03-27' }
  ]);

  return (
    <>
      <Group justify="space-between" mb="xl">
        <Title order={2}>Analytics Dashboard</Title>
        <Group>
          <Select
            value={timeframe}
            onChange={setTimeframe}
            data={[
              { value: '7d', label: 'Last 7 Days' },
              { value: '30d', label: 'Last 30 Days' },
              { value: '90d', label: 'Last 90 Days' },
              { value: '1y', label: 'Last Year' },
            ]}
            style={{ width: 200 }}
          />
          <Button variant="light" leftSection={<IconDownload size={14} />}>
            Export Report
          </Button>
        </Group>
      </Group>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} mb="xl">
        {metrics.map((metric, index) => (
          <Card key={index} withBorder padding="lg">
            <Group justify="space-between" mb="xs">
              <Text size="sm" c="dimmed">{metric.title}</Text>
              <Group gap="xs">
                {metric.trend === 'up' ? (
                  <IconArrowUpRight size={16} color="green" />
                ) : (
                  <IconArrowDownRight size={16} color="red" />
                )}
                <Text 
                  size="xs" 
                  c={metric.change.startsWith('+') ? 'green' : 'red'}
                >
                  {metric.change}
                </Text>
              </Group>
            </Group>
            <Text size="xl" fw={500}>{metric.value}</Text>
            <Text size="xs" c="dimmed" mt="md">{metric.description}</Text>
            
            <Stack mt="md" gap="xs">
              {Object.entries(metric.details).map(([key, value], i) => (
                <Group key={i} justify="space-between">
                  <Text size="xs" c="dimmed" style={{ textTransform: 'capitalize' }}>
                    {key}
                  </Text>
                  <Text size="xs">{value}</Text>
                </Group>
              ))}
            </Stack>
          </Card>
        ))}
      </SimpleGrid>

      <SimpleGrid cols={{ base: 1, md: 2 }} mb="xl">
        <Card withBorder padding="lg">
          <Title order={4} mb="md">Top Performing Products</Title>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Type</Table.Th>
                <Table.Th>Revenue</Table.Th>
                <Table.Th>Growth</Table.Th>
                <Table.Th>Policies</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {topPerformers.map((product, index) => (
                <Table.Tr key={index}>
                  <Table.Td>{product.type}</Table.Td>
                  <Table.Td>${product.revenue.toLocaleString()}</Table.Td>
                  <Table.Td>
                    <Text c="green">+{product.growth}%</Text>
                  </Table.Td>
                  <Table.Td>{product.policies}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Card>

        <Card withBorder padding="lg">
          <Title order={4} mb="md">Recent Claims</Title>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Claim ID</Table.Th>
                <Table.Th>Type</Table.Th>
                <Table.Th>Amount</Table.Th>
                <Table.Th>Status</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {recentClaims.map((claim, index) => (
                <Table.Tr key={index}>
                  <Table.Td>{claim.id}</Table.Td>
                  <Table.Td>{claim.type}</Table.Td>
                  <Table.Td>${claim.amount.toLocaleString()}</Table.Td>
                  <Table.Td>
                    <Badge 
                      color={
                        claim.status === 'Approved' 
                          ? 'green' 
                          : claim.status === 'Pending'
                          ? 'yellow'
                          : 'blue'
                      }
                    >
                      {claim.status}
                    </Badge>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Card>
      </SimpleGrid>

      <Group justify="space-between" mt="xl" mb="md">
        <Title order={3}>Reports</Title>
        <Button variant="light">Generate New Report</Button>
      </Group>

      <SimpleGrid cols={{ base: 1, md: 2 }}>
        <Card withBorder padding="lg">
          <Title order={4} mb="md">Popular Reports</Title>
          {[
            { name: 'Monthly Claims Summary', downloads: 45 },
            { name: 'Customer Satisfaction Trends', downloads: 38 },
            { name: 'Policy Performance Analysis', downloads: 32 },
            { name: 'Revenue Breakdown', downloads: 28 }
          ].map((report, index) => (
            <Group key={index} justify="space-between" mb="sm">
              <div>
                <Text size="sm">{report.name}</Text>
                <Text size="xs" c="dimmed">{report.downloads} downloads this month</Text>
              </div>
              <Button variant="subtle" size="xs" leftSection={<IconDownload size={14} />}>
                Download
              </Button>
            </Group>
          ))}
        </Card>

        <Card withBorder padding="lg">
          <Title order={4} mb="md">Scheduled Reports</Title>
          {[
            { name: 'Weekly Claims Report', next: 'Monday', recipients: 5 },
            { name: 'Monthly Revenue Report', next: 'April 1', recipients: 8 },
            { name: 'Quarterly Performance', next: 'April 15', recipients: 12 }
          ].map((report, index) => (
            <Group key={index} justify="space-between" mb="sm">
              <div>
                <Text size="sm">{report.name}</Text>
                <Text size="xs" c="dimmed">
                  Next: {report.next} • {report.recipients} recipients
                </Text>
              </div>
              <Button variant="subtle" size="xs">Edit</Button>
            </Group>
          ))}
        </Card>
      </SimpleGrid>
    </>
  );
}