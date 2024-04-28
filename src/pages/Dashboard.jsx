import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../services/apiProjects";
import { useState } from "react";
import CreateProject from "../features/projects/CreateProject";

export default function Dashboard() {
  const [toggle, setToggle] = useState(false);
  const { data: projects, isLoading } = useQuery({
    queryFn: getProjects,
    queryKey: ["projects"],
  });

  return (
    <>
      {!isLoading &&
        projects?.map((project) => (
          <pre key={project.id}>{JSON.stringify(project)}</pre>
        ))}
      {!isLoading && projects?.length == 0 && !toggle && (
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
