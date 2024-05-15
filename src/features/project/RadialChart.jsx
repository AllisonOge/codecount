/**
 * @module RadialChart
 * @description This module contains the RadialChart component
 */

import { useState, useEffect } from "react";
import { useUserStories } from "../userstory/useUserStories";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { RadialBar, RadialBarChart } from "recharts";

/**
 * RadialChart component reads the user stories and weights (effort estimate)
 * to calculate the percentage of completed user stories
 * @returns {RadialBarChart} - RadialBarChart component
 */
export default function RadialChart() {
  const { id } = useParams();
  const [storyPoints, setStoryPoints] = useState(0);
  const [completed, setCompleted] = useState();
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
  useEffect(() => {
    if (!(isLoadingUserStories || isLoadingWeights)) {
      const usMap = userStories
        .filter((us) => us.id && us.effortEstimate)
        .map((us) => ({
          id: us.id,
          effortEstimate: us.effortEstimate.toLowerCase(),
          status: us.status,
        }));
      if (Object.keys(weights).length === 0 && weights.constructor === Object)
        return;
      const total = usMap.reduce((p, c) => p + weights[c.effortEstimate], 0);
      setStoryPoints(total);

      const completed = usMap.reduce(
        (p, c) => (c.status == "done" ? p + weights[c.effortEstimate] : p),
        0
      );
      setCompleted(completed);
    }
  }, [
    userStories,
    weights,
    setStoryPoints,
    setCompleted,
    isLoadingUserStories,
    isLoadingWeights,
  ]);
  return (
    <RadialBarChart
      cx="50%"
      cy="50%"
      width={250}
      height={250}
      innerRadius="50%"
      outerRadius="80%"
      startAngle={90}
      endAngle={90 - (completed / storyPoints) * 360 || 90}
      data={[{ completed: completed }]}
    >
      <RadialBar dataKey="completed" fill="var(--bs-primary)" />
      <text x="50%" y="48%" textAnchor="middle" style={{ fontSize: "1.5rem" }}>
        {`${Math.round((completed / storyPoints || 0)* 100)} %`}
      </text>
      <text x="50%" y="55%" textAnchor="middle" style={{ fontSize: ".8rem" }}>
        completed
      </text>
    </RadialBarChart>
  );
}
