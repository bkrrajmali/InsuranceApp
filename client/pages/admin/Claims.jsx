import { Title, Table, Badge, Group, Button, Modal, Select, NumberInput, Textarea, Card, Text, Timeline, FileInput, ActionIcon, Tooltip } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconCircleCheck, IconClockHour4, IconX, IconDownload, IconMessageCircle, IconFileDescription } from '@tabler/icons-react';
import { useState } from 'react';

export default function AdminClaims() {
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [noteModalOpened, setNoteModalOpened] = useState(false);
  const [claims, setClaims] = useState([
    { 
      id: 1, 
      number: 'CLM-001', 
      type: 'Auto Accident', 
      customer: 'John Doe',
      amount: 5000,
      status: 'Pending',
      submittedDate: '2024-03-29',
      description: 'Front-end collision at intersection',
      documents: [
        { name: 'Police Report.pdf', size: '2.4 MB' },
        { name: 'Damage Photos.zip', size: '5.1 MB' }
      ],
      notes: [
        { date: '2024-03-29', author: 'System', text: 'Claim submitted by customer' },
        { date: '2024-03-30', author: 'Sarah (Agent)', text: 'Initial review completed. Requesting additional photos.' }
      ],
      timeline: [
        { date: '2024-03-29', status: 'Submitted', details: 'Claim submitted by customer' },
        { date: '2024-03-30', status: 'In Review', details: 'Assigned to claims adjuster' }
      ]
    },
    { 
      id: 2, 
      number: 'CLM-002', 
      type: 'Property Damage', 
      customer: 'Jane Smith',
      amount: 2500,
      status: 'In Review',
      submittedDate: '2024-03-28',
      description: 'Storm damage to roof and gutters',
      documents: [
        { name: 'Contractor Estimate.pdf', size: '1.8 MB' },
        { name: 'Property Photos.zip', size: '4.2 MB' }
      ],
      notes: [
        { date: '2024-03-28', author: 'System', text: 'Claim submitted by customer' }
      ],
      timeline: [
        { date: '2024-03-28', status: 'Submitted', details: 'Claim submitted by customer' },
        { date: '2024-03-29', status: 'In Review', details: 'Reviewing contractor estimates' }
      ]
    }
  ]);

  const form = useForm({
    initialValues: {
      status: '',
      approvedAmount: 0,
      notes: '',
      documents: null
    },
    validate: {
      status: (value) => (!value ? 'Status is required' : null),
      approvedAmount: (value) => (value < 0 ? 'Amount must be positive' : null),
    },
  });

  const noteForm = useForm({
    initialValues: {
      text: ''
    },
    validate: {
      text: (value) => (!value ? 'Note text is required' : null)
    }
  });

  const handleStatusUpdate = (values) => {
    const updatedClaims = claims.map(claim =>
      claim.id === selectedClaim.id
        ? {
            ...claim,
            status: values.status,
            timeline: [
              ...claim.timeline,
              {
                date: new Date().toISOString().split('T')[0],
                status: values.status,
                details: values.notes || `Status updated to ${values.status}`
              }
            ]
          }
        : claim
    );
    
    setClaims(updatedClaims);
    setSelectedClaim(null);
    form.reset();

    notifications.show({
      title: 'Success',
      message: 'Claim status updated successfully',
      color: 'green',
    });
  };

  const handleAddNote = (values) => {
    const updatedClaims = claims.map(claim =>
      claim.id === selectedClaim.id
        ? {
            ...claim,
            notes: [
              ...claim.notes,
              {
                date: new Date().toISOString().split('T')[0],
                author: 'Admin',
                text: values.text
              }
            ]
          }
        : claim
    );

    setClaims(updatedClaims);
    setNoteModalOpened(false);
    noteForm.reset();

    notifications.show({
      title: 'Success',
      message: 'Note added successfully',
      color: 'green',
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      'Pending': 'yellow',
      'In Review': 'blue',
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
      <Title order={2} mb="xl">Claims Management</Title>
      
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Claim Number</Table.Th>
            <Table.Th>Customer</Table.Th>
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
              <Table.Td>{claim.customer}</Table.Td>
              <Table.Td>{claim.type}</Table.Td>
              <Table.Td>${claim.amount.toLocaleString()}</Table.Td>
              <Table.Td>{claim.submittedDate}</Table.Td>
              <Table.Td>
                <Badge color={getStatusColor(claim.status)}>
                  {claim.status}
                </Badge>
              </Table.Td>
              <Table.Td>
                <Group gap="xs">
                  <Button 
                    size="xs"
                    onClick={() => {
                      setSelectedClaim(claim);
                      form.setValues({
                        status: claim.status,
                        approvedAmount: claim.amount,
                        notes: '',
                      });
                    }}
                  >
                    Process
                  </Button>
                  <Tooltip label="View Documents">
                    <ActionIcon variant="light" color="blue">
                      <IconFileDescription size={16} />
                    </ActionIcon>
                  </Tooltip>
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      {/* Process Claim Modal */}
      <Modal
        opened={!!selectedClaim}
        onClose={() => setSelectedClaim(null)}
        title={`Process Claim: ${selectedClaim?.number}`}
        size="xl"
      >
        {selectedClaim && (
          <>
            <Card withBorder mb="md">
              <Group mb="md">
                <Badge color={getStatusColor(selectedClaim.status)} size="lg">
                  {selectedClaim.status}
                </Badge>
                <Text>Customer: {selectedClaim.customer}</Text>
                <Text>Amount: ${selectedClaim.amount.toLocaleString()}</Text>
              </Group>
              
              <Text size="sm" c="dimmed" mb="xs">Description</Text>
              <Text mb="md">{selectedClaim.description}</Text>

              <Text size="sm" c="dimmed" mb="xs">Documents</Text>
              <Group mb="md">
                {selectedClaim.documents.map((doc, index) => (
                  <Button
                    key={index}
                    variant="light"
                    size="xs"
                    leftSection={<IconDownload size={16} />}
                  >
                    {doc.name} ({doc.size})
                  </Button>
                ))}
              </Group>
            </Card>

            <Group mb="md" justify="space-between">
              <Title order={4}>Claim Timeline</Title>
              <Button
                variant="light"
                size="sm"
                leftSection={<IconMessageCircle size={16} />}
                onClick={() => setNoteModalOpened(true)}
              >
                Add Note
              </Button>
            </Group>

            <Timeline active={selectedClaim.timeline.length - 1} bulletSize={24} mb="xl">
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

            <form onSubmit={form.onSubmit(handleStatusUpdate)}>
              <Select
                label="Update Status"
                placeholder="Select new status"
                data={['Pending', 'In Review', 'Additional Info Requested', 'Approved', 'Rejected']}
                required
                {...form.getInputProps('status')}
              />

              <NumberInput
                label="Approved Amount"
                placeholder="Enter approved amount"
                required
                mt="md"
                min={0}
                {...form.getInputProps('approvedAmount')}
              />

              <FileInput
                label="Upload Documents"
                placeholder="Upload supporting documents"
                accept="image/*, .pdf, .doc, .docx"
                mt="md"
                {...form.getInputProps('documents')}
              />

              <Textarea
                label="Processing Notes"
                placeholder="Enter any notes about this claim"
                mt="md"
                minRows={4}
                {...form.getInputProps('notes')}
              />

              <Group justify="flex-end" mt="xl">
                <Button variant="light" onClick={() => setSelectedClaim(null)}>
                  Cancel
                </Button>
                <Button type="submit" color="blue">
                  Update Status
                </Button>
              </Group>
            </form>
          </>
        )}
      </Modal>

      {/* Add Note Modal */}
      <Modal
        opened={noteModalOpened}
        onClose={() => setNoteModalOpened(false)}
        title="Add Note"
        size="md"
      >
        <form onSubmit={noteForm.onSubmit(handleAddNote)}>
          <Textarea
            label="Note"
            placeholder="Enter your note"
            required
            minRows={4}
            {...noteForm.getInputProps('text')}
          />

          <Group justify="flex-end" mt="xl">
            <Button variant="light" onClick={() => setNoteModalOpened(false)}>
              Cancel
            </Button>
            <Button type="submit" color="blue">
              Add Note
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  );
}