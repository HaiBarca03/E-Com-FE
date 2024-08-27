import React, { useEffect, useState } from 'react';
import './MyOrderPage.css';
import { useSelector } from 'react-redux';
import { deleteOrderUser, getOrderUser } from '../../userService/OrderServices';
import { List, Card, Button, Row, Col, message, Divider, Modal } from 'antd';
import { convertPrice } from '../../ultil';

const MyOrderPage = () => {
    const user = useSelector((state) => state.user);
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null); // Store selected order for modal
    const [isVisible, setIsVisible] = useState(false);

    const fetchAllOrders = async () => {
        try {
            const res = await getOrderUser(user.id); // Lấy ID người dùng từ Redux state
            if (res.success) {
                setOrders(res.orders);
            } else {
                message.error(res.message);
            }
        } catch (error) {
            message.error('Error fetching orders');
        }
    };
    useEffect(() => {
        fetchAllOrders();
    }, []);

    const handleViewDetails = (order) => {
        setSelectedOrder(order); // Set the selected order
        setIsVisible(true); // Show modal
    };

    const handleDeleteOrder = async (orderid) => {
        try {
            const res = await deleteOrderUser(orderid);
            if (res.success) {
                setOrders(res.orders);
            } else {
                message.error(res.message);
            }
        } catch (error) {
            message.error('Error fetching orders');
        }
    };

    const handleCancel = () => {
        setIsVisible(false);
        setSelectedOrder(null); // Reset selected order
    };
    return (
        <div className='my_order-page'>
            <h2 className='title_page-my-order'>My Orders</h2>
            {orders?.length === 0 ? (
                <p>You have no orders.</p>
            ) : (
                <div className="container_od-page">
                    <List
                        grid={{ gutter: 16, column: 1 }}
                        dataSource={orders}
                        renderItem={(order) => (
                            <Card key={order._id}>
                                {console.log('order id', order?._id)}
                                <p className='strong_item-order status'>Trạng thái</p>
                                <p className='status'>Thanh toán: {order.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}</p>
                                <p className='status'>Giao hàng: {order.isDelivered ? 'Đã giao' : 'Chưa giao'}</p>
                                <Divider />
                                <List
                                    itemLayout="horizontal"
                                    dataSource={order.orderItems}
                                    renderItem={(item) => (
                                        <List.Item>
                                            <Row gutter={[16, 16]} style={{ width: '100%' }}>
                                                <Col className='' span={4}>
                                                    <img src={item.image} alt={item.name} style={{ width: '70px', height: '70px' }} />
                                                </Col>
                                                <Col className='order_item' span={9}>
                                                    <strong>{item.name}</strong>
                                                </Col>
                                                <Col className='' span={6}>
                                                    <p className='strong_item-order'>Đơn giá: <span className='price_item-order'>{convertPrice(item.price)}</span></p>
                                                    <p className='strong_item-order'>Số lượng: <span className='price_item-order'>{item.amount}</span></p>
                                                    <strong>Số tiền: <span className='price_item-order'>{convertPrice(item.price * item.amount)}</span></strong>
                                                </Col>
                                                <Col className='' span={4}>
                                                    <Button style={{ width: '120px', marginBottom: '10px' }} onClick={() => handleViewDetails(order)} type="primary">View Details</Button>
                                                    <Button style={{ width: '120px' }} type="primary" onClick={() => handleDeleteOrder(order._id)} danger>Huỷ đơn hàng</Button>
                                                </Col>
                                            </Row>
                                        </List.Item>
                                    )}
                                />
                                <p className='strong_item-order last-price'>Thành tiền: <span className='price_item-order'>{convertPrice(order.totalPrice)}</span></p>
                            </Card>
                        )}
                    />
                </div>
            )}

            <Modal
                title={`Order Details`}
                visible={isVisible}
                onCancel={handleCancel}
                footer={null}
            >
                {selectedOrder && (
                    <>
                        <div className="user__item_order">
                            <h3>Thông tin khách hàng</h3>
                            <p><strong className='tit_item'>Họ tên:</strong> {selectedOrder.user.name}</p>
                            <p><strong className='tit_item'>Email:</strong> {selectedOrder.user.email}</p>
                        </div>
                        <div className="status__item_order">
                            <h3>Thông tin trạng thái</h3>
                            <p><strong className='tit_item'>Thời gian mua</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
                            <p><strong className='tit_item'>Trạng thái giao hàng:</strong> {selectedOrder.isDelivered ? 'Yes' : 'No'}</p>
                            <p><strong className='tit_item'>Trạng thái thanh toán:</strong> {selectedOrder.isPaid ? 'Yes' : 'No'}</p>
                            <p><strong className='tit_item'>Giá đặt hàng:</strong>{convertPrice(selectedOrder.itemsPrice)}</p>
                            <p><strong className='tit_item'>Giá vận chuyển:</strong> {convertPrice(selectedOrder.shippingPrice)}</p>
                            <p><strong className='tit_item'>Thành tiền:</strong> {convertPrice(selectedOrder.totalPrice)}</p>
                            <p><strong className='tit_item'>Phương thức thanh toán:</strong> {selectedOrder.paymentMethod}</p>
                        </div>
                        <div className="product__item_order">
                            <h3>Sản phẩm đặt hàng</h3>
                            {selectedOrder.orderItems.map((item, index) => (
                                <div key={index}>
                                    <img src={item.image} alt={item.name} style={{ width: '50px', marginRight: '10px' }} />
                                    <p><strong className='tit_item'>Sản phẩm:</strong> {item.name}</p>
                                    <p><strong className='tit_item'>Đơn giá:</strong> {convertPrice(item.price)}</p>
                                    <p><strong className='tit_item'>Số lượng:</strong> {item.amount}</p>
                                </div>
                            ))}
                        </div>
                        <div className="info__item_order">
                            <h3>Thông tin đặt hàng</h3>
                            <p><strong className='tit_item'>Họ tên:</strong> {selectedOrder.shippingAddress.fullName}</p>
                            <p><strong className='tit_item'>Địa chỉ:</strong> {selectedOrder.shippingAddress.address}</p>
                            <p><strong className='tit_item'>Thành phố:</strong> {selectedOrder.shippingAddress.city}</p>
                            <p><strong className='tit_item'>Số điện thoại:</strong> {selectedOrder.shippingAddress.phone}</p>
                        </div>
                    </>
                )}
            </Modal>
        </div>
    );
};

export default MyOrderPage;
