import { SimpleGrid, Card, Text, Title, Group, Button, Timeline, Progress, Badge, ActionIcon, Menu } from '@mantine/core';
import { IconArrowUpRight, IconArrowDownRight, IconDotsVertical, IconFileDownload, IconBell } from '@tabler/icons-react';
import { useState } from 'react';

export default function CustomerDashboard() {
  const [policies] = useState([
    { 
      type: 'Auto Insurance',
      number: 'POL-001',
      premium: 150,
      nextPayment: '2024-04-15',
      vehicle: '2022 Toyota Camry',
      coverage: ['Collision', 'Comprehensive', 'Liability'],
      status: 'Active',
      documents: [
        { name: 'Policy Document.pdf', size: '1.2 MB' },
        { name: 'Insurance Card.pdf', size: '0.5 MB' }
      ]
    },
    { 
      type: 'Home Insurance',
      number: 'POL-002',
      premium: 200,
      nextPayment: '2024-04-20',
      property: '123 Main St, Anytown, CA',
      coverage: ['Structure', 'Personal Property', 'Liability'],
      status: 'Active',
      documents: [
        { name: 'Policy Document.pdf', size: '1.5 MB' },
        { name: 'Property Assessment.pdf', size: '2.1 MB' }
      ]
    }
  ]);

  const [recentActivity] = useState([
    { date: '2024-03-29', event: 'Claim Submitted', details: 'Auto accident claim (CLM-001)' },
    { date: '2024-03-20', event: 'Payment Processed', details: 'Monthly premium for POL-001' },
    { date: '2024-03-15', event: 'Document Updated', details: 'New insurance card issued' },
    { date: '2024-03-10', event: 'Payment Processed', details: 'Monthly premium for POL-002' }
  ]);

  const [notifications] = useState([
    { id: 1, type: 'Payment Due', message: 'Premium payment due in 3 days', date: '2024-04-15' },
    { id: 2, type: 'Claim Update', message: 'Additional information requested for claim CLM-001', date: '2024-03-30' },
    { id: 3, type: 'Policy Renewal', message: 'Auto insurance policy renewal coming up', date: '2024-05-15' }
  ]);

  return (
    <>
      <Group justify="space-between" mb="xl">
        <Title order={2}>My Dashboard</Title>
        <Group>
          <Menu>
            <Menu.Target>
              <ActionIcon variant="light" size="lg">
                <IconBell size={20} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Recent Notifications</Menu.Label>
              {notifications.map((notification) => (
                <Menu.Item key={notification.id}>
                  <Text size="sm" fw={500}>{notification.type}</Text>
                  <Text size="xs" c="dimmed">{notification.message}</Text>
                  <Text size="xs" c="dimmed">{notification.date}</Text>
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Group>
      
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} mb="xl">
        <Card withBorder padding="lg">
          <Group justify="space-between" mb="xs">
            <Text size="sm" c="dimmed">Active Policies</Text>
            <Badge color="green">2 Active</Badge>
          </Group>
          <Text size="xl" fw={500}>2</Text>
          <Progress value={100} mt="md" size="sm" color="green" />
        </Card>

        <Card withBorder padding="lg">
          <Group justify="space-between" mb="xs">
            <Text size="sm" c="dimmed">Open Claims</Text>
            <Badge color="yellow">1 Pending</Badge>
          </Group>
          <Text size="xl" fw={500}>1</Text>
          <Text size="xs" c="dimmed" mt="md">Last claim: March 29, 2024</Text>
        </Card>

        <Card withBorder padding="lg">
          <Group justify="space-between" mb="xs">
            <Text size="sm" c="dimmed">Next Payment</Text>
            <IconArrowUpRight size={16} color="red" />
          </Group>
          <Text size="xl" fw={500}>$150</Text>
          <Text size="xs" c="dimmed" mt="md">Due: April 15, 2024</Text>
        </Card>

        <Card withBorder padding="lg">
          <Group justify="space-between" mb="xs">
            <Text size="sm" c="dimmed">Total Coverage</Text>
            <IconArrowDownRight size={16} color="green" />
          </Group>
          <Text size="xl" fw={500}>$500,000</Text>
          <Text size="xs" c="dimmed" mt="md">Across all policies</Text>
        </Card>
      </SimpleGrid>

      <Title order={3} mb="md">My Policies</Title>
      <SimpleGrid cols={{ base: 1, md: 2 }} mb="xl">
        {policies.map((policy, index) => (
          <Card key={index} withBorder padding="lg">
            <Group justify="space-between" mb="xs">
              <Text fw={500}>{policy.type}</Text>
              <Badge color="green">{policy.status}</Badge>
            </Group>
            
            <Text size="sm" c="dimmed" mb="md">
              Policy #{policy.number}
            </Text>

            <Text size="sm" mb="xs">
              {policy.vehicle || policy.property}
            </Text>

            <Text size="sm" mb="md">Coverage Types:</Text>
            <Group mb="md">
              {policy.coverage.map((item, i) => (
                <Badge key={i} variant="light">{item}</Badge>
              ))}
            </Group>

            <Group justify="space-between" mb="md">
              <div>
                <Text size="sm" c="dimmed">Monthly Premium</Text>
                <Text size="sm" fw={500}>${policy.premium}</Text>
              </div>
              <div>
                <Text size="sm" c="dimmed">Next Payment</Text>
                <Text size="sm">{policy.nextPayment}</Text>
              </div>
            </Group>

            <Group justify="space-between">
              <Group>
                {policy.documents.map((doc, i) => (
                  <Button
                    key={i}
                    variant="light"
                    size="xs"
                    leftSection={<IconFileDownload size={14} />}
                  >
                    {doc.name}
                  </Button>
                ))}
              </Group>
              <Menu position="bottom-end">
                <Menu.Target>
                  <ActionIcon variant="subtle">
                    <IconDotsVertical size={14} />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item>View Details</Menu.Item>
                  <Menu.Item>File Claim</Menu.Item>
                  <Menu.Item>Make Payment</Menu.Item>
                  <Menu.Item>Contact Support</Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          </Card>
        ))}
      </SimpleGrid>

      <Group justify="space-between" mb="md">
        <Title order={3}>Recent Activity</Title>
        <Button variant="light">View All</Button>
      </Group>

      <Card withBorder padding="lg">
        <Timeline active={recentActivity.length - 1} bulletSize={24} lineWidth={2}>
          {recentActivity.map((activity, index) => (
            <Timeline.Item key={index} title={activity.event}>
              <Text size="sm">{activity.date}</Text>
              <Text size="sm" c="dimmed">{activity.details}</Text>
            </Timeline.Item>
          ))}
        </Timeline>
      </Card>
    </>
  );
}