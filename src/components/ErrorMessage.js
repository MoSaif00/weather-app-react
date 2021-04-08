import React from 'react';
import './css/ErrorMessage.css';

function Error({hasError}) {
  return (
    <>
      {hasError.show === true && (
        <p className="error_message">{hasError.error}</p>
      )}
    </>
  );
}

export default Error;
