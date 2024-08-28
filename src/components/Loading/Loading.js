import { Spin } from 'antd'
import React from 'react'

const Loading = ({ children, isLoading, delay }) => {
    return (
        <Spin spinning={isLoading} tip="Đang tải ...">
            {children}
        </Spin>
    )
}

export default Loading
