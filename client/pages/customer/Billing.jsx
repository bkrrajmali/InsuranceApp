import { Title, Table, Card, Text, Group, Button, SimpleGrid, Badge, ActionIcon, Modal, NumberInput, Select, TextInput } from '@mantine/core';
import { IconCreditCard, IconBuildingBank, IconReceipt, IconDownload, IconChevronRight } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';

export default function CustomerBilling() {
  const [makePaymentOpened, setMakePaymentOpened] = useState(false);
  const [addPaymentMethodOpened, setAddPaymentMethodOpened] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const [invoices] = useState([
    { 
      id: 1, 
      number: 'INV-001', 
      amount: 150, 
      dueDate: '2024-04-15',
      status: 'Pending',
      policy: 'Auto Insurance (POL-001)',
      billingPeriod: 'April 2024',
      lateFee: 0,
      paymentHistory: []
    },
    { 
      id: 2, 
      number: 'INV-002', 
      amount: 200, 
      dueDate: '2024-04-20',
      status: 'Paid',
      policy: 'Home Insurance (POL-002)',
      billingPeriod: 'April 2024',
      lateFee: 0,
      paymentHistory: [
        { date: '2024-03-15', amount: 200, method: 'Credit Card ending in 4242' }
      ]
    }
  ]);

  const [paymentMethods] = useState([
    { id: 1, type: 'Credit Card', last4: '4242', expiry: '12/25', isDefault: true },
    { id: 2, type: 'Bank Account', last4: '9876', isDefault: false }
  ]);

  const [upcomingPayments] = useState([
    { dueDate: '2024-04-15', amount: 150, policy: 'Auto Insurance' },
    { dueDate: '2024-04-20', amount: 200, policy: 'Home Insurance' },
    { dueDate: '2024-05-15', amount: 150, policy: 'Auto Insurance' }
  ]);

  const paymentForm = useForm({
    initialValues: {
      amount: 0,
      paymentMethod: '',
    },
    validate: {
      amount: (value) => (!value || value <= 0 ? 'Amount must be greater than 0' : null),
      paymentMethod: (value) => (!value ? 'Payment method is required' : null),
    },
  });

  const paymentMethodForm = useForm({
    initialValues: {
      type: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      name: '',
    },
    validate: {
      type: (value) => (!value ? 'Payment type is required' : null),
      cardNumber: (value) => (!value ? 'Card number is required' : null),
      expiryDate: (value) => (!value ? 'Expiry date is required' : null),
      cvv: (value) => (!value ? 'CVV is required' : null),
      name: (value) => (!value ? 'Name is required' : null),
    },
  });

  const handlePayment = (values) => {
    notifications.show({
      title: 'Success',
      message: 'Payment processed successfully',
      color: 'green',
    });
    setMakePaymentOpened(false);
    paymentForm.reset();
  };

  const handleAddPaymentMethod = (values) => {
    notifications.show({
      title: 'Success',
      message: 'Payment method added successfully',
      color: 'green',
    });
    setAddPaymentMethodOpened(false);
    paymentMethodForm.reset();
  };

  const getStatusColor = (status) => {
    return status === 'Paid' ? 'green' : status === 'Pending' ? 'yellow' : 'red';
  };

  return (
    <>
      <Title order={2} mb="xl">Billing & Payments</Title>

      <SimpleGrid cols={{ base: 1, md: 3 }} mb="xl">
        <Card withBorder padding="lg">
          <Group mb="xs">
            <IconCreditCard size={20} />
            <Text fw={500}>Payment Methods</Text>
          </Group>
          <Text size="sm" c="dimmed" mb="md">Manage your payment options</Text>
          <Button 
            variant="light" 
            fullWidth
            onClick={() => setAddPaymentMethodOpened(true)}
          >
            Add Payment Method
          </Button>
        </Card>

        <Card withBorder padding="lg">
          <Group mb="xs">
            <IconBuildingBank size={20} />
            <Text fw={500}>Next Payment</Text>
          </Group>
          <Text size="xl" fw={500} mb="xs">${upcomingPayments[0].amount}</Text>
          <Text size="sm" c="dimmed">Due on {upcomingPayments[0].dueDate}</Text>
          <Button 
            fullWidth 
            mt="md"
            onClick={() => {
              setSelectedInvoice(invoices[0]);
              setMakePaymentOpened(true);
            }}
          >
            Make Payment
          </Button>
        </Card>

        <Card withBorder padding="lg">
          <Group mb="xs">
            <IconReceipt size={20} />
            <Text fw={500}>Payment History</Text>
          </Group>
          <Text size="sm" c="dimmed" mb="md">View and download statements</Text>
          <Button variant="light" fullWidth rightSection={<IconChevronRight size={14} />}>
            View All Transactions
          </Button>
        </Card>
      </SimpleGrid>

      <Card withBorder mb="xl">
        <Title order={4} mb="md">Payment Methods</Title>
        {paymentMethods.map((method) => (
          <Group key={method.id} justify="space-between" mb="sm">
            <Group>
              {method.type === 'Credit Card' ? (
                <IconCreditCard size={20} />
              ) : (
                <IconBuildingBank size={20} />
              )}
              <div>
                <Text size="sm">
                  {method.type} ending in {method.last4}
                  {method.expiry && ` (Expires ${method.expiry})`}
                </Text>
                {method.isDefault && (
                  <Badge size="sm" variant="light">Default</Badge>
                )}
              </div>
            </Group>
            <Button variant="subtle" size="xs" color="red">Remove</Button>
          </Group>
        ))}
      </Card>

      <Title order={3} mb="md">Upcoming Payments</Title>
      <Card withBorder mb="xl">
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Due Date</Table.Th>
              <Table.Th>Policy</Table.Th>
              <Table.Th>Amount</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {upcomingPayments.map((payment, index) => (
              <Table.Tr key={index}>
                <Table.Td>{payment.dueDate}</Table.Td>
                <Table.Td>{payment.policy}</Table.Td>
                <Table.Td>${payment.amount}</Table.Td>
                <Table.Td>
                  <Button 
                    variant="light" 
                    size="xs"
                    onClick={() => {
                      setSelectedInvoice({ amount: payment.amount });
                      setMakePaymentOpened(true);
                    }}
                  >
                    Pay Now
                  </Button>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Card>

      <Title order={3} mb="md">Payment History</Title>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Invoice #</Table.Th>
            <Table.Th>Policy</Table.Th>
            <Table.Th>Billing Period</Table.Th>
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
              <Table.Td>{invoice.policy}</Table.Td>
              <Table.Td>{invoice.billingPeriod}</Table.Td>
              <Table.Td>${invoice.amount}</Table.Td>
              <Table.Td>{invoice.dueDate}</Table.Td>
              <Table.Td>
                <Badge color={getStatusColor(invoice.status)}>
                  {invoice.status}
                </Badge>
              </Table.Td>
              <Table.Td>
                <Group gap="xs">
                  <ActionIcon 
                    variant="light" 
                    color="blue"
                    onClick={() => {}}
                  >
                    <IconDownload size={16} />
                  </ActionIcon>
                  {invoice.status === 'Pending' && (
                    <Button 
                      variant="light" 
                      size="xs"
                      onClick={() => {
                        setSelectedInvoice(invoice);
                        setMakePaymentOpened(true);
                      }}
                    >
                      Pay Now
                    </Button>
                  )}
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      {/* Make Payment Modal */}
      <Modal
        opened={makePaymentOpened}
        onClose={() => setMakePaymentOpened(false)}
        title="Make Payment"
        size="md"
      >
        <form onSubmit={paymentForm.onSubmit(handlePayment)}>
          <NumberInput
            label="Payment Amount"
            placeholder="Enter amount"
            required
            min={0}
            prefix="$"
            value={selectedInvoice?.amount}
            {...paymentForm.getInputProps('amount')}
          />

          <Select
            label="Payment Method"
            placeholder="Select payment method"
            data={paymentMethods.map(method => ({
              value: method.id.toString(),
              label: `${method.type} ending in ${method.last4}`
            }))}
            required
            mt="md"
            {...paymentForm.getInputProps('paymentMethod')}
          />

          <Group justify="flex-end" mt="xl">
            <Button variant="light" onClick={() => setMakePaymentOpened(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Process Payment
            </Button>
          </Group>
        </form>
      </Modal>

      {/* Add Payment Method Modal */}
      <Modal
        opened={addPaymentMethodOpened}
        onClose={() => setAddPaymentMethodOpened(false)}
        title="Add Payment Method"
        size="md"
      >
        <form onSubmit={paymentMethodForm.onSubmit(handleAddPaymentMethod)}>
          <Select
            label="Payment Type"
            placeholder="Select payment type"
            data={[
              { value: 'credit', label: 'Credit Card' },
              { value: 'debit', label: 'Debit Card' },
              { value: 'bank', label: 'Bank Account' }
            ]}
            required
            {...paymentMethodForm.getInputProps('type')}
          />

          <TextInput
            label="Card Number"
            placeholder="Enter card number"
            required
            mt="md"
            {...paymentMethodForm.getInputProps('cardNumber')}
          />

          <Group grow mt="md">
            <TextInput
              label="Expiry Date"
              placeholder="MM/YY"
              required
              {...paymentMethodForm.getInputProps('expiryDate')}
            />
            <TextInput
              label="CVV"
              placeholder="123"
              required
              {...paymentMethodForm.getInputProps('cvv')}
            />
          </Group>

          <TextInput
            label="Name on Card"
            placeholder="Enter name as shown on card"
            required
            mt="md"
            {...paymentMethodForm.getInputProps('name')}
          />

          <Group justify="flex-end" mt="xl">
            <Button variant="light" onClick={() => setAddPaymentMethodOpened(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Add Payment Method
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  );
}