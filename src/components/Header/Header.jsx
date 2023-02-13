import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';

import { ReactComponent as Favourites } from '../../assets/image/save.svg';
import { ReactComponent as Cart } from '../../assets/image/cart.svg';
import { ReactComponent as Login } from '../../assets/image/profile.svg';

import { UserContext } from '../../context/userContext';

import s from './style.module.css';
import Button from '../Button/Button';

const Header = ({ children, onClickLoginButton, loggedIn, logout }) => {
  const { favourites } = useContext(UserContext);

  const location = useLocation();

  return (
    <header className={s.header}>
      {children}
      <div className={s.icons}>
        {loggedIn && (
          <>
            <Link to="/favourite">
              <div className={s.icon}>
                {favourites > 0 && <div className={s.label}>{favourites}</div>}
                <Favourites className={cn(s.favourites, s.icon)} title="Избранное" />
              </div>
            </Link>
            <Cart className={s.icon} title="Корзина" />
          </>
        )}
        {loggedIn ? (
          <Button onClick={logout}>Exit</Button>
        ) : (
          <Link to={'/login'} state={{ backgroundLocation: location, mainUrl: location.pathname }}>
            <Login className={s.icon} title="Вход" onClick={onClickLoginButton} />
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
