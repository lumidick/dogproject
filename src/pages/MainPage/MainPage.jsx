import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';

import s from './style.module.css';
import Adv from '../../components/Adv/Adv';

const MainPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div class={s.info}>
        <h1>Крафтовые лакомства для собак</h1>
        <h2>Всегда свежие лакомства ручной работы с доставкой по России и Миру</h2>
        <Button onClick={() => navigate('/catalog')}>{'Каталог >'}</Button>
      </div>
      <Adv title={'Подарок за первый заказ!'} subtitle={'Подарок за первый заказ!'} />
    </>
  );
};

export default MainPage;
