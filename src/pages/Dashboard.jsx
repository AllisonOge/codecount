import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getProjects } from "../services/apiProjects";
import { useState } from "react";
import CreateProject from "../features/project/CreateProject";

export default function Dashboard() {
  const [toggle, setToggle] = useState(false);
  const { data: projects, isLoading } = useQuery({
    queryFn: getProjects,
    queryKey: ["projects"],
  });
  const navigate = useNavigate();

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
      {(!isLoading && !toggle) && (
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
