import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import Button from '../Button/Button';
import { ReactComponent as SaveIcon } from '../../assets/image/save.svg';
import { UserContext } from '../../context/userContext';
import isLike from '../../utils/utils';

import s from './style.module.css';

const Card = ({ style, _id, likes, name, pictures, wight, price, discount, description, tags }) => {
  const discountPrice = Math.round(price - (price * discount) / 100);

  const { user, handleProductLike } = useContext(UserContext);
  const isLiked = isLike(likes, user._id);

  const onClick = () => {
    handleProductLike(_id, likes);
  };

  return (
    <div className={s.card} style={style}>
      <div className={cn(s.sticky, s['top-left'])}>
        {discount > 0 && <span className={cn(s.tag, s['tag_discount'])}>{discount} %</span>}
        {tags &&
          tags.map((tag) => (
            <span key={tag} className={cn(s.tag, s[`tag_${tag}`])}>
              {tag}
            </span>
          ))}
      </div>
      <div className={cn(s.sticky, s['top-right'])}>
        <SaveIcon onClick={onClick} className={cn(s.favorite, { [s.isLike]: isLiked })} />
      </div>
      <Link to={`/product/${_id}`} className={s.link}>
        <img src={pictures} alt={description} className={s.image} />
        <div className={s.description}>
          {discount > 0 && <span className={s.old}>{price} P</span>}
          <span className={cn(s.price, { [s.discount]: discount > 0 })}>{discountPrice} P</span>
          <span className={s.wight}>{wight}</span>
          <p className={s.name}>{name}</p>
        </div>
      </Link>
      <Button type="primary">В корзину</Button>
    </div>
  );
};

export default Card;
