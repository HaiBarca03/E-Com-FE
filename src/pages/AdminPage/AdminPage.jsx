import { Menu } from 'antd'
import React, { useState } from 'react'
import { ProductOutlined, ShopOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import AdminUser from '../../components/AdminUser/AdminUser';
import AdminProduct from '../../components/AdminProduct/AdminProduct';

const items = [
    {
        key: 'nameShop',
        icon: <ShopOutlined />,
        label: 'BuyNow',
    },
    {
        key: 'nameAcc',
        icon: <UsergroupAddOutlined />,
        label: 'Admin',
    },
    {
        key: 'user',
        icon: <UsergroupAddOutlined />,
        label: 'Users',
        // children: [
        //     {
        //         key: '11',
        //         label: 'Option 1',
        //     },
        //     {
        //         key: '12',
        //         label: 'Option 2',
        //     },
        //     {
        //         key: '13',
        //         label: 'Option 3',
        //     },
        //     {
        //         key: '14',
        //         label: 'Option 4',
        //     },
        // ],
    },
    {
        key: 'product',
        icon: <ProductOutlined />,
        label: 'Products',
        // children: [
        //     {
        //         key: '21',
        //         label: 'Option 1',
        //     },
        //     {
        //         key: '22',
        //         label: 'Option 2',
        //     }
        // ]
    }
];
// const getLevelKeys = (items1) => {
//     const key = {};
//     const func = (items2, level = 1) => {
//         items2.forEach((item) => {
//             if (item.key) {
//                 key[item.key] = level;
//             }
//             if (item.children) {
//                 func(item.children, level + 1);
//             }
//         });
//     };
//     func(items1);
//     return key;
// };
// const levelKeys = getLevelKeys(items);

const AdminPage = () => {
    const renderPage = (key) => {
        switch (key) {
            case 'user':
                return (
                    <AdminUser />
                )
            case 'product':
                return (
                    <AdminProduct />
                )
        }
    }
    const [stateOpenKeys, setStateOpenKeys] = useState(['user']);
    const [KeySelected, setKeySelected] = useState('')
    const onOpenChange = (openKeys) => {
        const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);
        // open
        if (currentOpenKey !== undefined) {
            const repeatIndex = openKeys
                .filter((key) => key !== currentOpenKey)
            // .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
            setStateOpenKeys(
                openKeys
                    // remove repeat key
                    .filter((_, index) => index !== repeatIndex)
                // remove current level all child
                // .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
            );
        } else {
            // close
            setStateOpenKeys(openKeys);
        }
    };

    const handleOnClick = ({ key }) => {
        console.log('click: ', key)
        setKeySelected(key)
    }
    console.log('KeySelected: ', KeySelected)

    return (
        <div style={{ display: 'flex' }} className='admin_page'>
            <Menu
                mode="inline"
                defaultSelectedKeys={['231']}
                openKeys={stateOpenKeys}
                onOpenChange={onOpenChange}
                style={{
                    width: 256,
                }}
                items={items}
                onClick={handleOnClick}
            />
            <div style={{ flex: 1 }}>
                {renderPage(KeySelected)}
            </div>
        </div>
    )
}

export default AdminPage
