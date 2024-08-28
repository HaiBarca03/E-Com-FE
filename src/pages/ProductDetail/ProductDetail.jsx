import React from 'react'
import './ProductDetail.css'
import ProductCpn from '../../components/ProductCpn/ProductCpn'
import { useNavigate, useParams } from 'react-router-dom'
import { getDetailProduct } from '../../userService/ProductService'
import { useQuery } from '@tanstack/react-query'
import ReviewComponents from '../../components/Review/ReviewComponents'

const ProductDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    return (
        <div className='product_detail'>
            <h5 className='nav_product'> <span onClick={() => { navigate('/') }}>Trang chủ</span> / Chi tiết sản phẩm</h5>
            <ProductCpn idProduct={id} />
            <ReviewComponents idProduct={id} />
        </div>
    )
}

export default ProductDetail
