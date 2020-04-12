import React from 'react';
import Loader from 'react-loader-spinner';

const LoaderSpinner = () => (
  <div className="loader-box">
    <Loader
      type="Grid"
      color="#007bff"
      height={100}
      width={100}
      timeout={3000}
    />
  </div>
);

export default LoaderSpinner;
