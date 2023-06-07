import { Card, Pagination, Space, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from '../../axios/index';
import Loader from '../../components/Loader/Loader';
import PageTemplate from '../../components/PageTemplate/PageTemplate';

const PostsPage = ({ match, history, location }) => {
  const searchParams = new URLSearchParams(location.search);
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  const fetchPosts = async (page = currentPage || 1) => {
    setIsLoading(true);
    const response = await axios.get(`/posts?page=${page}`);
    setPosts(response.data.data);
    setPagination(response.data.meta.pagination);
    setIsLoading(false);
  };
  console.log(match, location);

  const selectPage = (page) => {
    fetchPosts(page);
  };

  const selectPost = (id) => {
    history.push(location.pathname + '/' + id);
  };

  return (
    <PageTemplate>
      <Typography.Title>Posts Page</Typography.Title>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Space
            direction="vertical"
            size="middle"
            style={{
              display: 'flex',
            }}
          >
            {posts.map((post) => (
              <CardPost key={post.id} cardInfo={post} selectPost={selectPost} />
            ))}
          </Space>
          <Pagination
            current={pagination.page}
            total={pagination.total}
            showSizeChanger={false}
            pageSize={10}
            onChange={(page, pageSize) => {
              selectPage(page);
              history.push({
                pathname: location.pathname,
                search: `page=${page}`,
              });
            }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              margin: '30px auto 0',
            }}
          />
        </>
      )}
    </PageTemplate>
  );
};

export default withRouter(PostsPage);

const CardPost = ({ cardInfo, selectPost }) => {
  return (
    <Card
      title={cardInfo.title}
      style={{ boxShadow: '5px 5px 7px gray', cursor: 'pointer' }}
      onClick={() => selectPost(cardInfo.id)}
    >
      <p>{cardInfo.body}</p>
    </Card>
  );
};
