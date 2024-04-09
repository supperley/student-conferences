export function hasErrorField(err) {
  return (
    typeof err === 'object' &&
    err !== null &&
    'data' in err &&
    typeof err.data === 'object' &&
    err.data !== null &&
    'error' in err.data
  );
}
