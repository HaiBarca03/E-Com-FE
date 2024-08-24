import { Col, Input, Row, message } from 'antd'
import React, { useEffect, useState } from 'react'
import './SignInPage.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import imgSign from '../../assets/img_sign.png'
import { FacebookFilled, GoogleCircleFilled } from '@ant-design/icons'
import { loginUser, getDetailUser } from '../../userService/UserService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import { jwtDecode } from "jwt-decode";
import { updateUser } from '../../redux/slides/userSlide'

const SignInPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleSignUp = () => {
        navigate('/sign-up')
    }
    const mutation = useMutationHooks(
        data => loginUser(data)
    )
    // console.log('mutation', mutation)
    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data => ({ ...data, [name]: value }))
        // console.log('name', name)
        // console.log('value', value)
    }

    const handleDetailUser = async (id, token) => {
        const res = await getDetailUser(id, token)
        dispatch(updateUser({ ...res?.data, access_token: token }))
    }

    const onLogin = async () => {
        try {
            const response = await mutation.mutateAsync({
                email: data.email,
                password: data.password,
            });

            console.log('Login response:', response);

            const accessToken = response?.access_token;
            if (accessToken) {
                localStorage.setItem("access_token", accessToken);
                const decoded = jwtDecode(accessToken);
                if (decoded?.id) {
                    handleDetailUser(decoded?.id, accessToken)
                }
                console.log('decoded: ', decoded)
                message.success('Đăng nhập thành công!', 3);
                navigate('/');
            } else {
                message.error('Tài khoản hoặc mật khẩu ko đúng, vui lòng kiểm tra lại.', 5);
            }
        } catch (error) {
            console.error('Login error:', error);
            message.error('Đăng nhập thất bại. Vui lòng kiểm tra lại email/mật khẩu.', 5);
        }
    };

    useEffect(() => {
        // console.log(data)
    }, [data])

    return (
        <div className='wrapper_sign'>
            <div className='signin'>
                <Row>
                    <Col span={14}>
                        <div className="left_item-sign">
                            <h1 className='title_sign'>Xin chào !!!</h1>
                            <h2 className='title_sign-sec'>Đăng nhập hoặc tạo tài khoản</h2>
                            <div className='sign_item'>
                                <Input name='email' onChange={onChangeHandler} value={data.name} placeholder="Phone number or email" />
                                <Input type='password' name='password' onChange={onChangeHandler} value={data.name} placeholder="Password" />
                            </div>
                            {/* <Loading isLoading={isLoading}> */}
                            <div className='sign_item'>
                                <button onClick={onLogin} className='btn_login' >Đăng nhập</button>
                            </div>
                            {/* </Loading> */}
                            <span className='login_def' >Quên mật khẩu ?</span>
                            <p className='login_def1' >Chưa có tài khoản ? <span onClick={handleSignUp} className='login_def'>Tạo tài khoản</span></p>
                            <div className="login_with">
                                <h3>OR</h3>
                                <div className="net_def">
                                    <GoogleCircleFilled />
                                    <FacebookFilled />
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col span={10}>
                        <div className="right_item-sign">
                            <img className='img_sign' src={imgSign} alt="" />
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default SignInPage
