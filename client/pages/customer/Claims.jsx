import { Title, Table, Button, Group, Modal, TextInput, Textarea, Select, Badge, Card, Text, Timeline } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconCircleCheck, IconClockHour4, IconX } from '@tabler/icons-react';
import { useState } from 'react';

export default function CustomerClaims() {
  const [opened, setOpened] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [claims, setClaims] = useState([
    { 
      id: 1, 
      number: 'CLM-001', 
      type: 'Auto Accident', 
      status: 'Pending', 
      amount: 5000,
      submittedDate: '2024-03-25',
      description: 'Front-end collision at intersection',
      timeline: [
        { date: '2024-03-25', status: 'Submitted', details: 'Claim submitted successfully' },
        { date: '2024-03-26', status: 'Under Review', details: 'Initial documentation review' },
        { date: '2024-03-27', status: 'Additional Info Requested', details: 'Please provide repair shop estimate' }
      ]
    },
    { 
      id: 2, 
      number: 'CLM-002', 
      type: 'Property Damage', 
      status: 'Approved', 
      amount: 2500,
      submittedDate: '2024-03-20',
      description: 'Storm damage to roof',
      timeline: [
        { date: '2024-03-20', status: 'Submitted', details: 'Claim submitted successfully' },
        { date: '2024-03-21', status: 'Under Review', details: 'Documentation review' },
        { date: '2024-03-23', status: 'Approved', details: 'Claim approved for full amount' }
      ]
    }
  ]);

  const form = useForm({
    initialValues: {
      type: '',
      description: '',
      amount: '',
      policyNumber: '',
      incidentDate: '',
      location: ''
    },
    validate: {
      type: (value) => (!value ? 'Claim type is required' : null),
      description: (value) => (!value ? 'Description is required' : null),
      amount: (value) => (!value || isNaN(value) ? 'Valid amount is required' : null),
      policyNumber: (value) => (!value ? 'Policy number is required' : null),
      incidentDate: (value) => (!value ? 'Incident date is required' : null),
      location: (value) => (!value ? 'Location is required' : null)
    },
  });

  const handleSubmit = (values) => {
    const newClaim = {
      id: claims.length + 1,
      number: `CLM-00${claims.length + 1}`,
      type: values.type,
      status: 'Pending',
      amount: parseFloat(values.amount),
      submittedDate: new Date().toISOString().split('T')[0],
      description: values.description,
      timeline: [
        {
          date: new Date().toISOString().split('T')[0],
          status: 'Submitted',
          details: 'Claim submitted successfully'
        }
      ]
    };

    setClaims([...claims, newClaim]);
    setOpened(false);
    form.reset();

    notifications.show({
      title: 'Success',
      message: 'Claim submitted successfully',
      color: 'green',
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      'Pending': 'yellow',
      'Under Review': 'blue',
      'Approved': 'green',
      'Rejected': 'red',
      'Additional Info Requested': 'orange'
    };
    return colors[status] || 'gray';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Approved':
        return <IconCircleCheck size={20} />;
      case 'Rejected':
        return <IconX size={20} />;
      default:
        return <IconClockHour4 size={20} />;
    }
  };

  return (
    <>
      <Group justify="space-between" mb="md">
        <Title order={2}>My Claims</Title>
        <Button onClick={() => setOpened(true)}>File New Claim</Button>
      </Group>
      
      <Table mb="xl">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Claim Number</Table.Th>
            <Table.Th>Type</Table.Th>
            <Table.Th>Amount</Table.Th>
            <Table.Th>Submitted Date</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {claims.map((claim) => (
            <Table.Tr key={claim.id}>
              <Table.Td>{claim.number}</Table.Td>
              <Table.Td>{claim.type}</Table.Td>
              <Table.Td>${claim.amount.toLocaleString()}</Table.Td>
              <Table.Td>{claim.submittedDate}</Table.Td>
              <Table.Td>
                <Badge color={getStatusColor(claim.status)}>
                  {claim.status}
                </Badge>
              </Table.Td>
              <Table.Td>
                <Button 
                  variant="light" 
                  size="xs"
                  onClick={() => setSelectedClaim(claim)}
                >
                  View Details
                </Button>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      {/* New Claim Modal */}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="File New Claim"
        size="lg"
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Select
            label="Claim Type"
            placeholder="Select claim type"
            data={[
              'Auto Accident',
              'Property Damage',
              'Medical',
              'Liability',
              'Natural Disaster',
            ]}
            required
            {...form.getInputProps('type')}
          />

          <TextInput
            label="Policy Number"
            placeholder="Enter your policy number"
            required
            mt="md"
            {...form.getInputProps('policyNumber')}
          />

          <TextInput
            label="Incident Date"
            type="date"
            required
            mt="md"
            {...form.getInputProps('incidentDate')}
          />

          <TextInput
            label="Incident Location"
            placeholder="Enter incident location"
            required
            mt="md"
            {...form.getInputProps('location')}
          />

          <TextInput
            label="Claim Amount"
            placeholder="Enter claim amount"
            required
            mt="md"
            type="number"
            {...form.getInputProps('amount')}
          />

          <Textarea
            label="Description"
            placeholder="Describe what happened"
            required
            mt="md"
            minRows={4}
            {...form.getInputProps('description')}
          />

          <Group justify="flex-end" mt="xl">
            <Button variant="light" onClick={() => setOpened(false)}>Cancel</Button>
            <Button type="submit">Submit Claim</Button>
          </Group>
        </form>
      </Modal>

      {/* Claim Details Modal */}
      <Modal
        opened={!!selectedClaim}
        onClose={() => setSelectedClaim(null)}
        title={`Claim Details: ${selectedClaim?.number}`}
        size="lg"
      >
        {selectedClaim && (
          <>
            <Card withBorder mb="md">
              <Group mb="md">
                <Badge color={getStatusColor(selectedClaim.status)} size="lg">
                  {selectedClaim.status}
                </Badge>
                <Text>Amount: ${selectedClaim.amount.toLocaleString()}</Text>
              </Group>
              
              <Text size="sm" c="dimmed" mb="xs">Description</Text>
              <Text mb="md">{selectedClaim.description}</Text>
              
              <Text size="sm" c="dimmed" mb="xs">Submitted Date</Text>
              <Text>{selectedClaim.submittedDate}</Text>
            </Card>

            <Title order={4} mb="md">Claim Timeline</Title>
            <Timeline active={selectedClaim.timeline.length - 1} bulletSize={24}>
              {selectedClaim.timeline.map((event, index) => (
                <Timeline.Item
                  key={index}
                  bullet={getStatusIcon(event.status)}
                  title={event.status}
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