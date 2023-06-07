import React from 'react';
import axios from '../../axios/index';
import { Button, Form, Input, notification, Select, Typography } from 'antd';
import PageTemplate from '../../components/PageTemplate/PageTemplate';
import { useHistory } from 'react-router-dom';
import { WarningOutlined } from '@ant-design/icons';

const CreateUserPage = () => {
  const [form] = Form.useForm();
  const history = useHistory();

  const onFinish = async (newUser) => {
    try {
      await axios.post('/users/', newUser);
      history.push('/users');
      openNotification();
    } catch (error) {
      openNotification(error);
    }
  };

  const openNotification = (errText) => {
    notification.open({
      message: errText ? `Error` : 'Success',
      description: errText
        ? `Request status: failed. ${errText}`
        : 'User created successfully',
      icon: (
        <WarningOutlined
          style={{
            color: errText ? 'red' : 'green',
          }}
        />
      ),
    });
  };

  return (
    <PageTemplate>
      <Typography.Title>Create User Page</Typography.Title>

      <Form
        form={form}
        name="create_user"
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="Enter name" />
        </Form.Item>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input placeholder="Enter email" />
        </Form.Item>
        <Form.Item
          name="gender"
          label="Gender"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select placeholder="Select gender">
            <Select.Option value="male">Male</Select.Option>
            <Select.Option value="female">Female</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="status"
          label="Status"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select placeholder="Select status">
            <Select.Option value="active">Active</Select.Option>
            <Select.Option value="inactive">Inactive</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create user
          </Button>
        </Form.Item>
      </Form>
    </PageTemplate>
  );
};

export default CreateUserPage;
