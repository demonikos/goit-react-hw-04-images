import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import css from './Modal.module.css';

export const Modal = (props) => {
  const onClose = () => {
    props.closeModal();
  };

  const EscapeClick = event => {
    if (event.code === 'Escape') onClose();
  };

  const BackdropClick = event => {
    if (event.target === event.currentTarget) onClose();
  };
  useEffect (() => {
    window.addEventListener('keydown', EscapeClick);

    return () => {
      window.removeEventListener('keydown', EscapeClick);
    }
  })


    return (
      <div className={css.Overlay} onClick={BackdropClick}>
        <div className={css.Modal}>
          <img src={props.src} alt={props.alt} />
        </div>
      </div>
    );
  }


Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  isModalShow: PropTypes.bool.isRequired,
};