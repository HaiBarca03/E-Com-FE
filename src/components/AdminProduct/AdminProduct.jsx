import React, { useEffect, useRef, useState } from 'react'
import { Button, Form, Input, message, Modal, Space, Upload } from 'antd'
import './AdminProduct.css'
import TableCpn from '../TableCpn/TableCpn'
import { getBase64 } from '../../ultil'
import { useMutationHooks } from '../../hooks/useMutationHook'
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined, UploadOutlined } from '@ant-design/icons'
import { createProduct, deleteManyProduct, deleteProduct, getAllProduct, getDetailProduct, updateProduct } from '../../userService/ProductService';
import { useQuery } from '@tanstack/react-query'
import DrawerCpn from '../DrawerCpn/DrawerCpn'
import { useDispatch, useSelector } from 'react-redux'
import Highlighter from 'react-highlight-words';
import Loading from '../Loading/Loading'

const AdminProduct = () => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isModalOpenDelete, setisModalOpenDelete] = useState(false)
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user)
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
    const [stateProduct, setStateProduct] = useState({
        name: '',
        image: '',
        type: '',
        price: '',
        countInStock: '',
        rating: '',
        description: '',
        selled: '',
    })

    const [stateProductDetail, setStateProductDetail] = useState({
        name: '',
        image: '',
        type: '',
        price: '',
        countInStock: '',
        rating: '',
        description: '',
        selled: '',
    })
    const renderAction = () => {
        return (
            <div className='icon_colums'>
                <DeleteOutlined onClick={handleDeleteProduct} />
                <EditOutlined onClick={handleDetailProduct} />
            </div>
        )
    }
    // mutation
    const mutation = useMutationHooks(
        data => createProduct(data)
    )
    const mutationUpdate = useMutationHooks(
        async (data) => {
            const { id, access_token, ...rest } = data;
            return await updateProduct(id, rest, access_token);
        },
        {
            onSuccess: async () => {
                message.success('Cập nhật thành công!', 3);
                // fetchGetDetailProduct()
                if (user?.id && user?.access_token) {
                    await handleDetailProductUpdate(user.id, user.access_token);
                }
                dispatch({ type: 'UPDATE_PRODUCT_LIST', payload: data });
            },
            onError: (error) => {
                console.error('Error during update:', error);
                message.error('Cập nhật thất bại, vui lòng thử lại.', 5);
            },
        }
    );
    const mutationDelete = useMutationHooks(
        async (data) => {
            const { id, access_token } = data;
            return await deleteProduct(id, access_token);
        },
        {
            onSuccess: async () => {
                message.success('Delete thành công!', 3);
                console.log('message.success', message.success)
                fetchGetDetailProduct()
            },
            onError: (error) => {
                console.error('Error during update:', error);
                message.error('Cập nhật thất bại, vui lòng thử lại.', 5);
            },
        }
    );

    const mutationDeleteMany = useMutationHooks(
        async (data) => {
            const { access_token, ...ids } = data;
            return await deleteManyProduct(ids, access_token);
        },
        {
            onSuccess: async () => {
                message.success('Delete thành công!', 3);
                console.log('message.success', message.success)
                fetchGetDetailProduct()
            },
            onError: (error) => {
                console.error('Error during update:', error);
                message.error('Cập nhật thất bại, vui lòng thử lại.', 5);
            },
        }
    );


    const handleDetailProductUpdate = async (id, token) => {
        try {
            // const res = await getDetailProduct(id, token);
            fetchGetDetailProduct(); // You might not need this line if the data is already updated
        } catch (error) {
            console.error('Error fetching product details:', error);
            message.error('Không thể tải lại chi tiết sản phẩm, vui lòng thử lại sau.', 5);
        }
    };
    // detail product
    const fetchGetDetailProduct = async () => {
        const res = await getDetailProduct(rowSelected)
        if (res?.data) {
            setStateProductDetail({
                name: res.data.name,
                image: res.data.image,
                type: res.data.type,
                price: res.data.price,
                countInStock: res.data.countInStock,
                rating: res.data.rating,
                description: res.data.description,
                selled: res.data.selled,
            });
        }
        return res;
    }
    console.log('product detail res:', stateProductDetail)

    useEffect(() => {
        if (stateProductDetail.name) {
            form.setFieldValue('name', stateProductDetail.name);
            form.setFieldValue('image', stateProductDetail.image);
            form.setFieldValue('type', stateProductDetail.type);
            form.setFieldValue('price', stateProductDetail.price);
            form.setFieldValue('countInStock', stateProductDetail.countInStock);
            form.setFieldValue('rating', stateProductDetail.rating);
            form.setFieldValue('description', stateProductDetail.description);
            form.setFieldValue('selled', stateProductDetail.selled);
        }
    }, [form, stateProductDetail])

    const handleOke = () => {
        onFinish()
        setIsModalOpen(false);
    }
    const handleCancel = () => {
        form.resetFields();
        setIsModalOpen(false);
    };

    const handleDetailProduct = () => {
        if (rowSelected) {
            fetchGetDetailProduct()
        }
        setIsOpenDrawer(true)
        console.log('rowSelected', rowSelected)
    }

    // delete product
    const handleDeleteProduct = () => {
        if (rowSelected) {
            fetchGetDetailProduct()
        }
        setisModalOpenDelete(true)
    }
    const handleCancelDelete = () => {
        setisModalOpenDelete(false);
    };
    const handleOkeDelete = () => {
        onDeleteProduct()
        setisModalOpenDelete(false);
    }

    // get product
    const getProduct = async () => {
        const res = await getAllProduct()
        // console.log('res product all: ', res)
        return res
    }
    const { isLoading, data: products } = useQuery({
        queryKey: ['products'],
        queryFn: getProduct,
    })

    // search 
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
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
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text) => <a>{text}</a>,
            sorter: (a, b) => a.name.length - b.name.length,
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Type',
            dataIndex: 'type',
            sorter: (a, b) => a.type - b.type,
            ...getColumnSearchProps('type'),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            sorter: (a, b) => a.price - b.price,
            ...getColumnSearchProps('price'),
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            sorter: (a, b) => a.rating - b.rating,
            filters: [
                {
                    text: '5*',
                    value: '=5',
                },
                {
                    text: '>= 4*',
                    value: '>=4',
                },
                {
                    text: '>= 3*',
                    value: '>=3',
                },
                {
                    text: '>= 2*',
                    value: '>=2',
                },
                {
                    text: '>= 1*',
                    value: '>=1',
                },
            ],
            onFilter: (value, record) => {
                if (value === '>=4') {
                    return Number(record.rating) >= 4;
                } else if (value === '>=3') {
                    return Number(record.rating) >= 3;
                } else if (value === '>=2') {
                    return Number(record.rating) >= 2;
                } else if (value === '>=1') {
                    return Number(record.rating) >= 1;
                } else if (value === '=5') {
                    return Number(record.rating) === 5;  // Corrected to use === for comparison
                }
            }
        },
        {
            title: 'Count In Stock',
            dataIndex: 'countInStock',
            sorter: (a, b) => a.countInStock - b.countInStock,
            ...getColumnSearchProps('countInStock'),
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: renderAction
        },
    ];
    const dataTable = products?.data.length && products?.data?.map((product) => {
        return { ...product, key: product._id }
    })

    const onFinish = async () => {
        try {
            const response = await mutation.mutateAsync({
                name: stateProduct.name,
                image: stateProduct.image,
                type: stateProduct.type,
                price: stateProduct.price,
                countInStock: stateProduct.countInStock,
                rating: stateProduct.rating,
                description: stateProduct.description,
                selled: stateProduct.selled
            })
            if (response.success) {
                message.success('Cập nhật thành công!', 3);
            }
        } catch (error) {
            message.error('Cập nhật thất bại, vui lòng thử lại.', 5);
        }
    }
    const handleOnChange = (e) => {
        setStateProduct({
            ...stateProduct,
            [e.target.name]: e.target.value
        })
    }
    const onChangeHandlerImage = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateProduct({
            ...stateProduct,
            image: file.preview
        })
    }

    // detail update product
    console.log('usser: ', user)
    const onUpdateProduct = async () => {
        if (user?.access_token) {
            try {
                await mutationUpdate.mutateAsync({
                    id: rowSelected, // Use the selected product's ID for the update
                    ...stateProductDetail,
                    access_token: user?.access_token,
                });
                setIsOpenDrawer(false); // Close the drawer after update
            } catch (error) {
                console.error('Error updating product:', error);
            }
        } else {
            message.error('Access token not found, please try again.', 5);
        }
    };
    const handleOnChangeDetail = (e) => {
        setStateProductDetail({
            ...stateProductDetail,
            [e.target.name]: e.target.value
        })
        console.log('e.target.name', e.target.name, e.target.value)
    }
    const onChangeHandlerImageDetail = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateProductDetail({
            ...stateProductDetail,
            image: file.preview
        })
    }

    // delete product
    const onDeleteProduct = async () => {
        if (user?.access_token) {
            try {
                await mutationDelete.mutateAsync({
                    id: rowSelected,
                    access_token: user?.access_token,
                });
                setisModalOpenDelete(false);
            } catch (error) {
                console.error('Error delete product:', error);
            }
        } else {
            message.error('Access token not found, please try again.', 5);
        }
    };

    const onDeleteProductMany = async (ids) => {
        if (user?.access_token) {
            try {
                await mutationDeleteMany.mutateAsync({
                    ids: ids,
                    access_token: user?.access_token,
                });
                setisModalOpenDelete(false);
            } catch (error) {
                console.error('Error delete product:', error);
            }
        } else {
            message.error('Access token not found, please try again.', 5);
        }
    };

    useEffect(() => {
        if (rowSelected) {
            fetchGetDetailProduct(rowSelected)
        }
    }, [rowSelected])

    const { data } = mutation
    console.log('data profile: ', data)
    return (
        <div className='admin_user'>
            <div className='title_admin'>Products manager</div>
            <Button onClick={() => setIsModalOpen(true)} className='btn_icon'>
                <PlusOutlined className='btn_icon_plus' />
            </Button>
            <div className='table_user'>
                <TableCpn onDeleteProductMany={onDeleteProductMany} data={dataTable} columns={columns} onRow={(record, rowIndex) => {
                    return {
                        onClick: (event) => {
                            setRowSelected(record._id)
                        },
                    };
                }} />
            </div>
            <Modal title="ADD PRODUCT" open={isModalOpen} onOk={handleOke} onCancel={handleCancel}>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your name!',
                            },
                        ]}
                    >
                        <Input value={stateProduct.name} onChange={handleOnChange} name='name' />
                    </Form.Item>

                    <Form.Item
                        label="type"
                        name="type"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input value={stateProduct.type} onChange={handleOnChange} name='type' />
                    </Form.Item>

                    <Form.Item
                        label="price"
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input value={stateProduct.price} onChange={handleOnChange} name='price' />
                    </Form.Item>

                    <Form.Item
                        label="countInStock"
                        name="countInStock"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input value={stateProduct.countInStock} onChange={handleOnChange} name='countInStock' />
                    </Form.Item>

                    <Form.Item
                        label="rating"
                        name="rating"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input value={stateProduct.rating} onChange={handleOnChange} name='rating' />
                    </Form.Item>

                    <Form.Item
                        label="description"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input value={stateProduct.description} onChange={handleOnChange} name='description' />
                    </Form.Item>

                    <Form.Item
                        label="selled"
                        name="selled"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your selled!',
                            },
                        ]}
                    >
                        <Input value={stateProduct.selled} onChange={handleOnChange} name='selled' />
                    </Form.Item>

                    <Form.Item
                        label="image"
                        name="image"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Upload className='form_upload_image' maxCount={1} onChange={onChangeHandlerImage}>
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                            {stateProduct?.image && (
                                <img src={stateProduct.image} alt="image" className="upload_image" />
                            )}
                            {console.log('stateProduct.image', stateProduct.image)}
                        </Upload>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Loading isLoading={isLoading}>
                <DrawerCpn title='Product detail' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)}>
                    <Form
                        form={form}
                        name="Edit product"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        style={{
                            maxWidth: 600,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onUpdateProduct}
                        // onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your name!',
                                },
                            ]}
                        >
                            <Input value={stateProductDetail.name} onChange={handleOnChangeDetail} name='name' />
                        </Form.Item>

                        <Form.Item
                            label="type"
                            name="type"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input value={stateProductDetail.type} onChange={handleOnChangeDetail} name='type' />
                        </Form.Item>

                        <Form.Item
                            label="price"
                            name="price"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input value={stateProductDetail.price} onChange={handleOnChangeDetail} name='price' />
                        </Form.Item>

                        <Form.Item
                            label="countInStock"
                            name="countInStock"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input value={stateProductDetail.countInStock} onChange={handleOnChangeDetail} name='countInStock' />
                        </Form.Item>

                        <Form.Item
                            label="rating"
                            name="rating"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input value={stateProductDetail.rating} onChange={handleOnChangeDetail} name='rating' />
                        </Form.Item>

                        <Form.Item
                            label="description"
                            name="description"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input value={stateProductDetail.description} onChange={handleOnChangeDetail} name='description' />
                        </Form.Item>

                        <Form.Item
                            label="selled"
                            name="selled"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input value={stateProductDetail.selled} onChange={handleOnChangeDetail} name='selled' />
                        </Form.Item>

                        <Form.Item
                            label="image"
                            name="image"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Upload className='form_upload_image' maxCount={1} onChange={onChangeHandlerImageDetail}>
                                <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                {stateProductDetail?.image && (
                                    <img src={stateProductDetail.image} alt="image" className="upload_image" />
                                )}
                            </Upload>
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </DrawerCpn>
            </Loading>
            <Modal className='modal_delete' title="DELETE PRODUCT" open={isModalOpenDelete} onOk={handleOkeDelete} onCancel={handleCancelDelete}>
                <div className='delele_text' >Bạn có chắc chắn muốn xoá sản phẩm này ???</div>
                <div className='delele_ranger' >Xoá thì không thể khôi phục !!!</div>
            </Modal>
        </div>
    )
}

export default AdminProduct
