import { AppShell, Burger, Group, NavLink, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconHome, IconFileDescription, IconClipboardList, IconUsers, IconReceipt2, IconChartBar, IconLogin } from '@tabler/icons-react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import useAuthStore from './store/authStore';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminPolicies from './pages/admin/Policies';
import AdminClaims from './pages/admin/Claims';
import AdminCustomers from './pages/admin/Customers';
import AdminBilling from './pages/admin/Billing';
import AdminAnalytics from './pages/admin/Analytics';

// Customer Pages
import CustomerDashboard from './pages/customer/Dashboard';
import CustomerPolicies from './pages/customer/Policies';
import CustomerClaims from './pages/customer/Claims';
import CustomerProfile from './pages/customer/Profile';
import CustomerBilling from './pages/customer/Billing';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

function PrivateRoute({ children, roles }) {
  const { isAuthenticated, role } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (roles && !roles.includes(role)) {
    return <Navigate to="/" />;
  }
  
  return children;
}

export default function App() {
  const [opened, { toggle }] = useDisclosure();
  const location = useLocation();
  const { isAuthenticated, role, logout } = useAuthStore();

  const adminNavigation = [
    { icon: IconHome, label: 'Dashboard', to: '/admin' },
    { icon: IconFileDescription, label: 'Policies', to: '/admin/policies' },
    { icon: IconClipboardList, label: 'Claims', to: '/admin/claims' },
    { icon: IconUsers, label: 'Customers', to: '/admin/customers' },
    { icon: IconReceipt2, label: 'Billing', to: '/admin/billing' },
    { icon: IconChartBar, label: 'Analytics', to: '/admin/analytics' },
  ];

  const customerNavigation = [
    { icon: IconHome, label: 'Dashboard', to: '/dashboard' },
    { icon: IconFileDescription, label: 'My Policies', to: '/policies' },
    { icon: IconClipboardList, label: 'My Claims', to: '/claims' },
    { icon: IconUsers, label: 'My Profile', to: '/profile' },
    { icon: IconReceipt2, label: 'Billing', to: '/billing' },
  ];

  const navigation = role === 'admin' ? adminNavigation : customerNavigation;

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Group>Insurance Management System</Group>
          </Group>
          {isAuthenticated ? (
            <Button onClick={logout}>Logout</Button>
          ) : (
            <Button component={Link} to="/login" leftSection={<IconLogin size={14} />}>
              Login
            </Button>
          )}
        </Group>
      </AppShell.Header>

      {isAuthenticated && (
        <AppShell.Navbar p="md">
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              component={Link}
              to={item.to}
              label={item.label}
              leftSection={<item.icon size="1.2rem" stroke={1.5} />}
              active={location.pathname === item.to}
            />
          ))}
        </AppShell.Navbar>
      )}

      <AppShell.Main>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <PrivateRoute roles={['admin']}>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/policies"
            element={
              <PrivateRoute roles={['admin']}>
                <AdminPolicies />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/claims"
            element={
              <PrivateRoute roles={['admin']}>
                <AdminClaims />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/customers"
            element={
              <PrivateRoute roles={['admin']}>
                <AdminCustomers />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/billing"
            element={
              <PrivateRoute roles={['admin']}>
                <AdminBilling />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/analytics"
            element={
              <PrivateRoute roles={['admin']}>
                <AdminAnalytics />
              </PrivateRoute>
            }
          />

          {/* Customer Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute roles={['customer']}>
                <CustomerDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/policies"
            element={
              <PrivateRoute roles={['customer']}>
                <CustomerPolicies />
              </PrivateRoute>
            }
          />
          <Route
            path="/claims"
            element={
              <PrivateRoute roles={['customer']}>
                <CustomerClaims />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute roles={['customer']}>
                <CustomerProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/billing"
            element={
              <PrivateRoute roles={['customer']}>
                <CustomerBilling />
              </PrivateRoute>
            }
          />

          {/* Default redirect */}
          <Route
            path="/"
            element={
              <Navigate
                to={
                  !isAuthenticated
                    ? '/login'
                    : role === 'admin'
                    ? '/admin'
                    : '/dashboard'
                }
              />
            }
          />
        </Routes>
      </AppShell.Main>
    </AppShell>
  );
}