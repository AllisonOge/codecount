/**
 * @module helper.js
 * @description This module contains helper functions that are used in the application
 */



/**
 * cumulativeSum - Calculate the cumulative sum of story points per day
 * @param {Array<Object>} storyPointsPerDay - Array of objects containing the story points per day
 * @returns {Array<Object>} - Array of objects containing the cumulative sum of story points per day
 * 
 * @example
 * const storyPointsPerDay = [
 *  { day: "2021-08-01", storyPoints: 5 },
 *  { day: "2021-08-02", storyPoints: 3 },
 *  { day: "2021-08-03", storyPoints: 8 },
 *  ]
 *  const result = cumulativeSum(storyPointsPerDay); // [{ day: "2021-08-01", storyPoints: 5 }, 
 *  // { day: "2021-08-02", storyPoints: 8 }, { day: "2021-08-03", storyPoints: 16 }]
 */
export function cumulativeSum(storyPointsPerDay) {
    let storyPointsAcc = [];
    let sum = 0;
    for (let i = 0; i < storyPointsPerDay.length; i++) {
      sum += storyPointsPerDay[i].storyPoints;
      storyPointsAcc.push({ ...storyPointsPerDay[i], storyPoints: sum });
    }
    return storyPointsAcc;
  }
  
  /**
   * distributeEvenly - Distribute story points evenly across the days
   * @param {Number} storyPoints - Total story points 
   * @param {Number} numberOfDays - Number of days to distribute the story points
   * @returns {Array<Number>} - Array of story points distributed per day
   * 
   * @example
   * const storyPoints = 10;
   * const numberOfDays = 5;
   * const result = distributeEvenly(storyPoints, numberOfDays); // [2, 2, 2, 2, 2]
   */
  export function distributeEvenly(storyPoints, numberOfDays) {
    // Calculate the points to be distributed per day
    const pointsPerDay = Math.floor(storyPoints / numberOfDays);
    // Calculate the remaining points after evenly distributing
    const remainingPoints = storyPoints % numberOfDays;
  
    // Initialize an array to hold the points for each day
    const distributedPoints = new Array(numberOfDays).fill(pointsPerDay);
  
    // Distribute remaining points evenly across the days
    for (let i = 0; i < remainingPoints; i++) {
      distributedPoints[i] += 1;
    }
  
    return distributedPoints;
  }
