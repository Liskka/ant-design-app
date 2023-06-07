import axios from '../../axios/index';
import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import CommentForm from '../CommentForm/CommentForm';
import Loader from '../Loader/Loader';

const PostComments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchComments(postId);
  }, []);

  const fetchComments = async (postId) => {
    setIsLoading(true);
    const responseComments = await axios.get(`/comments?post_id=${postId}`);
    setComments(responseComments.data.data);
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {comments.map((comment) => (
            <Comment key={comment.id} {...comment} />
          ))}
        </>
      )}
      <CommentForm
        postId={postId}
        fetchComments={() => fetchComments(postId)}
      />
    </>
  );
};

export default PostComments;

const Comment = ({ body, id, email, name }) => {
  return (
    <Card
      title={name}
      style={{
        width: '60%',
        margin: '30px auto 0',
        boxShadow: '5px 5px 7px gray',
      }}
    >
      <p>{body}</p>
    </Card>
  );
};
