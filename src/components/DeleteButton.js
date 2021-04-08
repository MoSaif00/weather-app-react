import React from 'react';
import './css/DeleteButton.css';

function DeleteButton({handleDeleteOnClick}) {
  return (
    <>
      <button className="deleteButton" onClick={handleDeleteOnClick}>
        X
      </button>
    </>
  );
}

export default DeleteButton;
