import React, { useEffect, useState } from 'react';
import './TypeProductPage.css';
import Navbar from '../../components/NavBar/Navbar';
import CardComponent from '../../components/Cart/CardComponent';
import { Col, Row, Pagination } from 'antd';
import { getTypeProduct } from '../../userService/ProductService';
import { useLocation } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import { useSelector } from 'react-redux';

const TypeProductPage = () => {
    const { state } = useLocation();
    const [productsType, setProductsType] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const itemsPerPage = 4;
    const searchProduct = useSelector((state) => state?.product?.search)

    const fetchTypeProducts = async (type, page = 1, limit = itemsPerPage) => {
        setIsLoading(true);
        const res = await getTypeProduct(type, page, limit);
        if (res?.success === true) {
            setProductsType(res?.data);
            setTotalItems(res?.total || 0); // Assuming the API returns total items
        }
        setIsLoading(false);
    };
    console.log('productsType', productsType)

    useEffect(() => {
        if (state) {
            fetchTypeProducts(state, currentPage);
        }
    }, [state, currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const filteredProducts = productsType.filter(product =>
        product.name.toLowerCase().includes(searchProduct.toLowerCase())
    );
    // const onSearch = (value) => {
    //     dispatch(searchProduct(value)); // Dispatch the search term to Redux
    // };

    return (
        <div className="container_TypePage">
            <Loading isLoading={isLoading}>
                <Row className="wrapper_layout">
                    <Col className="col_item" span={4}>
                        <Navbar />
                    </Col>
                    <Col className="product-item" span={20}>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((data) => (
                                <CardComponent
                                    key={data._id}
                                    countInStock={data.countInStock}
                                    description={data.description}
                                    image={data.image}
                                    name={data.name}
                                    price={data.price}
                                    rating={data.rating}
                                    type={data.type}
                                    discount={data.discount}
                                    selled={data.selled}
                                    id={data._id}
                                />
                            ))
                        ) : (
                            <p>No products available.</p>
                        )}
                    </Col>
                </Row>
            </Loading>
            <div className="pagination">
                <Pagination
                    current={currentPage}
                    total={totalItems}
                    pageSize={itemsPerPage}
                    onChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default TypeProductPage;
