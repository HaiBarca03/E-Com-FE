import React, { useState } from 'react'
import './OrderPage.css'
import { Button, Col, Divider, Image, message, Modal, Row, Table } from 'antd';
import { DeleteOutlined, MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { removeOrderProduct, updateOrderProductQuantity } from '../../redux/slides/orderSlide';
import { convertPrice } from '../../ultil';
import { useNavigate } from 'react-router-dom';

const OrderPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const order = useSelector((state) => state.order);
    const user = useSelector((state) => state.user);
    const [selectionType, setSelectionType] = useState('checkbox');
    const [isModalOpenOrder, setisModalOpenOrder] = useState(false)
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const increaseQuantity = (idProduct, currentAmount) => {
        dispatch(updateOrderProductQuantity({ idProduct, amount: currentAmount + 1 }));
    };

    const decreaseQuantity = (idProduct, currentAmount) => {
        if (currentAmount > 1) {
            dispatch(updateOrderProductQuantity({ idProduct, amount: currentAmount - 1 }));
        }
    };

    const handleDeleteProduct = (idProduct) => {
        dispatch(removeOrderProduct({ idProduct }));
    };

    const dataTable = order?.orderItems.map((item) => ({
        ...item,
        key: item.product, // Assuming each order item has a unique 'product' identifier
    }));
    console.log('dataTable', dataTable)
    const columns = [
        {
            title: `Tất cả ( ${dataTable.length} )`,
            dataIndex: 'image',
            render: (_, record) => (
                <div className='image_render'>
                    <Image width={50} height={50} src={record.image} />
                </div>
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
        },
        {
            title: 'Số lượng',
            dataIndex: 'amount',
            render: (_, record) => (
                <div className='btn_num-count'>
                    <MinusCircleOutlined onClick={() => decreaseQuantity(record.product, record.amount)} />
                    <button className='num_count'>{record.amount}</button>
                    <PlusCircleOutlined onClick={() => increaseQuantity(record.product, record.amount)} />
                </div>
            ),
        },
        {
            title: 'Thành tiền',
            dataIndex: 'price',
            render: (_, record) => (
                <div>
                    {record.price * record.amount}
                </div>
            ),
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (_, record) => (
                <div className='icon_colums'>
                    <DeleteOutlined onClick={() => handleDeleteProduct(record.product)} />
                </div>
            ),
        },
    ];

    const rowSelection = {
        selectedRowKeys,
        onChange: (newSelectedRowKeys) => {
            setSelectedRowKeys(newSelectedRowKeys);
        },
    };

    const handleDeleteAllOrder = () => {
        selectedRowKeys.forEach((idProduct) => {
            dispatch(removeOrderProduct({ idProduct }));
        });
        setSelectedRowKeys([]); // Reset selection after deletion
    };

    const selectedItems = dataTable.filter(item => selectedRowKeys.includes(item.key));
    console.log('selectedItems', selectedItems)
    const subtotal = selectedItems.reduce((sum, item) => sum + item.price * item.amount, 0);
    const tax = 1000; // Example static tax, replace with dynamic calculation if needed
    const shipping = 1000; // Example static shipping fee, replace with dynamic calculation if needed
    const total = subtotal + tax + shipping;
    // console.log('user order:', user)

    const handleCancelOrder = () => {
        setisModalOpenOrder(false);
    };
    const handleOkeOrder = () => {
        setisModalOpenOrder(false);
        navigate('/profile')
    }
    const handleBuyNow = () => {
        if (!user?.name || !user?.address || !user?.email || !user?.phone) {
            console.log('usser:', user)
            setisModalOpenOrder(true)
        } else {
            navigate('/payment', { state: { selectedItems } });
        }
    }
    const onChangeAddress = () => {
        setisModalOpenOrder(true)
    }
    return (
        <div className='order_page'>
            <div className="title_order-page">Thông tin mua hàng</div>
            <Row className='order_wrapper'>
                <Col className="col_item" span={17}>
                    {selectedRowKeys.length > 0 && (
                        <div className="remove_order">
                            <Button
                                type="primary"
                                danger
                                onClick={handleDeleteAllOrder}
                            >
                                Xoá sản phẩm
                            </Button>
                        </div>
                    )}
                    <div className="col_item-left">
                        <Table
                            rowSelection={{
                                type: selectionType,
                                ...rowSelection,
                            }}
                            columns={columns}
                            dataSource={dataTable}
                        />
                    </div>
                </Col>
                <Col className="col_item" span={6}>
                    <div className="col_right-top">
                        <span className='title_right-item'>Địa chỉ</span>
                        <div className="info_ship">
                            <span className='add_ship'>{user?.address}</span>
                            <span onClick={onChangeAddress} className='changeAdd'>Thay đổi</span>
                        </div>
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
                            <span className='price_sum'>{convertPrice(total)}
                            </span>
                        </div>
                        <p className='price_vat'>Đã bao gồm VAT (nếu có)</p>
                        <Divider />
                        <div className="btn_buy-order">
                            {selectedItems.length > 0 && (
                                <Button onClick={handleBuyNow} className="now_buy-order" type="primary">Mua hàng</Button>
                            )}

                        </div>
                        <Modal className='modal_delete' title="Thông báo mua hàng" open={isModalOpenOrder} onOk={handleOkeOrder} onCancel={handleCancelOrder}>
                            <div className='delele_text' >Vui lòng cập nhật thông tin !</div>
                            <div className='delele_ranger' >Ấn 'ok' để chuyển đến trang cập nhật !</div>
                        </Modal>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default OrderPage
