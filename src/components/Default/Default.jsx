import React from 'react'
import Header from '../Header/Header'

const Default = ({ children }) => {
    return (
        <div>
            <Header />
            {children}
        </div>
    )
}

export default Default
