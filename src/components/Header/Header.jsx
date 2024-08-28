import React, { useEffect, useState } from 'react'
import { Badge, Col, message, Popover } from 'antd';
import './Header.css'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AudioOutlined, CaretDownOutlined, GithubOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { WrapperHeader } from './style';
import Search from 'antd/es/input/Search';
import { logoutUser } from '../../userService/UserService';
import { useDispatch } from 'react-redux'
import { resetUser } from '../../redux/slides/userSlide'
import { searchProduct } from '../../redux/slides/productSlide';
import logo_shop from '../../assets/l.png';

const suffix = (
    <AudioOutlined
        style={{
            fontSize: 16,
            color: '#1677ff',
        }}
    />
);

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const order = useSelector((state) => state.order)
    const [userName, setUserName] = useState('')
    const [userAvatar, setUserAvatar] = useState('')

    const onSearch = (value) => {
        const trimmedValue = value.trim();
        if (trimmedValue) {
            dispatch(searchProduct(trimmedValue));
        } else {
            dispatch(searchProduct('')); // Reset search để lấy tất cả sản phẩm
        }
    }

    const handleLogin = () => {
        navigate('/sign-in')
    }
    const handleHome = () => {
        navigate('/')
    }
    const handleProfile = () => {
        navigate('/profile')
    }
    const handleAdmin = () => {
        navigate('/admin')
    }
    const handleOrder = () => {
        navigate('/order')
    }
    const handleMyOrder = () => {
        navigate(`/my-order/${user.id}`)
    }
    const handleLogout = async () => {
        await logoutUser()
        dispatch(resetUser())
        navigate('/sign-in')
        message.success('Đăng xuất thành công!', 3);
        localStorage.setItem("access_token", '');
    }

    useEffect(() => {
        setUserAvatar(user?.avatar)
        setUserName(user?.name)
    }, [user?.name, user?.avatar])

    const content = (
        <div>
            <p onClick={handleProfile} className='dropDownMenu' >Profile</p>
            <p onClick={handleLogout} className='dropDownMenu' >LogOut</p>
            <p onClick={handleMyOrder} className='dropDownMenu' >Đơn hàng của tôi</p>
            {user?.isAdmin === true ? (
                <p onClick={handleAdmin} className='dropDownMenu' >Admin manager</p>
            ) : (<div></div>)}
        </div>
    );

    return (
        <div>
            <WrapperHeader className="header-wrapper">
                <Col onClick={handleHome} span={6} style={{ cursor: 'pointer' }} className="header-item">
                    <img style={{ width: '70px', height: 'auto', color: '#fff' }} src={logo_shop} alt="logo" />
                    <span style={{ color: '#fff', fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }}>DucHai Shop</span>
                </Col>
                <Col span={12} className="header-search">
                    <Search
                        placeholder="input search text"
                        enterButton="Search"
                        size="large"
                        suffix={suffix}
                        onSearch={onSearch} // Sử dụng sự kiện onSearch
                    />
                </Col>
                <Col span={4} className="header-actions">
                    <div className="account-section">
                        {userAvatar ? (
                            <img className="img_avt" src={userAvatar} alt='avt' />
                        ) :
                            <GithubOutlined className="github-icon" />
                        }
                        {user?.access_token ?
                            (
                                <>
                                    <Popover placement="bottom" trigger="hover" content={content}>
                                        <div className="account-text">{userName || 'User'}</div>
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
                        <Badge count={order?.orderItems?.length} size='small'>
                            <ShoppingCartOutlined onClick={handleOrder} className="cart-icon" />
                        </Badge>
                    </div>
                </Col>
            </WrapperHeader>
        </div>
    )
}

export default Header
