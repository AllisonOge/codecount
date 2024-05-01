import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProject } from "../../services/apiProjects";

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