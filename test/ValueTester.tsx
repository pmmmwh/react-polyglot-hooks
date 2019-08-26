import * as React from 'react';

interface ValueTesterProps {
  callback: Function;
  value: any;
}

const ValueTester: React.FC<ValueTesterProps> = ({ callback, value }) => {
  callback(value);
  return null;
};

export default ValueTester;
