import React from 'react'
import './TypeProductPage.css'
import Navbar from '../../components/NavBar/Navbar'
import CardComponent from '../../components/Cart/CardComponent'
import { Col, Row, Pagination } from 'antd'

const TypeProductPage = () => {
    return (
        <div className='container_TypePage'>
            <Row className='wrapper_layout'>
                <Col className='col_item' span={4}>
                    <Navbar />
                </Col>
                <Col className='product-item' span={20}>
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                </Col>
            </Row>
            <div className='pagination'>
                <Pagination defaultCurrent={1} total={50} />
            </div>
        </div>
    )
}

export default TypeProductPage
