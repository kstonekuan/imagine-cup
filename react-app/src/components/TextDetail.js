import React from 'react';

const TextDetail = ({ name, value }) => (
  <div className="field">
    <label className="label" htmlFor={name}>
      {name}
    </label>
    <p>
      {value}
    </p>
  </div>
);

export default TextDetail;
