import React from 'react';
import s from './style.module.css';

const Adv = ({ title, subtitle, background, img, type }) => {
  return (
    <div className={type === 'small' ? s.mini_adv : s.adv}>
      <img src={background}></img>
      <div>{title}</div>
      <div>{subtitle}</div>
      <img src={img}></img>
    </div>
  );
};

export default Adv;
