import React, { useState } from 'react'
import './ProductCpn.css'
import { Col, Image, message, Rate, Row } from 'antd'
import { CarOutlined, MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import imageProduct from '../../assets/product_item.webp'
// import imageProductSmall1 from '../../assets/product_item_1.webp'
// import imageProductSmall2 from '../../assets/product_item_2.webp'
import { useQuery } from '@tanstack/react-query';
import { getDetailProduct } from '../../userService/ProductService';
import Loading from '../Loading/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { addOrderProduct } from '../../redux/slides/orderSlide';
import { convertPrice } from '../../ultil';

const ProductCpn = ({ idProduct }) => {
    const user = useSelector((state) => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    console.log('user', user)
    const location = useLocation()
    console.log('location:', location)

    // fix count buy
    const [numProduct, setNumProduct] = useState(1);
    const increaseQuantity = () => {
        setNumProduct(prev => prev + 1);
    };
    const decreaseQuantity = () => {
        if (numProduct > 1) {
            setNumProduct(prev => prev - 1);
        }
    };

    // fix date ship
    const currentDate = new Date();
    const estimatedDate = new Date(currentDate);
    estimatedDate.setDate(currentDate.getDate() + 5);
    const formattedDate = estimatedDate.toLocaleDateString('vi-VN', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
    });

    const fetchGetDetailProduct = async ({ id }) => {
        const res = await getDetailProduct(id);
        // if (res?.data?.length > 0) {
        //     setStateProducts(res?.data);
        // }
        return res.data
    }

    const { isLoading, data: productDetails } = useQuery({
        queryKey: ['product-details', idProduct],
        queryFn: () => fetchGetDetailProduct({ id: idProduct }),
        enabled: !!idProduct

    });
    // add order
    const handleAddOrder = () => {
        if (!user?.id) {
            navigate('/sign-in', { state: location?.pathname })
            message.warning('Vui lòng đăng nhập')
        } else {
            dispatch(addOrderProduct({
                orderItems: {
                    name: productDetails?.name,
                    amount: numProduct,
                    image: productDetails?.image,
                    price: productDetails?.price,
                    product: productDetails?._id,
                },
            }))
        }
    }
    console.log('productDetails', productDetails)
    if (!productDetails) {
        return <Loading isLoading={true} />;
    }
    return (
        <Loading isLoading={isLoading}>
            <div className='produccpn'>
                <Row>
                    <Col span={10} className='image_product'>
                        <Image className='main_product-img' src={productDetails.image} alt='image product' preview='false' />
                        <Row className='small_product-img'>
                            <Col span={4}>
                                <Image src={productDetails.image} alt='image small' preview='false' />
                            </Col>
                            <Col span={4}>
                                <Image src={productDetails.image} alt='image small' preview='false' />
                            </Col>
                            <Col span={4}>
                                <Image src={productDetails.image} alt='image small' preview='false' />
                            </Col>
                            <Col span={4}>
                                <Image src={productDetails.image} alt='image small' preview='false' />
                            </Col>
                            <Col span={4}>
                                <Image src={productDetails.image} alt='image small' preview='false' />
                            </Col>
                            <Col span={4}>
                                <Image src={productDetails.image} alt='image small' preview='false' />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={14}>
                        <div className='info_product-item'>
                            <div className="name_product">{productDetails.name} </div>
                            <div className='rate_product'>
                                <div className="count_star">
                                    <Rate allowHalf defaultValue={productDetails.rating} />
                                </div>
                                <div className='buyed'>Da ban 1000</div>
                            </div>
                            <div className="price_product">
                                <p className='old_price'>{convertPrice(productDetails.price + 100)}</p>
                                <p className='new_price'>{convertPrice(productDetails.price)}</p>
                            </div>
                            <div className="count_product">
                                <p className='title_count'>Số lượng</p>
                                <MinusCircleOutlined onClick={decreaseQuantity} />
                                <button className='num_count'>
                                    {numProduct}
                                </button>
                                <PlusCircleOutlined onClick={increaseQuantity} />
                            </div>
                            <div className="add_product">
                                <p className='title_add'>Thông tin vận chuyển</p>
                                <div className='info_add'>
                                    <span>Giao đến</span><p className=''> {user.address}</p>
                                    <a href="test">Đổi</a>
                                </div>
                                <div className="time_ship">
                                    <CarOutlined /> <span>Dự kiến giao ngày {formattedDate}</span>
                                    <p className='time_detail'> Trước 19h, ngày {formattedDate} </p>
                                </div>
                            </div>
                            <div className="buy">
                                <button onClick={handleAddOrder} className='buy_now' >Chọn mua</button>
                                <button className='buy_later' >Mua trả sau</button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </Loading>
    )
}

export default ProductCpn
