import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProjects } from "../services/apiProjects";
import CreateProject from "../features/project/CreateProject";
import { getCurrentUser } from "../services/apiAuth";
import { Card, Row, Button, Badge } from "react-bootstrap";

export default function Dashboard() {
  const [toggle, setToggle] = useState(false);
  const queryClient = useQueryClient();
  const { data: projects, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { id } =
        queryClient.getQueryData(["user"]) || (await getCurrentUser());
      if (!id) throw new Error("Could not retrive data");

      return getProjects(id);
    },
  });
  const navigate = useNavigate();

  if (isLoading) return <p>Fetching data...</p>;

  return (
    <>
      <br />
      <Row>
        {!isLoading &&
          projects?.map((project) => (
            <Card
              key={project.id}
              onClick={() => navigate(`project/${project.id}`)}
              style={{
                width: "18rem",
                height: "15rem",
                marginRight: "1rem",
                marginBottom: "1rem",
              }}
            >
              <Card.Body>
                <Card.Title>{project.title}</Card.Title>
                <Badge>{project.status}</Badge>
              </Card.Body>
            </Card>
          ))}
        {!isLoading && !toggle && (
          <Button
            as={Card}
            style={{ width: "18rem", height: "15rem" }}
            variant="tertiary-border"
            onClick={() => setToggle((state) => !state)}
          >
            <Card.Body>Create a project</Card.Body>
          </Button>
        )}
      </Row>
      {toggle && (
        <div
          className="modal show"
          style={{ display: "block", position: "absolute", top: "20%" }}
        >
          <CreateProject cancelProject={setToggle} />
        </div>
      )}
    </>
  );
}
