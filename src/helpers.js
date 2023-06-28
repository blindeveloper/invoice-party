/**
 * Generates rounded number
 * @param {number} number - number to be rounded
 * @returns {number} rounded number
 */
export const getRoundedNumber = (number) => Number(number.toFixed(2));
/**
 * Generates random number
 * @returns {number} number in range from 1 till 10
 */
export const getRandomNumInRange = () => {
  return Math.floor(Math.random() * 10) + 1;
};
/**
 * Calculate numbers sum via reduce
 * @param {Object}  object source for calculation
 * @param {string}  path path to number
 * @returns {number} summed numbers
 */
export const getSummedNumbers = (object, path) => {
  return getRoundedNumber(
    object.reduce((acc, el) => {
      return (acc += el[path]);
    }, 0)
  );
};
