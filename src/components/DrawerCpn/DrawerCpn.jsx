import { Drawer } from 'antd'
import './DrawerCpn.css'
import React, { Children } from 'react'

const DrawerCpn = ({ title = 'Drawer', form, placement = 'right', children, isOpen = false, ...rests }) => {
    return (
        <div className='drawer_cpn'>
            <Drawer title={title} placement={placement} open={isOpen} {...rests}>
                {children}
            </Drawer>
        </div>
    )
}

export default DrawerCpn
