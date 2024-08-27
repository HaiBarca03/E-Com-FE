import React, { useState } from 'react'
import './CardComponent.css'
import { Card, Flex, Rate } from 'antd';
import { useNavigate } from 'react-router-dom';
import { convertPrice } from '../../ultil';
const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

const CardComponent = (props) => {
    const { countInStock, description, image, name, price, rating, type, discount, selled, id } = props
    const navigate = useNavigate()
    const handleProductDetail = (id) => {
        navigate(`/product-detail/${id}`)
    }
    const roundedRating = Math.round(rating);
    const [value, setValue] = useState(roundedRating);
    return (
        <div onClick={() => handleProductDetail(id)} className='cart'>
            <Card
                hoverable
                style={{
                    width: 235,
                }}
                cover={<img className='img_product' alt="example" src={image} />}
            >
                <div className='title_product'>
                    <span className='nameProduct'>{name}</span>
                </div>
                <div className='rate_product'>
                    <span>{rating}</span>
                    <Flex gap="middle" vertical>
                        <Rate allowHalf tooltips={desc} onChange={setValue} value={value} />
                    </Flex>
                    <div className='buyed'>Da ban {discount}</div>
                </div>
                <div className='price_product'>
                    <span className='price'>{convertPrice(price)}</span>
                    {/* <span className='price'>{price} đ</span> */}
                    <span className='sale_product'>{discount}%</span>
                </div>
                <div className='des_product'>
                    <span className='des_item'>Free ship</span>
                    <span className='des_item'>Chính hãng</span>
                </div>
            </Card>
        </div>
    )
}

export default CardComponent
