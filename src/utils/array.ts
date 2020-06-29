/**
 * Given an array of numbers and a number, returns the index at which the array contains the closest value to the
 * provided one.
 *
 * @param array An array of values, from which to pick the closest.
 * @param value The value to approach.
 */
export const compute_closest_value_index = (array: number[], value: number): number =>
	array.indexOf(array.concat().sort((a, b) => Math.abs(value - a) - Math.abs(value - b))[0]);
