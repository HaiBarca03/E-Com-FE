import React, { useState } from 'react';
import './PaymentPage.css';
import { Button, Col, Divider, message, Radio, Row, Select } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { convertPrice } from '../../ultil';
import { useMutationHooks } from '../../hooks/useMutationHook';
import { createOrder } from '../../userService/OrderServices';

const PaymentPage = () => {
    const navigate = useNavigate();
    const order = useSelector((state) => state.order);
    const user = useSelector((state) => state.user);
    console.log('order', order)
    console.log('user', user)
    const [deliveryMethod, setDeliveryMethod] = useState('standard');
    const [paymentMethod, setPaymentMethod] = useState('creditCard');
    const location = useLocation()
    console.log('location', location?.state?.selectedItems)

    const selectedItems = location?.state?.selectedItems || [];
    console.log('selectedItems', selectedItems)
    const subtotal = selectedItems.reduce((sum, item) => sum + item.price * item.amount, 0);
    const tax = 1000; // Example static tax, replace with dynamic calculation if needed
    const shipping = deliveryMethod === 'express' ? 2000 : 1000; // Dynamic shipping based on delivery method
    const total = subtotal + tax + shipping;

    const mutationOrder = useMutationHooks(
        async (data) => {
            const { access_token, ...rest } = data;
            return await createOrder({ ...rest }, access_token);
        },
        {
            onSuccess: async (data) => {
                message.success('Delete thành công!', 3);
                console.log('message.success', message.success)
            },
            onError: (error) => {
                console.error('Error during update:', error);
                message.error('Cập nhật thất bại, vui lòng thử lại.', 5);
            },
        }
    );
    // console.log('user', user?.access_token)
    const handlePayment = async () => {
        if (user?.access_token) {
            try {
                const response = await mutationOrder.mutateAsync({
                    access_token: user?.access_token,
                    orderItems: selectedItems,
                    fullName: user?.name,
                    address: user?.address,
                    city: user?.address,
                    phone: user?.phone,
                    paymentMethod: paymentMethod,
                    itemsPrice: subtotal,
                    shippingPrice: shipping,
                    totalPrice: total,
                    user: user?.id,
                });

                if (response.success) {
                    // Redirect to Stripe payment page
                    window.location.href = response.url;
                } else {
                    message.error(response.message || 'Something went wrong, please try again.', 5);
                }
            } catch (error) {
                console.error('Error order product:', error);
                message.error('There was an error processing your order. Please try again.', 5);
            }
        } else {
            message.error('Access token not found, please try again.', 5);
        }
    };

    return (
        <div className='payment_page'>
            <div className="title_payment-page">Thanh toán</div>
            <Row className='payment_wrapper'>
                <Col className="col_item" span={11}>
                    {/* Customer Information */}
                    <div className="col_right-top">
                        <span className='title_right-item'>Thông tin khách hàng</span>
                    </div>
                    <Divider />
                    <div className="col_right">
                        <div className="col_right-item">
                            <span className='title_right-item'>Tên khách hàng:</span>
                            <span>{user?.name}</span>
                        </div>
                        <div className="col_right-item">
                            <span className='title_right-item'>Phone:</span>
                            <span>{user?.phone}</span>
                        </div>
                        <div className="col_right-item">
                            <span className='title_right-item'>Địa chỉ giao hàng:</span>
                            <span>{user?.address}</span>
                        </div>
                    </div>
                    <div className="col_right-top">
                        <span className='title_right-item'>Thông tin sản phẩm</span>
                    </div>
                    <Divider />
                    <div className="col_right">
                        <Row className="product-table">
                            <Col span={8}>
                                <strong>Tên sản phẩm</strong>
                            </Col>
                            <Col span={5}>
                                <strong>Giá</strong>
                            </Col>
                            <Col span={4}>
                                <strong>Số lượng</strong>
                            </Col>
                            <Col span={7}>
                                <strong>Thành tiền</strong>
                            </Col>
                        </Row>
                        {selectedItems?.map((item, index) => (
                            <Row key={index} className="product-row">
                                <Col span={8}>{item.name}</Col>
                                <Col span={5}>{convertPrice(item.price)}</Col>
                                <Col span={4}>{item.amount}</Col>
                                <Col span={7}>{convertPrice(item.price * item.amount)}</Col>
                            </Row>
                        ))}
                    </div>
                </Col>
                <Col className="col_item" span={6}>
                    <div className="col_right-top">
                        <span className='title_right-item'>Phương thức</span>
                    </div>
                    <Divider />
                    <div className="payment_method">
                        <div className='title_payment-item'>Phương thức giao hàng</div>
                        <Radio.Group
                            value={deliveryMethod}
                            onChange={(e) => setDeliveryMethod(e.target.value)}
                        > <div>
                                <Radio value='standard'>Giao hàng tiêu chuẩn (1,000₫)</Radio>
                            </div>
                            <div>
                                <Radio value='express'>Giao hàng nhanh (2,000₫)</Radio>
                            </div>
                        </Radio.Group>
                    </div>
                    <Divider />
                    <div className="payment_method">
                        <div className='title_payment-item'>Phương thức thanh toán</div>
                        <Radio.Group
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        > <div>
                                <Radio value='creditCard'>Thẻ tín dụng</Radio>
                            </div>
                            <div>
                                <Radio value='cash'>Thanh toán khi nhận hàng</Radio>
                            </div>
                            <div>
                                <Radio value='bankTransfer'>Ngân hàng liên kết</Radio>
                            </div>
                        </Radio.Group>
                    </div>
                </Col>
                <Col className="col_item" span={6}>
                    <div className="col_right-top">
                        <span className='title_right-item'>Thông tin thanh toán</span>
                    </div>
                    <Divider />
                    <div className="col_right">
                        <div className="col_right-item">
                            <span className='title_right-item'>Tạm tính</span>
                            <span>{convertPrice(subtotal)}</span>
                        </div>
                        <div className="col_right-item">
                            <span className='title_right-item'>Thuế</span>
                            <span>{convertPrice(tax)}</span>
                        </div>
                        <div className="col_right-item">
                            <span className='title_right-item'>Phí giao hàng</span>
                            <span>{convertPrice(shipping)}</span>
                        </div>
                        <Divider />
                        <div className="col_right-item">
                            <span className='title_right-item'>Tổng tiền</span>
                            <span className='price_sum'>{convertPrice(total)}</span>
                        </div>
                        <p className='price_vat'>Đã bao gồm VAT (nếu có)</p>
                        <Divider />
                        <div className="btn_pay-order">
                            <Button onClick={handlePayment} className="pay_now-order" type="primary">Thanh toán</Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default PaymentPage;