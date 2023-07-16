import React, { useState } from 'react';
import PropTypes from 'prop-types';

import css from './Searchbar.module.css';

export const Searchbar = ({onSubmit}) => {
  const [inputText, setInputText] = useState('');

  const onSubmitHandler = event => {
    event.preventDefault();
    onSubmit(event);
  };

  const onInputChange = event => {
    setInputText(event.target.value);
  };


    return (
      <>
        <header className={css.Searchbar}>
          <form className={css.SearchForm} onSubmit={onSubmitHandler}>
            <button type="submit" className={css.SearchFormButton}>
              <span className={css.SearchFormButtonLabel}>Search</span>
            </button>

            <input
              className={css.SearchFormInput}
              type="text"
              autoComplete="off"
              name="input"
              autoFocus
              placeholder="Search images and photos"
              value={inputText}
              onInput={onInputChange}
            />
          </form>
        </header>
      </>
    );
  }


Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};