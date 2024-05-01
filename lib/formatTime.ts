export const formatDate = (date: Date) => {
  const hours = date.getUTCHours();
  const minutes = date.getMinutes();
  const day = date.getDay();
  const month = date.getMonth();
  const year = date.getFullYear();
  const a = date.getUTCDate();
  console.log(a);

  return `${hours}:${minutes} ${day}/${month}/${year}`;
};
