export function getErrorField(err) {
  return (
    JSON.stringify(err?.data?.message) ||
    JSON.stringify(err?.message) ||
    JSON.stringify(err?.error) ||
    JSON.stringify(err)
  );
}
