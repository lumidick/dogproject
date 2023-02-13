import React, { useContext, useCallback } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Spin } from 'antd';

import PageHeader from '../../components/PageHeader/PageHeader';
import Product from '../../components/Product/Product';

import api from '../../utils/api';
import useApi from '../../hooks/useAPI';
import { UserContext } from '../../context/userContext';

const ProductPage = () => {
  const { productId } = useParams();
  const { handleProductLike } = useContext(UserContext);

  const getProductInfo = useCallback(() => api.getProductInfo(productId), [productId]);
  const { data: product, setData: setProduct, loading, error } = useApi(getProductInfo);

  const onProductLike = () => {
    handleProductLike(productId, product.likes).then((updateProduct) => setProduct(updateProduct));
  };

  return (
    <>
      <PageHeader title={product?.name} buttonText="Назад" link={'/catalog'}></PageHeader>
      {loading ? <Spin /> : error ? <Navigate to="/"></Navigate> : <Product {...product} handleProductLike={onProductLike}></Product>}
    </>
  );
};

export default ProductPage;
