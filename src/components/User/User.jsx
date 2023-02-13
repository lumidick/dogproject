import React from 'react';
import s from './style.module.css';

const User = ({ user }) => {
  return (
    <div className={s.user}>
      <span className={s.name}>{user?.name || 'Name'}</span>
      <span className={s.about}>{user?.about || 'Proffesion'}</span>
    </div>
  );
};

export default User;
