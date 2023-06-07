import { Button, Form, InputNumber, notification } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import axios from '../../axios/index';
import React, { useState } from 'react';
import { WarningOutlined } from '@ant-design/icons';

const CommentForm = ({ postId, fetchComments }) => {
  const [visibleCommentForm, setVisibleCommentForm] = useState(false);
  const [form] = Form.useForm();

  const layout = {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 14,
    },
  };

  const openNotification = (errText) => {
    notification.open({
      message: errText ? `Error` : 'Сomment added',
      description: errText
        ? `Request status: failed. ${errText}`
        : 'Comment created successfully',
      icon: (
        <WarningOutlined
          style={{
            color: errText ? 'red' : 'green',
          }}
        />
      ),
    });
  };

  const onFinish = async (newComment) => {
    let user = [];
    try {
      user = await axios.get(`/users/${newComment.user_id}`);
    } catch (error) {
      openNotification(`User is not found (${error.message})`);
    }

    const comment = {
      body: newComment.body,
      post_id: postId,
      name: user.data.data.name,
      email: user.data.data.email,
    };

    try {
      await axios.post(`/posts/${comment.post_id}/comments`, comment);
      openNotification();
    } catch (error) {
      openNotification(error.message);
    }

    setVisibleCommentForm(false);
    fetchComments();
    window.scrollTo(0, 0);
    form.resetFields();
  };

  return (
    <>
      {visibleCommentForm ? (
        <Form
          {...layout}
          form={form}
          name="create_post"
          onFinish={onFinish}
          initialValues={{
            user_id: '',
            body: '',
          }}
          style={{ margin: '30px 0 0 0' }}
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
            name="body"
            label="Comment body"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <TextArea />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 5 }}>
            <Button htmlType="submit">Post comment</Button>
          </Form.Item>
        </Form>
      ) : (
        <Button
          size="large"
          style={{
            left: '50%',
            transform: 'translateX(-50%)',
            margin: '30px 0 0 0',
          }}
          onClick={() => setVisibleCommentForm(true)}
        >
          Add a comment
        </Button>
      )}
    </>
  );
};

export default CommentForm;
