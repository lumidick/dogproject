import React, { useState, useEffect } from 'react';
import { ReactComponent as Star } from '../../assets/image/star.svg';
import s from './style.module.css';
import cn from 'classnames';

const Rating = ({ rate, setRate, isEditable = false }) => {
  const [ratingArray, setRaitingArray] = useState(new Array(5).fill(<></>));

  useEffect(() => setRating(rate), [rate]);

  const setRating = (currentRating) => {
    const updatedRaiting = ratingArray.map((el, i) => {
      return (
        <Star
          onMouseLeave={() => isEditable && setRating(rate)}
          onClick={() => isEditable && setRate(i + 1)}
          className={cn(s.star, { [s.active]: i < currentRating })}
          onMouseEnter={() => isEditable && setRating(i + 1)}
        ></Star>
      );
    });

    setRaitingArray(updatedRaiting);
  };

  return (
    <div>
      {ratingArray.map((el, i) => (
        <span key={i}>{el}</span>
      ))}
    </div>
  );
};

export default Rating;
