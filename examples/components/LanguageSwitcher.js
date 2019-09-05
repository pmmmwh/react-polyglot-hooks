import React from 'react';

const LanguageSwitcher = ({ onChange }) => (
  <select onChange={onChange}>
    <option value="en">EN</option>
    <option value="fr">FR</option>
  </select>
);

export default LanguageSwitcher;
