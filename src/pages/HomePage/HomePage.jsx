import React, { useEffect, useRef, useState } from 'react'
import './HomePage.css'
import TypeProducts from '../../components/TypeProducts/TypeProducts'
import SliderComponent from '../../components/Slider/Slider'
import CardComponent from '../../components/Cart/CardComponent'
import Navbar from '../../components/NavBar/Navbar'
import { getAllProduct, getAllType } from '../../userService/ProductService'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { Spin } from 'antd'
import Loading from '../../components/Loading/Loading'

const HomePage = () => {
    const searchProduct = useSelector((state) => state?.product?.search)
    const [limit, setLimit] = useState(5)
    const [dateType, setDataType] = useState([])
    const [stateProducts, setStateProducts] = useState([])
    const refSearch = useRef()

    const fetchProductAll = async (limit, search = '') => {
        const res = await getAllProduct(search, limit);
        if (res?.data?.length > 0) {
            setStateProducts(res?.data);
        }
        return res
    };

    const { isLoading, data: products } = useQuery({
        queryKey: ['products', limit, searchProduct],
        queryFn: () => fetchProductAll(limit, searchProduct),
        keepPreviousData: true,
    });
    // useEffect(() => {
    //     if (refSearch.current) {
    //         fetchProductAll(searchProduct)
    //     }
    //     refSearch.current = true
    // }, [searchProduct])


    // useEffect(() => {
    //     if (products?.data?.length > 0) {
    //         setStateProducts(products?.data)
    //     }
    // }, [products])
    console.log('data products: ', products)

    const fetchAllType = async () => {
        const res = await getAllType()
        setDataType(res?.data)
    }
    useEffect(() => {
        fetchAllType()
    }, [])
    return (
        <div className='homepage'>
            <div className='nav_home-page'>
                {dateType.map((item) => {
                    return (
                        <>
                            <TypeProducts name={item} key={item} />
                            <span className='cross_nav'>|</span>
                        </>
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
