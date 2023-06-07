import { Button, Table, Typography } from 'antd';
import axios from '../../axios/index';
import React, { useEffect, useState } from 'react';
import PageTemplate from '../../components/PageTemplate/PageTemplate';
import { withRouter } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';

const TodosPage = ({ history, location }) => {
  const searchParams = new URLSearchParams(location.search);

  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const [todos, setTodos] = useState([]);
  const [pagination, setPagination] = useState(0);
  const [isloading, setIsLoading] = useState(false);
  const [checkedTodosKeys, setCheckedTodosKeys] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, [currentPage]);

  const fetchTodos = async () => {
    setIsLoading(true);
    const response = await axios.get(`/todos?page=${currentPage}`);
    setTodos(response.data.data);
    setCheckedTodosKeys(
      response.data.data
        .filter((todo) => todo.status === 'completed')
        .map((todo) => todo.id)
    );
    setPagination(response.data.meta.pagination);
    setIsLoading(false);
  };

  const columns = [
    {
      title: 'Task',
      dataIndex: 'title',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Deadline',
      dataIndex: 'due_on',
      render: (value) => getCustomDate(value),
    },
    {
      title: 'User ID',
      dataIndex: 'user_id',
    },
  ];

  const getCustomDate = (date) => {
    const currentDate = new Date(date); // Date 2011-05-09T06:08:45.178Z
    const year = currentDate.getFullYear();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    const day = ('0' + currentDate.getDate()).slice(-2);
    const hours = ('0' + currentDate.getHours()).slice(-2);
    const min = ('0' + currentDate.getMinutes()).slice(-2);

    const today = `${year}-${month}-${day} ${hours}:${min}`;
    return today;
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
    },
    getCheckboxProps: (record) => ({
      disabled: record.status === 'completed',
    }),
    hideSelectAll: true,
    selectedRowKeys: checkedTodosKeys,
    onSelect: (record, selected, selectedRows, nativeEvent) => {
      setCheckedTodosKeys(selectedRows.map((todo) => todo.id));
    },
  };

  const patchTodos = async (e) => {
    e.preventDefault();
    const promises = checkedTodosKeys.map((id) => {
      return axios.patch('/todos/' + id, { status: 'completed' });
    });

    await Promise.all(promises);
    fetchTodos();
  };

  return (
    <PageTemplate>
      <Typography.Title>Todos Page</Typography.Title>

      <Button
        disabled={
          todos.filter((todo) => todo.status === 'completed').length >=
          checkedTodosKeys.length
        }
        onClick={(e) => patchTodos(e)}
      >
        Complete
      </Button>

      <Table
        rowSelection={{
          ...rowSelection,
        }}
        columns={columns}
        dataSource={todos.map((todo) => ({ ...todo, key: todo.id }))}
        loading={isloading}
        pagination={{
          total: pagination.total,
          current: currentPage,
          pageSize: 10,
          position: ['bottomCenter'],
          showSizeChanger: false,
          showTitle: false,
        }}
        onChange={(newPagination) => {
          history.push({
            pathname: location.pathname,
            search: `page=${newPagination.current}`,
          });
        }}
      />
    </PageTemplate>
  );
};

export default withRouter(TodosPage);
