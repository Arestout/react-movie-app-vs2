import React from 'react';

const Image = (props) => {
  const { imagePath, alt, className } = props;
  return (
    <img
      src={`https://image.tmdb.org/t/p/w500/${imagePath}`}
      alt={alt}
      className={className}
    />
  );
};

export default Image;
