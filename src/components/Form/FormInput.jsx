import React from 'react';
import s from './forminput.module.css';

const FormInput = React.forwardRef((props, ref) => {
  return <input className={s.input} ref={ref} {...props} />;
});

export default FormInput;
