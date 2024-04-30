import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getProjects } from "../services/apiProjects";
import { useState } from "react";
import CreateProject from "../features/project/CreateProject";
import { getCurrentUser } from "../services/apiAuth";

export default function Dashboard() {
  const [toggle, setToggle] = useState(false);
  const queryClient = useQueryClient();
  const { data: projects, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { id } =
        queryClient.getQueryData(["user"]) || (await getCurrentUser());
        if (!id) throw new Error('Could not retrive data')
          
      return getProjects(id);
    },
  });
  const navigate = useNavigate();

  if (isLoading) return <p>Fetching data...</p>

  return (
    <>
      {!isLoading &&
        projects?.map((project) => (
          <pre
            key={project.id}
            onClick={() => navigate(`project/${project.id}`)}
          >
            {JSON.stringify(project)}
          </pre>
        ))}
      {!isLoading && !toggle && (
        <input
          type="button"
          value="Create a project"
          onClick={() => setToggle((state) => !state)}
        />
      )}
      {toggle && <CreateProject cancelProject={setToggle} />}
    </>
  );
}
