import React from 'react'
import './TypeProduct.css'
import { useNavigate } from 'react-router-dom'

const TypeProducts = ({ name }) => {
    const navigate = useNavigate()
    const handleNaviType = (type) => {
        navigate(`product/${type.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ /g, '_')}`, { state: type });
    }
    return (
        <div onClick={() => handleNaviType(name)} className='type-products'>
            {name}
        </div>
    )
}

export default TypeProducts
