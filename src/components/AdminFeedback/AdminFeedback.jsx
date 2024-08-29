import React from 'react';
import { Table } from 'antd';
import { useQuery } from '@tanstack/react-query';
import Loading from '../Loading/Loading';
import { getAllReview } from '../../userService/ReviewServices';
import { allOrder } from '../../userService/OrderServices';

const AdminFeedback = () => {
    // Fetch all feedbacks
    const { isLoading: isFeedbackLoading, data: feedbacks } = useQuery({
        queryKey: ['feedbacks'],
        queryFn: getAllReview,
    });

    // Fetch all orders
    const { isLoading: isOrderLoading, data: orders } = useQuery({
        queryKey: ['orders'],
        queryFn: allOrder,
    });
    console.log('orders', orders)

    if (isFeedbackLoading || isOrderLoading) {
        return <Loading isLoading={true} />;
    }

    // Process data to calculate required values
    const productStats = orders?.data?.reduce((acc, order) => {
        order.orderItems.forEach(({ product, name, amount }) => {
            if (!acc[product]) {
                acc[product] = {
                    productId: product,
                    productName: name,
                    numBought: 0,
                    numComments: 0,
                    numUsers: new Set(),
                    numUsersCommented: 0,
                    numUsersNotCommented: 0,
                    totalRating: 0,
                };
            }
            acc[product].numBought += amount;
        });
        return acc;
    }, {});

    feedbacks?.data?.forEach(({ product, rating, user, comment }) => {
        if (productStats[product]) {
            productStats[product].numComments++;
            productStats[product].totalRating += rating;
            productStats[product].numUsers.add(user);

            if (comment) {
                productStats[product].numUsersCommented++;
            } else {
                productStats[product].numUsersNotCommented++;
            }
        }
    });

    const dataTable = Object.keys(productStats).map(product => {
        const stats = productStats[product];
        return {
            key: product,
            productId: stats.productId,
            productName: stats.productName,
            numBought: stats.numBought,
            numComments: stats.numComments,
            avgRating: stats.numComments > 0 ? (stats.totalRating / stats.numComments).toFixed(2) : 'N/A',
            numUsers: stats.numUsers.size,
            numUsersCommented: stats.numUsersCommented,
            numUsersNotCommented: stats.numBought - stats.numUsersCommented,
        };
    });

    // Define table columns
    const columns = [
        {
            title: 'Product ID',
            dataIndex: 'productId',
            key: 'productId',
            sorter: (a, b) => a.productId.localeCompare(b.productId),
        },
        {
            title: 'Product Name',
            dataIndex: 'productName',
            key: 'productName',
            sorter: (a, b) => a.productName.localeCompare(b.productName),
        },
        {
            title: 'Number of Purchases',
            dataIndex: 'numBought',
            key: 'numBought',
            sorter: (a, b) => a.numBought - b.numBought,
        },
        {
            title: 'Number of Comments',
            dataIndex: 'numComments',
            key: 'numComments',
            sorter: (a, b) => a.numComments - b.numComments,
        },
        {
            title: 'Average Rating',
            dataIndex: 'avgRating',
            key: 'avgRating',
            sorter: (a, b) => parseFloat(a.avgRating) - parseFloat(b.avgRating),
        },
        {
            title: 'Total Users',
            dataIndex: 'numUsers',
            key: 'numUsers',
            sorter: (a, b) => a.numUsers - b.numUsers,
        },
        {
            title: 'Feedback',
            dataIndex: 'numUsersCommented',
            key: 'numUsersCommented',
            sorter: (a, b) => a.numUsersCommented - b.numUsersCommented,
        },
        {
            title: 'Not feedback',
            dataIndex: 'numUsersNotCommented',
            key: 'numUsersNotCommented',
            sorter: (a, b) => a.numUsersNotCommented - b.numUsersNotCommented,
        },
    ];

    return (
        <div className='admin_feedback'>
            <div className='title_admin'>Feedback Manager</div>
            <div className='table_feedback'>
                <Table dataSource={dataTable} columns={columns} />
            </div>
        </div>
    );
};

export default AdminFeedback;
