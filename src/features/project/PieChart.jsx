import { useState, useEffect } from "react";
import { useUserStories } from "../userstory/useUserStories";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function PieChart() {
  const { id } = useParams();
  const [storyPoints, setStoryPoints] = useState(0);
  const [completed, setCompleted] = useState(0);
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
          status: us.status
        }));
      if (Object.keys(weights).length === 0 && weights.constructor === Object)
        return;
      const total = usMap.reduce((p, c) => p + weights[c.effortEstimate], 0);
      setStoryPoints(total);

      const completed = usMap.reduce((p, c) => c.status == "done" ? p + weights[c.effortEstimate] : p, 0);
      setCompleted(completed)
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
      <p><b>{`${Math.round((completed / storyPoints) * 100)} %`}</b> <span>completed</span></p>
  );
}
