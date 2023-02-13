import Button from '../Button/Button';
import React, { useState, useContext } from 'react';
import s from './style.module.css';
import cn from 'classnames';
import isLike from '../../utils/utils';
import { ReactComponent as SaveIcon } from '../../assets/image/save.svg';
import Rating from '../Rating/Rating';

import { UserContext } from '../../context/userContext';
import ReviewList from '../ReviewList/ReviewList';

const Product = ({ handleProductLike, name, description, price, discount, pictures, reviews, stock, likes }) => {
  const discountPrice = Math.round(price - (price * discount) / 100);
  const [count, stateCount] = useState(0);
  const [rate, setRate] = useState(3);
  const { user } = useContext(UserContext);

  const isLiked = isLike(likes, user?._id);

  return (
    <div className={s.product}>
      <div className={s.header}>
        <div className={s.info}>
          <span className={s.articul}>Артикул</span>: 23888907
          <span className={s.rate}></span>
          <span className={s.reviews}>Количество отзывов: {reviews?.length}</span>
          <Rating rate={rate} setRate={setRate} isEditable></Rating>
        </div>
      </div>

      <div className={s.content}>
        <div className={s.imageWrapper}>
          <img className={s.image} src={pictures} alt={name} />
        </div>

        <div className={s.carousel}>
          <img className={s.carousel__image} src={pictures} alt={name} />
          <img className={s.carousel__image} src={pictures} alt={name} />
          <img className={s.carousel__image} src={pictures} alt={name} />
        </div>

        <div className={s.info}>
          <div className={s.price}>
            {discount > 0 && <span className={s.old}>{price} P</span>}
            <span className={cn(s.price, { [s.discount]: discount > 0 })}>{discountPrice} P</span>
          </div>

          <div className={s.buttons}>
            <div className={s.countButton}>
              <div className={s.minus} onClick={() => count > 0 && stateCount(count - 1)}>
                -
              </div>
              <div className={s.num}>{count}</div>
              <div className={s.plus} onClick={() => count < stock && stateCount(count + 1)}>
                +
              </div>
            </div>
            <Button>В корзину</Button>
          </div>

          <div className={s.favourite}>
            <SaveIcon onClick={handleProductLike} className={cn(s.favoriteIcon, { [s.isLike]: isLiked })} />
            {isLiked ? 'В избранном' : 'В избранное'}
          </div>

          <div className={s.delivery}>
            {/* <img src={truck} alt="truck" /> */}
            <div className={s.right}>
              <h3 className={s.name}>Доставка по всему Миру!</h3>
              <p className={s.text}>
                Доставка курьером — <span className={s.bold}> от 399 ₽</span>
              </p>
              <p className={s.text}>
                Доставка в пункт выдачи — <span className={s.bold}> от 199 ₽</span>
              </p>
            </div>
          </div>

          <div className={s.delivery}>
            {/* <img src={quality} alt="quality" /> */}
            <div className={s.right}>
              <h3 className={s.name}>Гарантия качества</h3>
              <p className={s.text}>Если Вам не понравилось качество нашей продукции, мы вернем деньги, либо сделаем все возможное, чтобы удовлетворить ваши нужды.</p>
            </div>
          </div>
        </div>
      </div>

      <div className={s.description}>
        <div className={s.title}>Описание</div>
        <div className={s.text}>{description}</div>
      </div>
      <div className={s.description}>
        <div className={s.title}>Характеристики</div>
        <div className={s.text}>{description}</div>
      </div>
      <div className={s.description}>
        <div className={s.title}>Отзывы</div>
        <ReviewList reviews={reviews}></ReviewList>
      </div>
    </div>
  );
};

export default Product;
