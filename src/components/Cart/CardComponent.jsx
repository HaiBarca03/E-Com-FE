import React, { useState } from 'react'
import './CardComponent.css'
import { Card, Flex, Rate } from 'antd';
const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

const CardComponent = () => {
    const [value, setValue] = useState(3);
    return (
        <div className='cart'>
            <Card
                hoverable
                style={{
                    width: 235,
                }}
                cover={<img className='img_product' alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
            >
                <div className='title_product'>
                    <span className='nameProduct'>Iphone</span>
                </div>
                <div className='rate_product'>
                    {/* <span>4.5</span> */}
                    <Flex gap="middle" vertical>
                        <Rate tooltips={desc} onChange={setValue} value={value} />
                        {/* {value ? <span>{desc[value - 1]}</span> : null} */}
                    </Flex>
                    <div className='buyed'>Da ban 1000</div>
                </div>
                <div className='price_product'>
                    <span className='price'>19.000.000 đ</span>
                    <span className='sale_product'>-24%</span>
                </div>
                <div className='des_product'>
                    <span className='des_item'>Free ship</span>
                    <span className='des_item'>Chính hãng</span>
                </div>
            </Card>
        </div>
    )
}

export default CardComponent
