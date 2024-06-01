export function getErrorField(err) {
  const errMsgOne = JSON.stringify(err?.data?.message);
  const errMsgTwo = JSON.stringify(err?.message);
  return errMsgOne || errMsgTwo || JSON.stringify(err);
}
