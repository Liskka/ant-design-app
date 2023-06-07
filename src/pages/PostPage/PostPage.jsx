import {
  Avatar,
  Button,
  Card,
  Form,
  Input,
  Modal,
  notification,
  Tooltip,
} from 'antd';
import axios from '../../axios/index';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import PageTemplate from '../../components/PageTemplate/PageTemplate';
import PostComments from '../../components/PostComments/PostComments';
import TextArea from 'antd/lib/input/TextArea';
import { WarningOutlined } from '@ant-design/icons';

const PostPage = ({ match: { params } }) => {

  const [post, setPost] = useState({});
  const [author, setAuthor] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchPost(params.id);
  }, []);

  const fetchPost = async (postId) => {
    setIsLoading(true);
    const response = await axios.get(`/posts/${postId}`);
    setPost(response.data.data);
    const responseAuthor = await axios.get(
      `/users/${response.data.data.user_id}`
    );
    setAuthor(responseAuthor.data.data);
    setIsLoading(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const onFinish = async (newPost) => {
    const finishPost = {
      id: post.id,
      user_id: post.user_id,
      title: newPost.title,
      body: newPost.body,
    };

    try {
      await axios.put(
        `/posts/${finishPost.id}`,
        finishPost
      );
      await fetchPost(params.id);
    } catch (error) {
      openNotification(error);
    } finally {
      setIsModalVisible(false);
    }
  };

  const openNotification = (errText) => {
    notification.open({
      message: `Error`,
      description: `Request status: failed. ${errText}`,
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
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Card
            title={post.title}
            extra={
              <Tooltip title={author.name} placement="left">
                <Avatar size={50}>
                  {author.name && author.name.split(' ')[0]}
                </Avatar>
              </Tooltip>
            }
            headStyle={{ fontSize: '25px' }}
            bodyStyle={{ fontSize: '20px' }}
            style={{ boxShadow: '5px 5px 7px gray' }}
          >
            <p>{post.body}</p>
            <Button
              type="primary"
              style={{ right: '10px' }}
              onClick={() => showModal()}
            >
              Edit
            </Button>
            <Modal
              title="Edit post"
              visible={isModalVisible}
              onCancel={() => setIsModalVisible(false)}
              footer={null}
            >
              <Form
                form={form}
                name="create_post"
                initialValues={{
                  id: post.id,
                  user_id: post.user_id,
                  title: post.title,
                  body: post.body,
                }}
                onFinish={onFinish}
              >
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
                    Edit post
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
          </Card>
          <PostComments postId={params.id} />
        </>
      )}
    </PageTemplate>
  );
};

export default withRouter(PostPage);
