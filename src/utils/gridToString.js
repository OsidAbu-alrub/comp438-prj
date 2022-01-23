export const gridToString = grid => {
  let str = "";
  grid.forEach(subArray => {
    subArray.forEach(value => {
      str += value;
    });
  });
  return str;
};
