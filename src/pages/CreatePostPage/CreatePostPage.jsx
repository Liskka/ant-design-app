import React from 'react';
import {
  Button,
  Form,
  Input,
  InputNumber,
  notification,
  Typography,
} from 'antd';
import PageTemplate from '../../components/PageTemplate/PageTemplate';
import axios from '../../axios/index';
import { useHistory } from 'react-router-dom';
import { WarningOutlined } from '@ant-design/icons';
const { TextArea } = Input;

const CreatePostPage = () => {
  const history = useHistory();
  const [form] = Form.useForm();

  const onFinish = async (newPost) => {
    console.log(newPost);
    try {
      await axios.post(`/users/${newPost.user_id}/posts`, newPost);
      history.push('/posts');
      openNotification();
    } catch (error) {
      openNotification(error);
    }
  };

  const openNotification = (errText) => {
    notification.open({
      message: errText ? `Error` : 'Success',
      description: errText
        ? `Request status: failed. User not found. ${errText}`
        : 'Post created successfully',
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
      <Typography.Title>Create Post Page</Typography.Title>

      <Form
        form={form}
        name="create_post"
        onFinish={onFinish}
      >
        <Form.Item
          name="user_id"
          label="User"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="Enter title" />
        </Form.Item>
        <Form.Item
          name="body"
          label="Post body"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <TextArea />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create post
          </Button>
        </Form.Item>
      </Form>
    </PageTemplate>
  );
};

export default CreatePostPage;
