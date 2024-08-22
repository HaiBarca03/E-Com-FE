import React, { useMemo, useState } from 'react'
import { Badge, Button, Col, message, Popover } from 'antd';
import './Header.css'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AudioOutlined, CaretDownOutlined, GithubOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { WrapperHeader } from './style';
import Search from 'antd/es/input/Search';
import { logoutUser } from '../../userService/UserService';
import { useDispatch } from 'react-redux'
import { resetUser } from '../../redux/slides/userSlide'

const suffix = (
    <AudioOutlined
        style={{
            fontSize: 16,
            color: '#1677ff',
        }}
    />
);
const onSearch = (value, _e, info) => console.log(info?.source, value);

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    console.log('user:', user)

    const handleLogin = () => {
        navigate('/sign-in')
    }
    const handleHome = () => {
        navigate('/')
    }
    const handleLogout = async () => {
        await logoutUser()
        dispatch(resetUser())
        navigate('/sign-in')
        message.success('Đăng xuất thành công!', 3);
        localStorage.setItem("access_token", '');
    }
    const content = (
        <div>
            <p className='dropDownMenu' >Profile</p>
            <p onClick={handleLogout} className='dropDownMenu' >LogOut</p>
        </div>
    );
    return (
        <div>
            <WrapperHeader className="header-wrapper">
                <Col span={6} className="header-item">
                    <span onClick={handleHome} className="header-title">
                        BuyNow
                    </span>
                </Col>
                <Col span={12} className="header-search">
                    <Search
                        placeholder="input search text"
                        enterButton="Search"
                        size="large"
                        suffix={suffix}
                        onSearch={onSearch}
                    />
                </Col>
                <Col span={4} className="header-actions">
                    <div className="account-section">
                        <GithubOutlined className="github-icon" />
                        {user?.name ?
                            (
                                <>
                                    <Popover placement="bottom" trigger="hover" content={content}>
                                        <div className="account-text">{user.name}</div>
                                    </Popover>
                                </>
                            ) :
                            (<div onClick={handleLogin} className="account-info">
                                <span className="account-text">Đăng ký / Đăng nhập</span>
                                <div className="dropdown-section">
                                    <span className="dropdown-text">Tài khoản</span>
                                    <CaretDownOutlined className="caret-icon" />
                                </div>
                            </div>)
                        }
                    </div>
                </Col>
                <Col span={2}>
                    <div className="cart-section">
                        <Badge count={4} size='small'>
                            <ShoppingCartOutlined className="cart-icon" />
                        </Badge>
                    </div>
                </Col>
            </WrapperHeader>
        </div>

    )
}

export default Header
