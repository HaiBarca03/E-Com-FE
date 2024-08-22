import React from 'react'
import './ProductDetail.css'
import ProductCpn from '../../components/ProductCpn/ProductCpn'

const ProductDetail = () => {
    return (
        <div className='product_detail'>
            <h5 className='nav_product'>Trang chủ</h5>
            <ProductCpn />
        </div>
    )
}

export default ProductDetail
