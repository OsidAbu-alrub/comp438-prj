export const stringToGrid = str => {
  const length = str.length;
  const column = Math.ceil(Math.sqrt(length));
  let k = 0;
  let row = Math.floor(Math.sqrt(length));

  if (row * column < length) {
    row = column;
  }

  const grid = new Array(row);
  for (let i = 0; i < row; i++) {
    grid[i] = [];
    for (let j = 0; j < column; j++) {
      grid[i][j] = "";
    }
  }

  // convert the string into grid
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < column; j++) {
      if (k < length) grid[i][j] = str[k];
      k++;
    }
  }

  return grid;
};
