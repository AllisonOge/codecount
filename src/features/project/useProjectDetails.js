/**
 * @module project/useProjectDetails
 * @description This module contains the useProjectDetails hook
 */
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProject } from "../../services/apiProjects";

/**
 * useProjectDetails is a custom hook that uses the useQuery hook
 * @param {Number} id - The id of the project to be fetched
 * @returns {Object} - projectDetails and isLoadingProject
 */
export function useProjectDetails(id) {
  const queryClient = useQueryClient();
  const { data: projectDetails, isLoading: isLoadingProject } = useQuery({
    queryKey: ["project", id],
    queryFn: async () => {
      let project = queryClient
        .getQueryData(["projects"])
        ?.find((project) => project.id === id);
      if (!project) {
        project = await getProject(id);
      }
      return project;
    },
  });

  return { projectDetails, isLoadingProject }
}
