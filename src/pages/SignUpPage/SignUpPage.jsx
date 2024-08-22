import React, { useEffect, useState } from 'react'
import '../SignInPage/SignInPage.css'
import { useNavigate } from 'react-router-dom'
import { Col, Input, Row, message } from 'antd'
import imgSign from '../../assets/img_sign.png'
import { useMutationHooks } from '../../hooks/useMutationHook'
import { registerUser } from '../../userService/UserService'

const SignUpPage = () => {

    const navigate = useNavigate()
    const handleSignIn = () => {
        navigate('/sign-in')
    }

    const mutation = useMutationHooks(
        data => registerUser(data)
    )
    const [data, setData] = useState({
        // name: "",
        email: "",
        password: "",
        comfirmPassword: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data => ({ ...data, [name]: value }))
        console.log('name', name)
        console.log('value', value)
    }

    const onRegister = async () => {
        try {
            const response = await mutation.mutateAsync({
                email: data.email,
                password: data.password,
                comfirmPassword: data.comfirmPassword
            });
            if (response.success) {
                console.log('Login successful:', response);
                message.success('Đăng ký thành công!', 3); // Success message with duration (seconds)
                navigate('/sign-in'); // Replace with your desired redirect path
            }
        } catch (error) {
            console.error('Login error:', error);
            message.error('Đăng ký thất bại. Vui lòng kiểm tra lại email/mật khẩu.', 5); // Error message with duration (seconds)
        }
    }
    useEffect(() => {
        console.log(data)
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
                                {/* <Input name='name' onChange={onChangeHandler} value={data.name} placeholder="User name" /> */}
                                <Input name='email' onChange={onChangeHandler} value={data.name} placeholder="Phone number or email" />
                                <Input type='password' name='password' onChange={onChangeHandler} value={data.name} placeholder="Password" />
                                <Input type='password' name='comfirmPassword' onChange={onChangeHandler} value={data.name} placeholder="Confrim password" />
                            </div>
                            <div className='sign_item'>
                                <button onClick={onRegister} className='btn_login' >Tạo tài khoản</button>
                            </div>
                            <span className='login_def' >Quên mật khẩu ?</span>
                            <p className='login_def1' ><span onClick={handleSignIn} className='login_def'>Đăng nhập ?</span></p>
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

export default SignUpPage

