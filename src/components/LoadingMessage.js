import React from 'react';
import './css/LoadingMessage.css';

function Loading({isLoading}) {
  return (
    <>{isLoading && <p className="loading_message">data is loading ...</p>}</>
  );
}

export default Loading;
