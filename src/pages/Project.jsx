import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import BurnDownChart from "../features/project/BurnDownChart";
import UserStory from "../features/userstory/UserStory";
import RadialChart from "../features/project/RadialChart";
import { useUpdateProject } from "../features/project/useUpdateProject";
import { useProjectDetails } from "../features/project/useProjectDetails";
import { useDeleteProject } from "../features/project/useDeleteProject";
import { useUserStories } from "../features/userstory/useUserStories";
import { Form, Row, Col, Button } from "react-bootstrap";

export default function Project() {
  const { id } = useParams();

  const { projectDetails, isLoadingProject } = useProjectDetails(id);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const setDefaultValues = async () => {
      await projectDetails;

      if (projectDetails && !isLoadingProject) {
        setValue("title", projectDetails.title);
        setValue("description", projectDetails.description);
        setValue("status", projectDetails.status);
      }
    };

    setDefaultValues();
  }, [projectDetails, isLoadingProject, setValue]);

  const { userStories, isLoadingUserStories } = useUserStories(id);

  const [edit, setEdit] = useState(false);
  const [storyPoints, setStoryPoints] = useState(0);

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
        }));
      if (Object.keys(weights).length === 0 && weights.constructor === Object)
        return;
      const total = usMap.reduce((p, c) => p + weights[c.effortEstimate], 0);
      setStoryPoints(total);
    }
  }, [
    userStories,
    weights,
    setStoryPoints,
    isLoadingUserStories,
    isLoadingWeights,
  ]);

  const { updateProject, isUpdating } = useUpdateProject(id);

  const { deleteProject, isDeleting } = useDeleteProject(id);

  const { mutate, isLoading: isAdding } = useMutation({
    mutationFn: handleClick,
  });

  const navigate = useNavigate();

  const isLoading = isLoadingProject || isLoadingUserStories;
  const isWorking = isUpdating || isAdding || isDeleting;

  // if data is empty prepopulate the table with empty rows
  if (userStories?.length === 0)
    for (let i = 0; i < 4; i++) {
      userStories.push({
        title: "",
        effortEstimate: "",
        startDate: "",
        endDate: "",
        status: "",
        assigned: "",
      });
    }

  if (isLoading) return <p>Fetching data...</p>;

  function onSubmit(data) {
    if (!edit) {
      setEdit((state) => !state);
      return;
    }
    updateProject(
      { data, id },
      {
        onSuccess: () => setEdit(false),
      }
    );
  }

  function handleClick() {
    userStories.push({
      title: "",
      effortEstimate: "",
      startDate: "",
      endDate: "",
      status: "",
      assigned: "",
    });
  }

  function handleDelete() {
    deleteProject(id, {
      onSuccess: () => navigate("/dashboard"),
    });
  }

  return (
    <>
      <style type="text/css">
        {`
.grid-table{
  display: grid;
  grid-template-columns: repeat(6, 1fr) 3rem;
}

.grid-table > div {
  padding: 1rem 0.8rem;
}
  `}
      </style>
      <br />
      <Row>
        <Col xs={12} md={8}>
          <Form>
            <Form.Group controlId="title">
              <Form.Label>Project Name</Form.Label>
              <Form.Control
                type="text"
                name="title"
                {...register("title", {
                  required: "This field is required",
                })}
                disabled={!edit || isWorking}
              />
              {errors?.title?.message}
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                rows={4}
                cols={50}
                {...register("description")}
                disabled={!edit || isWorking}
              />
            </Form.Group>
            <Row>
              <Form.Group as={Col} xs={6} controlId="status">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  aria-label="select status"
                  type="text"
                  name="status"
                  {...register("status")}
                  disabled={!edit || isWorking}
                >
                  <option value="in progress">IN PROGRESS</option>
                  <option value="done">DONE</option>
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} xs={6} controlId="storyPoints">
                <div className="m-1">
                  <Form.Label>Story Points</Form.Label>
                  <Button
                    as="input"
                    type="button"
                    variant="secondary"
                    value={storyPoints}
                    name="storyPoints"
                    readOnly={true}
                  />
                </div>
              </Form.Group>
            </Row>
            <br />
            <Button
              as="input"
              type="button"
              value={!edit ? "Edit" : "Save"}
              onClick={handleSubmit(onSubmit)}
              disabled={isWorking}
            />
            &nbsp;
            {edit && (
              <Button
                as="input"
                type="button"
                variant="secondary"
                value="Cancel"
                onClick={() => setEdit((state) => !state)}
                disabled={isWorking}
              />
            )}
            {!edit && (
              <Button
                as="input"
                type="button"
                variant="secondary"
                value="Delete"
                onClick={handleSubmit(handleDelete)}
              />
            )}
          </Form>
        </Col>
        <Col>
          <RadialChart />
        </Col>
      </Row>
      <br />
      <div className="grid-table">
        <div>
          <b>User Stories</b>
        </div>
        <div>
          <b>Effort Estimate</b>
        </div>
        <div>
          <b>Start Date</b>
        </div>
        <div>
          <b>End Date</b>
        </div>
        <div>
          <b>Status</b>
        </div>
        <div>
          <b>Assigned</b>
        </div>
        <div></div>
        {userStories?.map((userStory, idx) => (
          <UserStory key={idx} userStory={userStory} id={id} />
        ))}
      </div>
      <div>
        <Button as="input" type="button" value="Add user story" onClick={() => mutate()} />
      </div>
      <br />
      <Row>
        <Col xs={6}>
          {storyPoints > 0 ? (
            <BurnDownChart />
          ) : (
            "Add user stories to generate burndown chart"
          )}
        </Col>
      </Row>
    </>
  );
}
