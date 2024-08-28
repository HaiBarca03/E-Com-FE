import React, { useEffect, useState } from 'react';
import './MyOrderPage.css';
import { useSelector } from 'react-redux';
import { deleteOrderUser, getOrderUser, updateOrderPaid } from '../../userService/OrderServices';
import { List, Card, Button, Row, Col, message, Divider, Modal } from 'antd';
import { convertPrice } from '../../ultil';

const MyOrderPage = () => {
    const user = useSelector((state) => state.user);
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    const fetchAllOrders = async () => {
        try {
            const res = await getOrderUser(user.id);
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
        setSelectedOrder(order);
        setIsVisible(true);
    };

    const handleDeleteOrder = async (orderId) => {
        try {
            const res = await deleteOrderUser(orderId);
            if (res.success) {
                message.success('Order deleted successfully');
                fetchAllOrders(); // Refresh orders after deletion
            } else {
                message.error(res.message);
            }
        } catch (error) {
            message.error('Error deleting order');
        }
    };

    const handlePaymentSuccess = async (orderId) => {
        try {
            const res = await updateOrderPaid(orderId); // Call the API to update payment status
            console.log('orderId_succ', orderId)
            if (res.success) {
                message.success('Payment status updated successfully');
                fetchAllOrders(); // Refresh orders to reflect the updated status
            } else {
                message.error(res.message);
            }
        } catch (error) {
            message.error('Error updating payment status');
        }
    };

    const handleCancel = () => {
        setIsVisible(false);
        setSelectedOrder(null);
    };

    return (
        <div className='my_order-page'>
            <h2 className='title_page-my-order'>My Orders</h2>
            {orders.length === 0 ? (
                <p>You have no orders.</p>
            ) : (
                <div className="container_od-page">
                    <List
                        grid={{ gutter: 16, column: 1 }}
                        dataSource={orders}
                        renderItem={(order) => (
                            <Card key={order._id}>
                                {console.log('order?.paymentMethod', order?.paymentMethod)}
                                <p className='strong_item-order status'>Status</p>
                                <p className='status'>Payment: {order.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}</p>
                                <p className='status'>Delivery: {order.isDelivered ? 'Đã giao' : 'Chưa giao'}</p>
                                <Divider />
                                <List
                                    itemLayout="horizontal"
                                    dataSource={order.orderItems}
                                    renderItem={(item) => (
                                        <List.Item>
                                            <Row gutter={[16, 16]} style={{ width: '100%' }}>
                                                <Col span={4}>
                                                    <img src={item.image} alt={item.name} style={{ width: '70px', height: '70px' }} />
                                                </Col>
                                                <Col span={9}>
                                                    <strong>{item.name}</strong>
                                                </Col>
                                                <Col span={6}>
                                                    <p className='strong_item-order'>Price: <span className='price_item-order'>{convertPrice(item.price)}</span></p>
                                                    <p className='strong_item-order'>Quantity: <span className='price_item-order'>{item.amount}</span></p>
                                                    <strong>Total: <span className='price_item-order'>{convertPrice(item.price * item.amount)}</span></strong>
                                                </Col>
                                                <Col span={4}>
                                                    <Button style={{ width: '120px', marginBottom: '10px' }} onClick={() => handleViewDetails(order)} type="primary">View Details</Button>
                                                    <Button style={{ width: '120px' }} type="primary" onClick={() => handleDeleteOrder(order._id)} danger>Cancel Order</Button>
                                                    {!order.isPaid && !order?.paymentMethod === 'cash' && (
                                                        <Button
                                                            style={{ width: '120px', marginTop: '10px' }}
                                                            type="primary"
                                                            onClick={() => handlePaymentSuccess(order._id)}
                                                        >
                                                            Trạng thái
                                                        </Button>
                                                    )}
                                                </Col>
                                            </Row>
                                        </List.Item>
                                    )}
                                />
                                <p className='strong_item-order last-price'>Total: <span className='price_item-order'>{convertPrice(order.totalPrice)}</span></p>
                            </Card>
                        )}
                    />
                </div>
            )}

            <Modal
                title="Order Details"
                visible={isVisible}
                onCancel={handleCancel}
                footer={null}
            >
                {selectedOrder && (
                    <>
                        <div className="user__item_order">
                            <h3>Customer Information</h3>
                            <p><strong className='tit_item'>Name:</strong> {selectedOrder.user.name}</p>
                            <p><strong className='tit_item'>Email:</strong> {selectedOrder.user.email}</p>
                        </div>
                        <div className="status__item_order">
                            <h3>Status Information</h3>
                            <p><strong className='tit_item'>Purchase Time:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
                            <p><strong className='tit_item'>Delivery Status:</strong> {selectedOrder.isDelivered ? 'Đã giao' : 'Chưa giao'}</p>
                            <p><strong className='tit_item'>Payment Status:</strong> {selectedOrder.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}</p>
                            <p><strong className='tit_item'>Order Price:</strong> {convertPrice(selectedOrder.itemsPrice)}</p>
                            <p><strong className='tit_item'>Shipping Price:</strong> {convertPrice(selectedOrder.shippingPrice)}</p>
                            <p><strong className='tit_item'>Total Price:</strong> {convertPrice(selectedOrder.totalPrice)}</p>
                            <p><strong className='tit_item'>Payment Method:</strong> {selectedOrder.paymentMethod}</p>
                        </div>
                        <div className="product__item_order">
                            <h3>Ordered Products</h3>
                            {selectedOrder.orderItems.map((item, index) => (
                                <div key={index}>
                                    <img src={item.image} alt={item.name} style={{ width: '50px', marginRight: '10px' }} />
                                    <p><strong className='tit_item'>Product:</strong> {item.name}</p>
                                    <p><strong className='tit_item'>Price:</strong> {convertPrice(item.price)}</p>
                                    <p><strong className='tit_item'>Quantity:</strong> {item.amount}</p>
                                </div>
                            ))}
                        </div>
                        <div className="info__item_order">
                            <h3>Shipping Information</h3>
                            <p><strong className='tit_item'>Name:</strong> {selectedOrder.shippingAddress.fullName}</p>
                            <p><strong className='tit_item'>Address:</strong> {selectedOrder.shippingAddress.address}</p>
                            <p><strong className='tit_item'>City:</strong> {selectedOrder.shippingAddress.city}</p>
                            <p><strong className='tit_item'>Phone:</strong> {selectedOrder.shippingAddress.phone}</p>
                        </div>
                    </>
                )}
            </Modal>
        </div>
    );
};

export default MyOrderPage;
