import { Spin } from 'antd'
import React from 'react'

const Loading = ({ children, isLoading, delay }) => {
    return (
        <Spin spinning={isLoading} size="small" delay={delay}>
            {children}
        </Spin>
    )
}

export default Loading
