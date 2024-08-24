import React, { useEffect, useRef, useState } from 'react'
import './HomePage.css'
import TypeProducts from '../../components/TypeProducts/TypeProducts'
import SliderComponent from '../../components/Slider/Slider'
import CardComponent from '../../components/Cart/CardComponent'
import Navbar from '../../components/NavBar/Navbar'
import { getAllProduct } from '../../userService/ProductService'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { Spin } from 'antd'
import Loading from '../../components/Loading/Loading'

const HomePage = () => {
    const arr = ['TV', 'Tủ lạnh', 'LapTop']
    const searchProduct = useSelector((state) => state?.product?.search)
    const [limit, setLimit] = useState(5)
    const [stateProducts, setStateProducts] = useState([])
    const refSearch = useRef()

    const fetchProductAll = async (limit, search = '') => {
        const res = await getAllProduct(search, limit);
        if (res?.data?.length > 0) {
            setStateProducts(res?.data);
        }
        return res
    };

    // useEffect(() => {
    //     if (refSearch.current) {
    //         fetchProductAll(searchProduct)
    //     }
    //     refSearch.current = true
    // }, [searchProduct])

    const { isLoading, data: products } = useQuery({
        queryKey: ['products', limit, searchProduct],
        queryFn: () => fetchProductAll(limit, searchProduct),
        keepPreviousData: true,
    });

    // useEffect(() => {
    //     if (products?.data?.length > 0) {
    //         setStateProducts(products?.data)
    //     }
    // }, [products])
    console.log('data products: ', products)
    return (
        <div className='homepage'>
            <div className='nav_home-page'>
                {arr.map((item) => {
                    return (
                        <TypeProducts name={item} key={item} />
                    )
                })}
            </div>
            <SliderComponent />
            <Loading isLoading={isLoading} tip="Đang tải sản phẩm..."> {/* Bao toàn bộ nội dung sản phẩm bằng Spin */}
                <div className='product-item'>
                    {products?.data?.map((product) => {
                        return (
                            <CardComponent
                                key={product._id}
                                countInStock={product.countInStock}
                                description={product.description}
                                image={product.image}
                                name={product.name}
                                price={product.price}
                                rating={product.rating}
                                type={product.type}
                                discount={product.discount}
                                selled={product.selled}
                                id={product._id}
                            />
                        )
                    })}
                </div>
            </Loading>
            <Navbar />
            <div className='more_product'>
                <button onClick={() => setLimit((prev) => prev + 5)} className='btn_more' >Xem Thêm</button>
            </div>
        </div>
    )
}

export default HomePage
