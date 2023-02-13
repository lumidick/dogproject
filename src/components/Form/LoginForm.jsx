import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import s from './style.module.css';
import { useForm } from 'react-hook-form';
import cn from 'classnames';

import Input from '../Input/Input';
import Button from '../Button/Button';
import { EMAIL_REGEXP, PASSWORD_REGEXP, PHRASES } from '../../utils/constants';

const LoginForm = ({ handleRequestAuth }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <form className={s.form} onSubmit={handleSubmit(handleRequestAuth)}>
      <h2 className={s.title}>Вход</h2>
      <Input {...register('email', { required: true, pattern: { value: EMAIL_REGEXP, message: PHRASES.incorrectEmail } })} type="text" placeholder="Email" autoComplete="off" />
      {errors?.email && <div className={s.error}>{errors.email.message}</div>}
      <Input {...register('password', { required: true })} type="password" placeholder="Password" autoComplete="new-password" />
      {errors?.password && <div className={s.error}>{errors.password.message}</div>}
      <Link replace={true} to="/reset" state={{ backgroundLocation: location }}>
        {/* <div onClick={() => onChangeType('reset')} className={cn(s.info, s.right)}> */}
        <div className={cn(s.info, s.right)}>Восстановить пароль</div>
      </Link>
      <Button>Войти</Button>
      <Link replace={true} to="/registration" state={{ backgroundLocation: location }}>
        <Button type="secondary">Регистрация</Button>
      </Link>
    </form>
  );
};

export default LoginForm;
