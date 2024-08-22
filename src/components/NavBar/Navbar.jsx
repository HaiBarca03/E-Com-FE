import React from 'react';
import './NavBar.css';
import { Checkbox, Rate } from 'antd';

const Navbar = () => {
    const onChange = () => { };

    const renderContent = (type, options) => {
        switch (type) {
            case 'text':
                return options.map((option, index) => (
                    <div key={index} className={`navbar-item navbar-item-text`}>{option}</div>
                ));
            case 'checkbox':
                return (
                    <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
                        {options.map((option) => (
                            <Checkbox key={option.value} className='navbar-item navbar-item-checkbox' value={option.value}>
                                {option.lable}
                            </Checkbox>
                        ))}
                    </Checkbox.Group>
                );
            case 'star':
                return options.map((option, index) => (
                    <div key={index} className="navbar-item navbar-item-star">
                        <Rate className='star_star' disabled defaultValue={parseInt(option)} />
                        <span className='text_star'>Từ {option} sao</span>
                    </div>
                ));
            case 'price':
                return options.map((option, index) => (
                    <div key={index} className={`navbar-item navbar-item-price`}>{option}</div>
                ));
            default:
                return null;
        }
    };

    return (
        <div className="navbar">
            <div className="navbar-label">Lable</div>
            <div className="navbar-filters">
                {renderContent('text', ['Tủ lạnh', 'TV', 'Máy giặt'])}
                {renderContent('checkbox', [
                    { value: 'a', lable: 'A' },
                    { value: 'b', lable: 'B' },
                ])}
                {renderContent('star', ['3', '4', '5'])}
                {renderContent('price', ['Từ 100.000đ', 'Từ 1.000.000đ', 'Từ 5.000.000đ'])}
            </div>
        </div>
    );
};

export default Navbar;
