import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import isLike from '../../utils/utils';
import Product from '../Product/Product';

const ProductPage = ({ user }) => {
  const [product, setProduct] = useState({});

  const handleProductLike = () => {
    const isLiked = isLike(product.likes, user?._id);
    api.changeLikeStatus(product._id, isLiked).then((product) => setProduct(product));
  };

  useEffect(() => {
    api.getProductInfo('622c77cc77d63f6e70967d1e').then((data) => setProduct(data));
  }, []);

  return (
    <>
      <Product user={user} {...product} handleProductLike={handleProductLike}></Product>
    </>
  );
};

export default ProductPage;
