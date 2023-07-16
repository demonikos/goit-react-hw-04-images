import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';

import css from './Searchbar.module.css';

// export class Searchbar extends Component {
//   state = { inputText: '' };

//   onSubmitHandler = event => {
//     event.preventDefault();
//     this.props.onSubmit(event);
//   };

//   onInputChange = event => {
//     this.setState({ inputText: event.target.value });
//   };

//   render() {
//     return (
//       <>
//         <header className={css.Searchbar}>
//           <form className={css.SearchForm} onSubmit={this.onSubmitHandler}>
//             <button type="submit" className={css.SearchFormButton}>
//               <span className={css.SearchFormButtonLabel}>Search</span>
//             </button>

//             <input
//               className={css.SearchFormInput}
//               type="text"
//               autoComplete="off"
//               name="input"
//               autoFocus
//               placeholder="Search images and photos"
//               value={this.state.inputText}
//               onInput={this.onInputChange}
//             />
//           </form>
//         </header>
//       </>
//     );
//   }
// }

// Searchbar.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
// };


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