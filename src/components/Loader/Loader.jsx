import { Spin } from 'antd'
import React from 'react'

const Loader = () => {
  return (
    <div 
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '50px',
      }}>
        <Spin 
        size="large" />
      </div>
  )
}

export default Loader