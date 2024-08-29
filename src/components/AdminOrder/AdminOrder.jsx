import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Space } from 'antd';
import TableCpn from '../TableCpn/TableCpn';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import './AdminOrder.css';
import Loading from '../Loading/Loading';
import { allOrder } from '../../userService/OrderServices';

const OrderAdmin = () => {
    const [form] = Form.useForm();
    const user = useSelector((state) => state.user);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    // Fetch all orders
    const getListOrders = async () => {
        const res = await allOrder();
        return res;
    };

    const { isLoading, data: orders } = useQuery({
        queryKey: ['orders'],
        queryFn: getListOrders,
    });

    // Search functionality
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => clearFilters && handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        Close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    // Define table columns
    const columns = [
        {
            title: 'Name user',
            dataIndex: 'fullName',
            key: 'fullName',
            sorter: (a, b) => a.fullName - b.fullName,
            ...getColumnSearchProps('fullName'),
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Product Name',
            dataIndex: 'productName',
            key: 'productName',
            sorter: (a, b) => a.productName - b.productName,
            ...getColumnSearchProps('productName'),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            sorter: (a, b) => a.price - b.price,
            ...getColumnSearchProps('price'),
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            sorter: (a, b) => a.amount - b.amount,
            ...getColumnSearchProps('amount'),
        },
        {
            title: 'Total Price',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            sorter: (a, b) => a.totalPrice - b.totalPrice,
            ...getColumnSearchProps('totalPrice'),
        },
        {
            title: 'Order Date',
            dataIndex: 'orderDate',
            key: 'orderDate',
        },
        {
            title: 'Paid',
            dataIndex: 'isPaid',
            key: 'isPaid',
            render: (isPaid) => (isPaid ? 'Ok' : 'Chưa'),
            sorter: (a, b) => a.isPaid - b.isPaid,
            filters: [
                { text: 'Ok', value: true },
                { text: 'Chưa', value: false },
            ],
            onFilter: (value, record) => record.isPaid === value,
        },
        {
            title: 'Delivered',
            dataIndex: 'isDelivered',
            key: 'isDelivered',
            render: (isDelivered) => (isDelivered ? 'Ok' : 'Chưa'),
            sorter: (a, b) => a.isDelivered - b.isDelivered,
            filters: [
                { text: 'Ok', value: true },
                { text: 'Chưa', value: false },
            ],
            onFilter: (value, record) => record.isDelivered === value,
        },
        {
            title: 'Payment Method',
            dataIndex: 'paymentMethod',
            key: 'paymentMethod',
            sorter: (a, b) => a.paymentMethod - b.paymentMethod,
            ...getColumnSearchProps('paymentMethod'),
        },
    ];

    const dataTable = orders?.data?.map((order) => ({
        key: order._id,
        fullName: order.shippingAddress.fullName,
        address: order.shippingAddress.address,
        phone: order.shippingAddress.phone,
        productName: order.orderItems[0].name,
        price: order.orderItems[0].price,
        amount: order.orderItems[0].amount,
        totalPrice: order.totalPrice,
        orderDate: new Date(order.createdAt).toLocaleString(),
        isPaid: order.isPaid,
        isDelivered: order.isDelivered,
        paymentMethod: order.paymentMethod,
    }));

    return (
        <div className='admin_order'>
            <div className='title_admin'>Orders Manager</div>
            <div className='table_order'>
                <Loading isLoading={isLoading}>
                    <TableCpn data={dataTable} columns={columns} />
                </Loading>
            </div>
        </div>
    );
};

export default OrderAdmin;
