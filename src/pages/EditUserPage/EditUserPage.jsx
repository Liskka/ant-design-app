import { Button, Form, Input, Select, Typography, notification } from 'antd';
import axios from '../../axios/index';
import React, { useEffect, useState } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import PageTemplate from '../../components/PageTemplate/PageTemplate';
import { WarningOutlined } from '@ant-design/icons';
import Loader from '../../components/Loader/Loader';

const EditUserPage = ({ history }) => {

  const [user, setUser] = useState(null);
  const params = useParams();
  const userId = params.id;
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    setIsLoading(true);
    const userInfo = await axios.get(`/users/${userId}`);
    setUser(userInfo.data.data);
    setIsLoading(false);
  };

  const onFinish = async (values) => {
    try {
      await axios.put(`/users/${userId}`, {
        ...values,
        id: userId,
      });
      openNotification();
      history.goBack();
    } catch (err) {
      openNotification(err.message);
    }
  };

  const openNotification = (errText) => {
    notification.open({
      message: 'Request sent',
      description: errText
        ? `Request status: failed. ${errText}`
        : 'Request status: successfull',
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
      <Typography.Title>Edit user id: {userId}</Typography.Title>

      {isLoading ? (
        <Loader />
      ) : (
        <Form
          form={form}
          name="udit_user"
          initialValues={user}
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
            <Input />
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
            <Input />
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
              Save
            </Button>
          </Form.Item>
        </Form>
      )}
    </PageTemplate>
  );
};

export default withRouter(EditUserPage);
