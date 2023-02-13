import React from 'react';
import { ReactComponent as Icon } from '../../assets/image/logo.svg';
import { Link } from 'react-router-dom';

function Logo() {
  return (
    <Link to="/">
      <Icon />
    </Link>
  );
}

export default React.memo(Logo);
