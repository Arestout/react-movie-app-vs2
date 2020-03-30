import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class UIInput extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    labelText: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  render() {
    const {
      type,
      id,
      name,
      value,
      onChange,
      placeholder,
      onBlur,
      labelText,
      error,
    } = this.props;
    return (
      <div className="form-group">
        <label htmlFor={id}>{labelText}</label>
        <input
          type={type}
          className={classNames('form-control', { invalid: error })}
          id={id}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    );
  }
}
