import React, {useEffect, useState} from 'react';
import SearchButton from './SearchButton';
import Error from './ErrorMessage';

import './css/SearchForm.css';

function SearchForm({
  searchedCity,
  hasError,
  onClick,
  onInputChange,
  onSubmit,
}) {
  const [disabledStatus, setDisabledStatus] = useState(true);

  useEffect(() => {
    // Source : https://github.com/HackYourHomework/React/pull/27/files#diff-1928d31247cdc0d9ec786b9584351e715bf367a4a394b67e8a60f7fb9626245aR10
    const spaceExcludedLength = searchedCity.replace(/[^a-z]/gi, '').length;
    const conditionOfButton = !(spaceExcludedLength >= 1);
    setDisabledStatus(conditionOfButton);
  }, [searchedCity]);

  return (
    <div className="form_container">
      <form onSubmit={onSubmit}>
        <input
          className="input_field"
          type="search"
          value={searchedCity}
          onChange={onInputChange}
          placeholder="Enter a city name ..."
        />
        <SearchButton
          buttonContent="SEARCH &#128270;"
          onClick={onClick}
          disabled={disabledStatus}
        />

        <Error hasError={hasError} />
      </form>
    </div>
  );
}

export default SearchForm;
