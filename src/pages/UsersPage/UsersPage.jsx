import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Typography, notification } from 'antd';
import { WarningOutlined } from '@ant-design/icons';
import axios from '../../axios/index';

import PageTemplate from '../../components/PageTemplate/PageTemplate';
import UsersTable from './UsersTable';

const UsersPage = ({ history, location }) => {
  const searchParams = new URLSearchParams(location.search);

  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pages, setPages] = useState(0);
  const [total, setTotal] = useState(0);

  if (pages && (currentPage > pages || currentPage < 1)) {
    notification.open({
      message: 'Warning!',
      description: 'The page number was entered incorrectly. Please change it.',
      icon: <WarningOutlined style={{ color: '#ffd800' }} />,
    });
  }

  const fetchUsers = async () => {
    setIsLoading(true);
    const response = await axios.get(`/users?page=${currentPage}`);
    setUsers(response.data.data);
    setTotal(response.data.meta.pagination.total);
    setPages(response.data.meta.pagination.pages);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  return (
    <PageTemplate>
      <Typography.Title>Users</Typography.Title>

      <UsersTable
        users={users}
        total={total}
        isLoading={isLoading}
        currentPage={currentPage}
      />
    </PageTemplate>
  );
};

export default withRouter(UsersPage);
