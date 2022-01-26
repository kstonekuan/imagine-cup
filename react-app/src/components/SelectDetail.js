import React from 'react';

const SelectDetail = ({ name, options, placeholder, onChange, propertyName }) => (
  <div className="field">
    <label className="label" htmlFor={name}>
      {name}
    </label>
    <select name={name} onBlur={onChange}>
        <option value="">{placeholder}</option>
        {options.map((option, index) => <option value={index} key={index}>{option[`${propertyName}`]}</option>)}
    </select>
  </div>
);

export default SelectDetail;
