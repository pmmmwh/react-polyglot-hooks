import React from 'react';
import { T } from 'react-polyglot-hooks';

const Translated = ({ count }) => (
  <>
    <T phrase="hello" />
    <T phrase="rabbit" count={count} />
  </>
);

export default Translated;
