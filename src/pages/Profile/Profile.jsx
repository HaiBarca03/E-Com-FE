import './Profile.css'
import React, { useEffect, useState } from 'react'
import { Input, Button, message, Upload } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { updateUser, getDetailUser } from '../../userService/UserService';
import { useMutationHooks } from '../../hooks/useMutationHook';
import { UploadOutlined } from '@ant-design/icons';
import { getBase64 } from '../../ultil';

const Profile = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user)
    const [email, setemail] = useState('')
    const [name, setname] = useState('')
    const [phone, setphone] = useState('')
    const [address, setaddress] = useState('')
    const [avatar, setavatar] = useState('')

    const mutation = useMutationHooks(
        async (data) => {
            const { id, access_token, ...rest } = data;
            return await updateUser(id, rest, access_token);
        },
        {
            onSuccess: async () => {
                message.success('Cập nhật thành công!', 3);
                // Gọi lại chi tiết người dùng để cập nhật lại dữ liệu
                if (user?.id) {
                    await handleDetailUser(user.id, user.access_token);
                }
            },
            onError: () => {
                message.error('Cập nhật thất bại, vui lòng thử lại.', 5);
            }
        }
    )
    const { data } = mutation
    console.log('data profile: ', data)

    useEffect(() => {
        setname(user?.name)
        setemail(user?.email)
        setphone(user?.phone)
        setaddress(user?.address)
        setavatar(user?.avatar)
    }, [user])

    const handleDetailUser = async (id, token) => {
        const res = await getDetailUser(id, token)
        dispatch(updateUser({ ...res?.data, access_token: token }))
    }

    const onChangeHandlerEmail = (event) => {
        setemail(event.target.value)
    }
    const onChangeHandlerName = (event) => {
        setname(event.target.value)
    }
    const onChangeHandlerPhone = (event) => {
        setphone(event.target.value)
    }
    const onChangeHandlerAddress = (event) => {
        setaddress(event.target.value)
    }
    const onChangeHandlerAvatar = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setavatar(file.preview)
    }
    const onChangeUpdate = async () => {
        if (user?.id) {
            await mutation.mutateAsync({
                id: user.id,
                name,
                email,
                phone,
                address,
                avatar,
                access_token: user?.access_token
            });
            console.log('update:', name, email, phone, address, avatar);
        } else {
            message.error('Access token not found, please try again.', 5);
        }
    };

    return (
        <div className='profile'>
            <h3 className='title_profile'>Thông tin người dùng</h3>
            <div className="list_item-user">
                <div className="item_user">
                    <div className='name_item'>Name</div>
                    <Input className='input_item' value={name} onChange={onChangeHandlerName} placeholder="abc@gmail.com" />
                    <Button onClick={onChangeUpdate} className='btn_item' type="primary" danger>
                        Cập nhật
                    </Button>
                </div>
                <div className="item_user">
                    <div className='name_item'>Email</div>
                    <Input className='input_item' value={email} onChange={onChangeHandlerEmail} placeholder="abc@gmail.com" />
                    <Button onClick={onChangeUpdate} className='btn_item' type="primary" danger>
                        Cập nhật
                    </Button>
                </div>
                <div className="item_user">
                    <div className='name_item'>Phone</div>
                    <Input className='input_item' value={phone} onChange={onChangeHandlerPhone} placeholder="abc@gmail.com" />
                    <Button onClick={onChangeUpdate} className='btn_item' type="primary" danger>
                        Cập nhật
                    </Button>
                </div>
                <div className="item_user">
                    <div className='name_item'>Address</div>
                    <Input className='input_item' value={address} onChange={onChangeHandlerAddress} placeholder="abc@gmail.com" />
                    <Button onClick={onChangeUpdate} className='btn_item' type="primary" danger>
                        Cập nhật
                    </Button>
                </div>
                <div className="item_user">
                    <div className='name_item'>Avatar</div>
                    <Upload maxCount={1} onChange={onChangeHandlerAvatar}>
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                    <img src={avatar} alt="avatar" className="img_avt" />
                    {/* <Input className='input_item' value={avatar} onChange={onChangeHandlerAvatar} placeholder="abc@gmail.com" /> */}
                    <Button onClick={onChangeUpdate} className='btn_item' type="primary" danger>
                        Cập nhật
                    </Button>
                </div>
            </div>

            {/* <div className="list_item-user">
                {[
                    { label: 'Name', value: name, setter: setname },
                    { label: 'Email', value: email, setter: setemail },
                    { label: 'Phone', value: phone, setter: setphone },
                    { label: 'Address', value: address, setter: setaddress },
                    { label: 'Avatar', value: avatar, setter: setavatar },
                ].map((item, index) => (
                    <div key={index} className="item_user">
                        <div className='name_item'>{item.label}</div>
                        <Input className='input_item' value={item.value} onChange={(e) => item.setter(e.target.value)} placeholder={item.label} />
                        <Button onClick={onChangeUpdate} className='btn_item' type="primary" danger>
                            Cập nhật
                        </Button>
                    </div>
                ))}
            </div> */}
        </div>
    )
}

export default Profile
