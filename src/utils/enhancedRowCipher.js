import arrayShuffle from "array-shuffle";
import { gridToString } from "./gridToString";

const shuffleIndexes = length => {
  const indexes = Array(length);
  for (let i = 0; i < indexes.length; i++) {
    indexes[i] = i;
  }
  return arrayShuffle(indexes);
};

const comparator = (cipheredObject, originalGrid) => {
  const originalText = gridToString(originalGrid);
  const { cipheredText } = cipheredObject;

  let similarityCount = 0;
  [...originalText].forEach((char, idx) => {
    if (cipheredText[idx] === char) similarityCount++;
  });
  return similarityCount;
};

// returns an object containing:
/**
 * {
 * 	left:string => left part of key (for shuffling columns)
 * 	right:string => right part of key (for shuffling rows)
 * 	key: string => left + (right^left)
 * 	cipheredText:string
 * }
 */
export const enhancedRowCipher = originalgrid => {
  // copy original grid (so no side affects happen)
  const similarityObject = {};
  // try 10 times and return best ciphered text
  for (let tries = 0; tries < 10; tries++) {
    const grid = [];
    for (let i = 0; i < originalgrid.length; i++) {
      grid[i] = originalgrid[i].slice(0);
    }
    const isOddLength = grid.length % 2 === 1;

    // shuffle columns
    const shuffledColumnIndexes = shuffleIndexes(grid.length);
    for (let i = 0; i < shuffleIndexes.length; i = i + 2) {
      if (isOddLength && i === shuffleIndexes.length - 1) break;
      const currentShuffledColumnIndex = shuffledColumnIndexes[i];
      const nextShuffledColumnIndex = shuffledColumnIndexes[i + 1];

      for (let j = 0; j < grid.length; j++) {
        const temp = grid[j][currentShuffledColumnIndex];
        grid[j][currentShuffledColumnIndex] =
          grid[j][nextShuffledColumnIndex];
        grid[j][nextShuffledColumnIndex] = temp;
      }
    }

    // shffule rows
    const shuffledRowIndexes = shuffleIndexes(grid.length);
    for (let i = 0; i < shuffledRowIndexes.length; i = i + 2) {
      if (isOddLength && i === shuffledRowIndexes.length - 1) break;
      const currentShuffledRowIndex = shuffledRowIndexes[i];
      const nextShuffledRowIndex = shuffledRowIndexes[i + 1];

      for (let j = 0; j < grid.length; j++) {
        const temp = grid[currentShuffledRowIndex][j];
        grid[currentShuffledRowIndex][j] =
          grid[nextShuffledRowIndex][j];
        grid[nextShuffledRowIndex][j] = temp;
      }
    }

    // left and right
    const left = shuffledColumnIndexes.join("");
    const right = shuffledRowIndexes.join("");

    // key
    let leftXorRight = "";
    for (let i = 0; i < left.length; i++) {
      leftXorRight += +left[i] ^ +right[i];
    }
    const key = left + leftXorRight;

    // cipheredtext
    let cipheredText = "";
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid.length; j++) {
        cipheredText += grid[i][j];
      }
    }

    const cipheredObject = {
      left,
      right,
      key,
      cipheredText,
    };

    similarityObject[tries] = cipheredObject;
  }

  let indexOfLeastSimilarity = 0;
  let leastSimilarityCount = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i < 10; i++) {
    const similarityCount = comparator(
      similarityObject[i],
      originalgrid,
    );

    if (similarityCount < leastSimilarityCount) {
      indexOfLeastSimilarity = i;
      leastSimilarityCount = similarityCount;
    }
  }

  return similarityObject[indexOfLeastSimilarity];
};
