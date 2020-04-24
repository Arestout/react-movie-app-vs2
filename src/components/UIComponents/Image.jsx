import React from 'react';

const Image = (props) => {
  const { imagePath, alt, ...otherProps } = props;
  return (
    <img
      {...otherProps}
      src={`https://image.tmdb.org/t/p/w500/${imagePath}`}
      alt={alt}
    />
  );
};

export default Image;
