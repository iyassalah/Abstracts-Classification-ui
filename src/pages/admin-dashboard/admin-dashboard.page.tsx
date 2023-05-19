import './admin-dashboard.scss';

import { Tabs, TabsProps } from 'antd';
import { useContext } from 'react';

import { Navigate } from 'react-router-dom';
import ClassManagement from '../../components/class-management/class-management';
import { AuthContext } from '../../state/auth/provider';
import { AuthStatus } from '../../state/auth/state';
import CreateAdmin from './create-admin.component';


function AdminDashboard() {
  const { state } = useContext(AuthContext);
  if (state.status === AuthStatus.LOGGED_OUT)
    return <Navigate to='/' />;

  const tabs: TabsProps['items'] = [
    {
      key: 'statistics',
      children: <h1>Statistics</h1>,
      label: 'Statistics'
    },
    {
      key: 'class-management',
      children: <ClassManagement token={state.token} />,
      label: 'Class Management'
    },
    {
      key: 'create-admin-user',
      children: <CreateAdmin token={state.token} />,
      label: 'Create Admin User',
    }
  ]

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard-body">
        <h2>Admin Dashboard</h2>
      </div>
      <hr />
      <div className="admin-dashboard-header">
        <Tabs items={tabs} defaultActiveKey="statistics" tabPosition="left" />
      </div>
    </div>
  );

}

export default AdminDashboard;

