import React from 'react'
import Slider from "react-slick";
import './Slider.css'
import slider_1 from '../../assets/slider_1.webp'
import slider_2 from '../../assets/slider_2.webp'
import slider_4 from '../../assets/slider_1.webp'
import slider_3 from '../../assets/slider_3.webp'

const SliderComponent = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 200,
        autoplay: true,
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    const listImage = ([slider_1, slider_2, slider_4, slider_3])
    return (
        <Slider className='slide_wrapper' {...settings}>
            {listImage.map((image, index) => {
                return (
                    <img className='slider' src={image} key={index} preview={false.toString()} width="100%" alt={`slide ${index + 1}`} />
                )
            })}
        </Slider>
    )
}

export default SliderComponent
