import React from 'react';
import { useNavigate } from 'react-router-dom';
import s from './style.module.css';
import cn from 'classnames';
import { ReactComponent as Cross } from '../../assets/image/ic-close-input.svg';

const Modal = ({ active, setActive, children }) => {
  const navigate = useNavigate();

  const onClose = () => {
    navigate(-1);
  };

  return (
    <div className={cn(s.modal, s.active)} onClick={onClose}>
      <div className={cn(s.content, s.active)} onClick={(e) => e.stopPropagation()}>
        <Cross className={s.cross} onClick={onClose}></Cross>
        {children}
      </div>
    </div>
  );
};

export default Modal;
