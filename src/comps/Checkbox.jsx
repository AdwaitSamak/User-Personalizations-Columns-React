// CheckboxHeader.js
import React from 'react';

const CheckboxHeader = ({ checked, onChange }) => {
  return (
    <div>
      <input type='checkbox' checked={checked} onChange={onChange} />
    </div>
  );
};

export default CheckboxHeader;
