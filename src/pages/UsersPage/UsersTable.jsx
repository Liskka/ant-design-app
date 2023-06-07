import React from 'react';
import { withRouter } from 'react-router-dom';
import { Table } from 'antd';


const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    width: '25%',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    filters: [
      {
        text: 'Male',
        value: 'male',
      },
      {
        text: 'Female',
        value: 'female',
      },
    ],
    onFilter: (value, record) => value === record.gender,
    width: '15%',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    width: '45%',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    filters: [
      {
        text: 'Active',
        value: 'active',
      },
      {
        text: 'Inactive',
        value: 'inactive',
      },
    ],
    onFilter: (value, record) => value === record.status,
    width: '15%',
  },
];

const UsersTable = ({
  users,
  total,
  isLoading,
  currentPage,
  history,
  location,
}) => {
  return (
    <Table
      columns={columns}
      dataSource={users.map((user) => ({ ...user, key: user.id }))}
      loading={isLoading}
      pagination={{
        total: total,
        current: currentPage,
        pageSize: 10,
        position: ['bottomCenter', 'topCenter'],
        showSizeChanger: false,
        showTitle: false,
      }}
      scroll={{ x: true }}
      onChange={(newPagination) => {
        history.push({
          pathname: location.pathname,
          search: `page=${newPagination.current}`,
        });
      }}
      onRow={(record) => {
        return {
          onClick: () => {
            history.push({
              pathname: location.pathname + `/${record.id}`,
            });
          },
        };
      }}
    />
  );
};

export default withRouter(UsersTable);
