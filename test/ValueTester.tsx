interface ValueTesterProps<T> {
  callback(value: T): T;
  value: T;
}

export default function ValueTester<T>({ callback, value }: ValueTesterProps<T>) {
  callback(value);
  return null;
}
