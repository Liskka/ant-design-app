import React from 'react';
import { Menu as MenuAntd } from 'antd';
import { Link, withRouter } from 'react-router-dom';

const Menu = ({ location }) => {
  const defaultKey = location.pathname;

  const items = [
    { label: <Link to="/">Home</Link>, key: '/' },
    { label: <Link to="/users">Users</Link>, key: '/users' },
    { label: <Link to="/createUser">Create User</Link>, key: '/createUser' },
    { label: <Link to="/posts">Posts</Link>, key: '/posts' },
    { label: <Link to="/createPost">Create Post</Link>, key: '/createPost' },
    { label: <Link to="/todos">Todos</Link>, key: '/todos' },
  ];

  return (
    <MenuAntd
      items={items}
      mode="horizontal"
      defaultSelectedKeys={[defaultKey]}
      theme="dark"
    ></MenuAntd>
  );
};

export default withRouter(Menu);
