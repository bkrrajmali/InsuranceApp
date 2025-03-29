import { Title, Table, Button, Group, TextInput, Badge, Menu, ActionIcon, Modal, Card, Text, Select, NumberInput, Textarea, Timeline } from '@mantine/core';
import { IconDots, IconEdit, IconTrash, IconFileDownload, IconPlus, IconSearch, IconFilter } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';

export default function AdminPolicies() {
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [createModalOpened, setCreateModalOpened] = useState(false);
  const [policies, setPolicies] = useState([
    { 
      id: 1, 
      number: 'POL-001', 
      type: 'Auto Insurance',
      customer: 'John Doe',
      premium: 150,
      startDate: '2024-01-15',
      endDate: '2025-01-14',
      status: 'Active',
      coverage: 100000,
      deductible: 500,
      details: {
        vehicle: '2022 Toyota Camry',
        coverage: ['Collision', 'Comprehensive', 'Liability'],
        documents: [
          { name: 'Policy Document.pdf', size: '1.2 MB' },
          { name: 'Insurance Card.pdf', size: '0.5 MB' }
        ]
      },
      history: [
        { date: '2024-01-15', event: 'Policy Created', details: 'New policy issued' },
        { date: '2024-02-15', event: 'Payment Received', details: 'Monthly premium payment processed' },
        { date: '2024-03-15', event: 'Payment Received', details: 'Monthly premium payment processed' }
      ]
    },
    { 
      id: 2, 
      number: 'POL-002', 
      type: 'Home Insurance',
      customer: 'Jane Smith',
      premium: 200,
      startDate: '2024-02-20',
      endDate: '2025-02-19',
      status: 'Active',
      coverage: 500000,
      deductible: 1000,
      details: {
        property: '123 Main St, Anytown, CA',
        coverage: ['Structure', 'Personal Property', 'Liability'],
        documents: [
          { name: 'Policy Document.pdf', size: '1.5 MB' },
          { name: 'Property Assessment.pdf', size: '2.1 MB' }
        ]
      },
      history: [
        { date: '2024-02-20', event: 'Policy Created', details: 'New policy issued' },
        { date: '2024-03-20', event: 'Payment Received', details: 'Monthly premium payment processed' }
      ]
    }
  ]);

  const form = useForm({
    initialValues: {
      type: '',
      customer: '',
      premium: '',
      startDate: '',
      endDate: '',
      coverage: '',
      deductible: '',
      details: ''
    },
    validate: {
      type: (value) => (!value ? 'Policy type is required' : null),
      customer: (value) => (!value ? 'Customer name is required' : null),
      premium: (value) => (!value || value <= 0 ? 'Valid premium amount is required' : null),
      startDate: (value) => (!value ? 'Start date is required' : null),
      endDate: (value) => (!value ? 'End date is required' : null),
      coverage: (value) => (!value || value <= 0 ? 'Valid coverage amount is required' : null),
      deductible: (value) => (!value || value < 0 ? 'Valid deductible amount is required' : null)
    }
  });

  const handleCreatePolicy = (values) => {
    const newPolicy = {
      id: policies.length + 1,
      number: `POL-00${policies.length + 1}`,
      ...values,
      status: 'Active',
      details: {
        documents: [],
        coverage: []
      },
      history: [
        {
          date: new Date().toISOString().split('T')[0],
          event: 'Policy Created',
          details: 'New policy issued'
        }
      ]
    };

    setPolicies([...policies, newPolicy]);
    setCreateModalOpened(false);
    form.reset();

    notifications.show({
      title: 'Success',
      message: 'Policy created successfully',
      color: 'green'
    });
  };

  const handleStatusChange = (policyId, newStatus) => {
    const updatedPolicies = policies.map(policy => {
      if (policy.id === policyId) {
        return {
          ...policy,
          status: newStatus,
          history: [
            ...policy.history,
            {
              date: new Date().toISOString().split('T')[0],
              event: 'Status Changed',
              details: `Policy status updated to ${newStatus}`
            }
          ]
        };
      }
      return policy;
    });

    setPolicies(updatedPolicies);
    notifications.show({
      title: 'Success',
      message: 'Policy status updated successfully',
      color: 'green'
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      'Active': 'green',
      'Pending': 'yellow',
      'Expired': 'red',
      'Cancelled': 'gray'
    };
    return colors[status] || 'blue';
  };

  return (
    <>
      <Group justify="space-between" mb="xl">
        <Title order={2}>Policy Management</Title>
        <Button leftSection={<IconPlus size={14} />} onClick={() => setCreateModalOpened(true)}>
          Create New Policy
        </Button>
      </Group>

      <Card withBorder mb="lg">
        <Group>
          <TextInput
            placeholder="Search policies..."
            leftSection={<IconSearch size={14} />}
            style={{ flex: 1 }}
          />
          <Button variant="light" leftSection={<IconFilter size={14} />}>
            Filters
          </Button>
        </Group>
      </Card>
      
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Policy Number</Table.Th>
            <Table.Th>Type</Table.Th>
            <Table.Th>Customer</Table.Th>
            <Table.Th>Premium</Table.Th>
            <Table.Th>Period</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {policies.map((policy) => (
            <Table.Tr key={policy.id}>
              <Table.Td>{policy.number}</Table.Td>
              <Table.Td>{policy.type}</Table.Td>
              <Table.Td>{policy.customer}</Table.Td>
              <Table.Td>${policy.premium}</Table.Td>
              <Table.Td>
                <Text size="sm">{policy.startDate}</Text>
                <Text size="sm">to {policy.endDate}</Text>
              </Table.Td>
              <Table.Td>
                <Badge color={getStatusColor(policy.status)}>
                  {policy.status}
                </Badge>
              </Table.Td>
              <Table.Td>
                <Group gap="xs">
                  <Button 
                    variant="light" 
                    size="xs"
                    onClick={() => setSelectedPolicy(policy)}
                  >
                    View
                  </Button>
                  <Menu>
                    <Menu.Target>
                      <ActionIcon variant="subtle">
                        <IconDots size={14} />
                      </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item leftSection={<IconEdit size={14} />}>
                        Edit Policy
                      </Menu.Item>
                      <Menu.Item leftSection={<IconFileDownload size={14} />}>
                        Download PDF
                      </Menu.Item>
                      <Menu.Divider />
                      <Menu.Item 
                        leftSection={<IconTrash size={14} />}
                        color="red"
                        onClick={() => handleStatusChange(policy.id, 'Cancelled')}
                      >
                        Cancel Policy
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      {/* Create Policy Modal */}
      <Modal
        opened={createModalOpened}
        onClose={() => setCreateModalOpened(false)}
        title="Create New Policy"
        size="lg"
      >
        <form onSubmit={form.onSubmit(handleCreatePolicy)}>
          <Select
            label="Policy Type"
            placeholder="Select policy type"
            data={[
              'Auto Insurance',
              'Home Insurance',
              'Life Insurance',
              'Health Insurance',
              'Business Insurance'
            ]}
            required
            {...form.getInputProps('type')}
          />

          <TextInput
            label="Customer Name"
            placeholder="Enter customer name"
            required
            mt="md"
            {...form.getInputProps('customer')}
          />

          <NumberInput
            label="Monthly Premium"
            placeholder="Enter premium amount"
            required
            mt="md"
            min={0}
            prefix="$"
            {...form.getInputProps('premium')}
          />

          <Group grow mt="md">
            <TextInput
              label="Start Date"
              type="date"
              required
              {...form.getInputProps('startDate')}
            />
            <TextInput
              label="End Date"
              type="date"
              required
              {...form.getInputProps('endDate')}
            />
          </Group>

          <NumberInput
            label="Coverage Amount"
            placeholder="Enter coverage amount"
            required
            mt="md"
            min={0}
            prefix="$"
            {...form.getInputProps('coverage')}
          />

          <NumberInput
            label="Deductible"
            placeholder="Enter deductible amount"
            required
            mt="md"
            min={0}
            prefix="$"
            {...form.getInputProps('deductible')}
          />

          <Textarea
            label="Additional Details"
            placeholder="Enter any additional policy details"
            mt="md"
            {...form.getInputProps('details')}
          />

          <Group justify="flex-end" mt="xl">
            <Button variant="light" onClick={() => setCreateModalOpened(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Create Policy
            </Button>
          </Group>
        </form>
      </Modal>

      {/* View Policy Modal */}
      <Modal
        opened={!!selectedPolicy}
        onClose={() => setSelectedPolicy(null)}
        title={`Policy Details: ${selectedPolicy?.number}`}
        size="lg"
      >
        {selectedPolicy && (
          <>
            <Card withBorder mb="md">
              <Group mb="md">
                <Badge color={getStatusColor(selectedPolicy.status)} size="lg">
                  {selectedPolicy.status}
                </Badge>
                <Text>Customer: {selectedPolicy.customer}</Text>
                <Text>Type: {selectedPolicy.type}</Text>
              </Group>

              <Group grow mb="md">
                <div>
                  <Text size="sm" c="dimmed">Premium</Text>
                  <Text>${selectedPolicy.premium}/month</Text>
                </div>
                <div>
                  <Text size="sm" c="dimmed">Coverage</Text>
                  <Text>${selectedPolicy.coverage.toLocaleString()}</Text>
                </div>
                <div>
                  <Text size="sm" c="dimmed">Deductible</Text>
                  <Text>${selectedPolicy.deductible}</Text>
                </div>
              </Group>

              <Text size="sm" c="dimmed" mb="xs">Period</Text>
              <Text mb="md">
                {selectedPolicy.startDate} to {selectedPolicy.endDate}
              </Text>

              {selectedPolicy.details.vehicle && (
                <>
                  <Text size="sm" c="dimmed" mb="xs">Vehicle</Text>
                  <Text mb="md">{selectedPolicy.details.vehicle}</Text>
                </>
              )}

              {selectedPolicy.details.property && (
                <>
                  <Text size="sm" c="dimmed" mb="xs">Property</Text>
                  <Text mb="md">{selectedPolicy.details.property}</Text>
                </>
              )}

              <Text size="sm" c="dimmed" mb="xs">Coverage Details</Text>
              {selectedPolicy.details.coverage.map((item, index) => (
                <Badge key={index} mr="xs" mb="xs">{item}</Badge>
              ))}
            </Card>

            <Title order={4} mb="md">Documents</Title>
            <Group mb="xl">
              {selectedPolicy.details.documents.map((doc, index) => (
                <Button
                  key={index}
                  variant="light"
                  size="xs"
                  leftSection={<IconFileDownload size={14} />}
                >
                  {doc.name} ({doc.size})
                </Button>
              ))}
            </Group>

            <Title order={4} mb="md">Policy History</Title>
            <Timeline active={selectedPolicy.history.length - 1} bulletSize={24}>
              {selectedPolicy.history.map((event, index) => (
                <Timeline.Item
                  key={index}
                  title={event.event}
                >
                  <Text size="sm">{event.date}</Text>
                  <Text size="sm" c="dimmed">{event.details}</Text>
                </Timeline.Item>
              ))}
            </Timeline>
          </>
        )}
      </Modal>
    </>
  );
}