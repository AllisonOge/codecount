import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  addDays,
  differenceInDays,
  endOfDay,
  formatDate,
  startOfDay,
} from "date-fns";
import { useUserStories } from "../userstory/useUserStories";
import { getWorkdonePerDay } from "../../services/apiBurnDown";

function cumulativeSum(storyPointsPerDay) {
  let storyPointsAcc = [];
  let sum = 0;
  for (let i = 0; i < storyPointsPerDay.length; i++) {
    sum += storyPointsPerDay[i].storyPoints;
    storyPointsAcc.push({ ...storyPointsPerDay[i], storyPoints: sum });
  }
  return storyPointsAcc;
}

function distributeEvenly(storyPoints, numberOfDays) {
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

function zip(arrays) {
  return arrays[0].map(function (_, i) {
    return arrays.map(function (array) {
      return array[i];
    });
  });
}

/*********************************************************
 * BurndownChart component reads the burndown_chart table
 * which is a catalog of workdone (completed tasks) in a day
 * (or other units of tracking eg hours)
 **********************************************************/

export default function BurnDownChart() {
  const { id } = useParams();
  const [storyPoints, setStoryPoints] = useState(0);
  const [expectedStoryPointsPerDay, setExpectedStoryPointsPerDay] = useState(
    []
  );
  const [storyPointsPerDay, setStoryPointsPerDay] = useState([]);

  const { userStories, isLoadingUserStories } = useUserStories(id);

  // TODO: read weights from settings table in database
  const { data: weights, isLoading: isLoadingWeights } = useQuery({
    queryKey: ["weights"],
    queryFn: () => ({
      easy: 1,
      medium: 2,
      hard: 3,
    }),
  });

  const { data: workdonePerDay, isLoading: isLoadingWorkdonePerDay } = useQuery(
    {
      queryKey: ["workdonePerDay"],
      // TODO: replace with data from database
      queryFn: () => getWorkdonePerDay(id),
    }
  );

  useEffect(() => {
    if (
      !(isLoadingUserStories || isLoadingWeights || isLoadingWorkdonePerDay)
    ) {
      const usMap = userStories
        .filter((us) => us.id && us.effortEstimate)
        .map((us) => ({
          id: us.id,
          effortEstimate: us.effortEstimate.toLowerCase(),
        }));
      if (Object.keys(weights).length === 0 && weights.constructor === Object)
        return;
      const total = usMap.reduce((p, c) => p + weights[c.effortEstimate], 0);
      setStoryPoints(total);

      /* I need the following data =>
       * 1.) start and end date of the project,
       * 2.)  workdone a day (or other metric of measurement)
       */
      const projectStartDateISO = userStories.reduce(
        (acc, cur) =>
          acc === null || cur.startDate < acc ? cur.startDate : acc,
        null
      );
      const projectEndDateISO = userStories.reduce(
        (acc, cur) => (acc === null || cur.endDate > acc ? cur.endDate : acc),
        null
      );
      // console.log(
      //   `Project ranges from ${projectStartDateISO} to ${projectEndDateISO}`
      // );
      const projectStartDate = startOfDay(projectStartDateISO);
      const projectEndDate = endOfDay(projectEndDateISO);
      const numberOfDays =
        differenceInDays(projectEndDate, projectStartDate) + 1;
      const expectedStoryPointsPerDay = distributeEvenly(
        total,
        numberOfDays
      ).map((sp, idx) => ({
        day: addDays(projectStartDate, idx).toISOString(),
        storyPoints: sp,
      }));
      // console.log("Number of days ->", numberOfDays);
      // console.log("Workdone per day ->", workdonePerDay);
      const storyPointsPerDay = workdonePerDay.map((w) => ({
        day: w.day,
        storyPoints: w.userStories.reduce(
          (acc, cur) => acc + weights[cur.effortEstimate.toLowerCase()],
          0
        ),
      }));
      // console.log(
      //   "Expected story points per day ->",
      //   expectedStoryPointsPerDay
      // );
      // console.log("Actual story points per day ->", storyPointsPerDay);
      const expectedPointsAcc = cumulativeSum(expectedStoryPointsPerDay);
      const storyPointsAcc = cumulativeSum(storyPointsPerDay);
      // console.log("Expected story points accumulated ->", expectedPointsAcc);
      // console.log("Actual story points accumulated ->", storyPointsAcc);
      setExpectedStoryPointsPerDay(expectedPointsAcc);
      setStoryPointsPerDay(storyPointsAcc);
    }
  }, [
    userStories,
    weights,
    setStoryPoints,
    workdonePerDay,
    setStoryPointsPerDay,
    setExpectedStoryPointsPerDay,
    isLoadingUserStories,
    isLoadingWeights,
    isLoadingWorkdonePerDay,
  ]);

  const zippedCoordinates = zip([expectedStoryPointsPerDay, storyPointsPerDay]);

  return (
    <>
      <h3>Burndown Chart</h3>
      <div>
        {/*show cordinates that would be replaced by a chart library */}
        <table>
          <thead>
            <tr>
              <th>Expected</th>
              <th>Actual</th>
            </tr>
          </thead>
          <tbody>
            {zippedCoordinates.map(([expectedCoord, actualCoord]) => (
              <tr key={expectedCoord.day}>
                <td>{`(${formatDate(expectedCoord.day, "dd MMMM")}, ${
                  storyPoints - expectedCoord.storyPoints
                })`}</td>
                <td>
                  {actualCoord &&
                    `(${formatDate(actualCoord.day, "dd MMMM")}, ${
                      storyPoints - actualCoord.storyPoints
                    })`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
