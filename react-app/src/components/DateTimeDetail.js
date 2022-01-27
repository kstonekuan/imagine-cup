import React from 'react';
import DateTimePicker from 'react-datetime-picker';

const DateTimeDetail = ({ name, value, onChange }) => (
  <div className="field">
    <label className="label" htmlFor={name}>
      {name}
    </label>
    <DateTimePicker
        onChange={onChange}
        value={value}
      />
  </div>
);

export default DateTimeDetail;
