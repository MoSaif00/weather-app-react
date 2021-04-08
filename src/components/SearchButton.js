import React from 'react';
import './css/SearchButton.css';

function SearchButton(props) {
  const {buttonContent, onClick, disabled} = props;

  return (
    <>
      <button className="search_button" onClick={onClick} disabled={disabled}>
        {buttonContent}
      </button>
    </>
  );
}

export default SearchButton;
