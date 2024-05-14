export const formatToGoogleDate = (myDate) => {
  const myFormattedDate = myDate?.toISOString()?.replace(/[^\w\s]/gi, '');
  // console.log(myFormattedDate);
  return myFormattedDate;
};
