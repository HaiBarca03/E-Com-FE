import React, { useEffect, useRef, useState } from 'react'
import { Button, Form, Input, message, Modal, Space, Upload } from 'antd'
import TableCpn from '../TableCpn/TableCpn'
import { getBase64 } from '../../ultil'
import { useMutationHooks } from '../../hooks/useMutationHook'
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined, UploadOutlined } from '@ant-design/icons'
import { getAllUser, deleteUser, deleteManyUser } from '../../userService/UserService'
import { useQuery } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import Highlighter from 'react-highlight-words';
import './AdminUser.css'
import Loading from '../Loading/Loading'

const AdminUser = () => {

    const [form] = Form.useForm();
    const [isModalOpenDelete, setisModalOpenDelete] = useState(false)
    const [rowSelected, setRowSelected] = useState('')
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

    const renderAction = () => {
        return (
            <div className='icon_colums'>
                <DeleteOutlined onClick={handleDeleteProduct} />
                {/* <EditOutlined onClick={handleDetailProduct} /> */}
            </div>
        )
    }
    // mutation

    const mutationDelete = useMutationHooks(
        async (data) => {
            const { id, access_token } = data;
            return await deleteUser(id, access_token);
        },
        {
            onSuccess: async () => {
                message.success('Delete thành công!', 3);
                console.log('message.success', message.success)
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
            return await deleteManyUser(ids, access_token);
        },
        {
            onSuccess: async () => {
                message.success('Delete thành công!', 3);
                console.log('message.success', message.success)
            },
            onError: (error) => {
                console.error('Error during update:', error);
                message.error('Cập nhật thất bại, vui lòng thử lại.', 5);
            },
        }
    );

    // delete product
    const handleDeleteProduct = () => {
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
    const getListUser = async () => {
        const res = await getAllUser()
        // console.log('res product all: ', res)
        return res
    }
    const { isLoading, data: users } = useQuery({
        queryKey: ['users'],
        queryFn: getListUser,
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
            // render: (text) => <a>{text}</a>,
            // sorter: (a, b) => a.name.length - b.name.length,
            // ...getColumnSearchProps('name'),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            // sorter: (a, b) => a.type - b.type,
            // ...getColumnSearchProps('type'),
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            // sorter: (a, b) => a.price - b.price,
            // ...getColumnSearchProps('price'),
        },
        {
            title: 'Address',
            dataIndex: 'address',
            // sorter: (a, b) => a.rating - b.rating,
            // filters: [
            //     {
            //         text: '5*',
            //         value: '=5',
            //     },
            //     {
            //         text: '>= 4*',
            //         value: '>=4',
            //     },
            //     {
            //         text: '>= 3*',
            //         value: '>=3',
            //     },
            //     {
            //         text: '>= 2*',
            //         value: '>=2',
            //     },
            //     {
            //         text: '>= 1*',
            //         value: '>=1',
            //     },
            // ],
            // onFilter: (value, record) => {
            //     if (value === '>=4') {
            //         return Number(record.rating) >= 4;
            //     } else if (value === '>=3') {
            //         return Number(record.rating) >= 3;
            //     } else if (value === '>=2') {
            //         return Number(record.rating) >= 2;
            //     } else if (value === '>=1') {
            //         return Number(record.rating) >= 1;
            //     } else if (value === '=5') {
            //         return Number(record.rating) === 5; 
            //     }
            // }
        },
        {
            title: 'Admin',
            dataIndex: 'isAdmin',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: renderAction
        },
    ];

    const dataTable = users?.data.length && users?.data?.map((user) => {
        return { ...user, key: user._id, isAdmin: user.isAdmin ? 'Admin' : 'User' }
    })

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

    const onDeleteUserMany = async (ids) => {
        console.log('_id: ', { ids })
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

    return (
        <div className='admin_user'>
            <div className='title_admin'>Users manager</div>
            <div className='table_user'>
                <Loading isLoading={isLoading}>
                    <TableCpn onDeleteUserMany={onDeleteUserMany} data={dataTable} columns={columns} onRow={(record, rowIndex) => {
                        return {
                            onClick: (event) => {
                                setRowSelected(record._id)
                            },
                        };
                    }} />
                </Loading>
            </div>
            <Modal className='modal_delete' title="DELETE PRODUCT" open={isModalOpenDelete} onOk={handleOkeDelete} onCancel={handleCancelDelete}>
                <div className='delele_text' >Bạn có chắc chắn muốn xoá sản phẩm này ???</div>
                <div className='delele_ranger' >Xoá thì không thể khôi phục !!!</div>
            </Modal>
        </div>
    )
}

export default AdminUser
