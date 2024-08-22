import React from 'react'
import './HomePage.css'
import TypeProducts from '../../components/TypeProducts/TypeProducts'
import SliderComponent from '../../components/Slider/Slider'
import CardComponent from '../../components/Cart/CardComponent'
import Navbar from '../../components/NavBar/Navbar'

const HomePage = () => {
    const arr = ['TV', 'Tủ lạnh', 'LapTop']
    return (
        <div className='homepage'>
            <div className='nav_home-page'>
                {arr.map((item) => {
                    return (
                        <TypeProducts name={item} key={item} />
                    )
                })}
            </div>
            <SliderComponent />
            <div className='product-item'>
                <CardComponent />
                <CardComponent />
                <CardComponent />
                <CardComponent />
                <CardComponent />
                <CardComponent />
                <CardComponent />
                <CardComponent />
                <CardComponent />
                <CardComponent />
            </div>
            <Navbar />
            <div className='more_product'>
                <button className='btn_more' >Xem Thêm</button>
            </div>
        </div>
    )
}

export default HomePage
