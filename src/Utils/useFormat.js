export const useFormat = e => {
  return Number(e)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, '$&,');
};
