import React from 'react'
import './ProductCpn.css'
import { Col, Image, Row } from 'antd'
import { CarOutlined, MinusCircleOutlined, PlusCircleOutlined, StarFilled, StarOutlined } from '@ant-design/icons';
import imageProduct from '../../assets/product_item.webp'
import imageProductSmall1 from '../../assets/product_item_1.webp'
import imageProductSmall2 from '../../assets/product_item_2.webp'

const ProductCpn = () => {
    return (
        <div className='produccpn'>
            <Row>
                <Col span={10} className='image_product'>
                    <Image className='main_product-img' src={imageProduct} alt='image product' preview='false' />
                    <Row className='small_product-img'>
                        <Col span={4}>
                            <Image src={imageProductSmall1} alt='image small' preview='false' />
                        </Col>
                        <Col span={4}>
                            <Image src={imageProductSmall2} alt='image small' preview='false' />
                        </Col>
                        <Col span={4}>
                            <Image src={imageProductSmall1} alt='image small' preview='false' />
                        </Col>
                        <Col span={4}>
                            <Image src={imageProductSmall2} alt='image small' preview='false' />
                        </Col>
                        <Col span={4}>
                            <Image src={imageProductSmall1} alt='image small' preview='false' />
                        </Col>
                        <Col span={4}>
                            <Image src={imageProductSmall2} alt='image small' preview='false' />
                        </Col>
                    </Row>
                </Col>
                <Col span={14}>
                    <div className='info_product-item'>
                        <div className="name_product">Chính Trị Luận </div>
                        <div className='rate_product'>
                            <div className="count_star">
                                <StarFilled />
                                <StarFilled />
                                <StarFilled />
                                <StarOutlined />
                                <StarOutlined />
                            </div>
                            <div className='buyed'>Da ban 1000</div>
                        </div>
                        <div className="price_product">
                            <p className='old_price'>151.000 đ</p>
                            <p className='new_price'>141.000 đ</p>
                        </div>
                        <div className="count_product">
                            <p className='title_count'>Số lượng</p>
                            <MinusCircleOutlined />
                            <button className='num_count'>
                                {5}
                            </button>
                            <PlusCircleOutlined />
                        </div>
                        <div className="add_product">
                            <p className='title_add'>Thông tin vận chuyển</p>
                            <div className='info_add'>
                                <p className=''>Giao đến H. Cẩm Giàng, TT. Lai Cách, Hải Dương</p>
                                <a href="test">Đổi</a>
                            </div>
                            <div className="time_ship">
                                <CarOutlined /> <span>Dự kiến giao ngày ... tháng ... năm...</span>
                                <p className='time_detail'> Trước 19h, ngày ... tháng ... năm ... </p>
                            </div>
                        </div>
                        <div className="buy">
                            <button className='buy_now' >Chọn mua</button>
                            <button className='buy_later' >Mua trả sau</button>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default ProductCpn
