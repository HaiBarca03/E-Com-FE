import React, { useEffect, useState } from 'react';
import './ReviewComponents.css';
import { Button, Divider, Input, message, Upload, Rate, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getBase64 } from '../../ultil';
import { useSelector } from 'react-redux';
import { addComment, getAllComments } from '../../userService/ReviewServices';
import { useMutationHooks } from '../../hooks/useMutationHook';

const ReviewComponents = ({ idProduct }) => {
    const [imageRv, setImageRv] = useState('');
    const [rating, setRating] = useState(0);
    const user = useSelector((state) => state.user);
    const [comments, setComments] = useState([]);
    // console.log('idProduct', idProduct)
    // console.log('user', user)

    const uploadImageReview = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setImageRv(file.preview);  // Sử dụng setImageRv để cập nhật hình ảnh
    }

    const mutation = useMutationHooks(
        data => addComment(data)
    );

    const [data, setData] = useState({
        comment: "",
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    }

    const onAddCmt = async () => {
        try {
            const response = await mutation.mutateAsync({
                user: user.id,  // Thêm ID người dùng từ Redux store
                idProduct,  // ID sản phẩm từ props
                comment: data.comment,
                image: imageRv,  // Hình ảnh đã tải lên
                rating,  // Giá trị đánh giá từ state rating
            });
            console.log('response', response)
            if (response.success) {
                message.success('Thêm đánh giá thành công!', 3);
                setData({ comment: "" });
                setImageRv('');
                setRating(0);  // Reset các state sau khi đánh giá thành công
            }
        } catch (error) {
            console.error('Thêm đánh giá lỗi:', error);
            message.error('Thêm đánh giá thất bại. Vui lòng thử lại sau.', 5);
        }
    }

    const fetchComments = async () => {
        try {
            const response = await getAllComments(idProduct);
            if (response.success) {
                setComments(response.reviews);
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };
    useEffect(() => {
        fetchComments();
    }, [idProduct]);
    console.log('comments', comments)

    return (
        <div className='review_product'>
            <div className="container_review">
                <h3>Đánh giá sản phẩm</h3>
                <div className="preview_product">
                    <div className="rating_product-p">
                        <p><span className='countRating'>4.8</span> / 5</p>
                        <Rate className='rate_product' allowHalf disabled defaultValue={4.8} />
                    </div>
                    <Divider />
                    <Row>
                        <Col className='col_left' span={10}>
                            <Row className="write_cmt">
                                <Col span={5} className="avatar_user">
                                    <img className='user_img' src={user?.avatar} alt="avt" />
                                </Col>
                                <Col span={18} className='add_cmt'>
                                    <p className='user_name'>{user?.name}</p>
                                    <Rate className='rate_product' onChange={(value) => setRating(value)} value={rating} />
                                    <Input.TextArea
                                        className='text_area-cmt'
                                        name='comment'
                                        onChange={onChangeHandler}
                                        value={data.comment}
                                        placeholder="Nhập bình luận của bạn"
                                    />
                                    <img src={imageRv} alt="ảnh feedback" className="img_feefback" />
                                    <div className="image_comment">
                                        <Upload maxCount={3} onChange={uploadImageReview}>
                                            <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
                                        </Upload>
                                    </div>
                                    <Button type="primary" onClick={onAddCmt}>Thêm bình luận</Button>
                                </Col>
                            </Row>
                            <Divider />
                        </Col>
                        <Col span={14}>
                            {comments.length > 0 ? (
                                comments.map((comment) => (
                                    <>
                                        <div key={comment._id} className="commnent_product">
                                            <div className="left_cmt">
                                                <img className='user_img' src={comment.user.avatar} alt="User Avatar" />
                                            </div>
                                            <div className="right_cmt">
                                                <p className='user_name'>{comment.user.name}</p>
                                                <div className='rating_user'>
                                                    <Rate className='rate_product' value={comment.rating} />
                                                </div>
                                                <div className='date_cmt'>{new Date(comment.createdAt).toLocaleDateString()}</div>
                                                <div className="wrapper_comment">
                                                    <div className="content_cmt">
                                                        {comment.image && <img className='img_feefback' src={comment.image} alt="Comment" />}
                                                        <p className='text_feedback'>{comment.comment}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <Divider />
                                    </>
                                ))
                            ) : (
                                <p>Không có bình luận nào cho sản phẩm này.</p>
                            )}
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
}

export default ReviewComponents;
