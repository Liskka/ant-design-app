import { Layout } from 'antd';
import React from 'react'
import Menu from '../Menu/Menu';

const { Header, Content, Footer} = Layout;

const PageTemplate = ({ children }) => {
  return (
    <Layout 
      style={{
        minHeight: '100vh'
      }}
    >
      <Header>
        <Menu />
      </Header>

      <Content style={{padding: '14px 24px', backgroundColor: '#fff'}}>
        {children}
      </Content>

      <Footer style={{textAlign: 'center'}}>
        Project 2022
      </Footer>
    </Layout>
  )
}

export default PageTemplate