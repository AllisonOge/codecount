/**
 * @module BurnDownChart
 * @description This module contains the BurnDownChart component
 */

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
import {
  Area,
  AreaChart,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import { useUserStories } from "../userstory/useUserStories";
import { getWorkdonePerDay } from "../../services/apiBurnDown";
import { distributeEvenly, cumulativeSum } from "../../utils/helpers";

/**
 * BurndownChart component reads the burndown_chart table
 * which is a catalog of workdone (completed tasks) in a day
 * (or other units of tracking eg hours)
 * and user stories to calculate the expected and actual
 * story points per day (or other units of tracking eg hours)
 * 
 * TODO: implement other units of tracking eg hours
 * 
 * @returns {AreaChart} - AreaChart component
 */
export default function BurnDownChart() {
  const { id } = useParams();
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

      if (usMap.length === 0) return;
      const total = usMap.reduce((p, c) => p + weights[c.effortEstimate], 0);

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
      if (!projectStartDateISO || !projectEndDateISO) return;
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
      const burndownPoints = storyPointsAcc.map((sp) => ({
        ...sp,
        storyPoints: total - sp.storyPoints,
        day: formatDate(sp.day, "dd MMMM"),
      }));
      const mergedBurndownPoints = expectedPointsAcc
        .map((sp) => ({
          ...sp,
          storyPoints: total - sp.storyPoints,
          day: formatDate(sp.day, "dd MMMM"),
        }))
        .map((sp, idx) => ({
          day: sp.day,
          expectedStoryPoints: sp.storyPoints,
          actualStoryPoints:
            idx < burndownPoints.length ? burndownPoints[idx].storyPoints : 0,
        }));

      setStoryPointsPerDay(mergedBurndownPoints);
    }
  }, [
    userStories,
    weights,
    workdonePerDay,
    setStoryPointsPerDay,
    isLoadingUserStories,
    isLoadingWeights,
    isLoadingWorkdonePerDay,
  ]);

  return (
    <>
      <h4>Burndown Chart</h4>
      {/*show cordinates that would be replaced by a chart library */}
      <AreaChart width={500} height={300} data={storyPointsPerDay}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="expectedStoryPoints"
          stroke="#c1bcbc"
          fill="#999595"
          name="Expected Burndown"
          unit="story points"
        />
        <Area
          type="monotone"
          dataKey="actualStoryPoints"
          stroke="#ccc"
          fill="#ddd"
          name="Actual Burndown"
          unit="story points"
        />
      </AreaChart>
    </>
  );
}
