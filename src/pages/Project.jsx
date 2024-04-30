import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useUpdateProject } from "../features/project/useUpdateProject";
import { getUserStories } from "../services/apiUserStories";
import { getProject } from "../services/apiProjects";
import UserStory from "../features/userstory/UserStory";

export default function Project() {
  const { id } = useParams();
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

  const queryClient = useQueryClient();

  const [edit, setEdit] = useState(false);

  const { data: userStories, isLoadingUserStories } = useQuery({
    queryKey: ["userStories", id],
    queryFn: () => getUserStories(id),
  });
  const { updateProject, isUpdating } = useUpdateProject(id);

  const { mutate, isLoading: isAdding } = useMutation({
    mutationFn: handleClick,
  });

  
  const isLoading = isLoadingProject || isLoadingUserStories;
  const isWorking = isUpdating || isAdding;

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

  return (
    <>
      <div>
        <form>
          <div>
            <label htmlFor="title">Project Name</label>
            <input
              type="text"
              name="title"
              id="title"
              {...register("title", {
                required: "This field is required",
              })}
              disabled={!edit || isUpdating}
            />
            {errors?.title?.message}
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              rows="4"
              cols="50"
              {...register("description")}
              disabled={!edit || isUpdating}
            ></textarea>
          </div>
          <div>
            <label htmlFor="status">Status</label>
            <select
              type="text"
              name="status"
              id="status"
              {...register("status")}
              disabled={!edit || isUpdating}
            >
              <option value="in progress">IN PROGRESS</option>
              <option value="done">DONE</option>
            </select>
          </div>
          <input
            type="button"
            value={!edit ? "Edit" : "Save"}
            onClick={handleSubmit(onSubmit)}
            disabled={isUpdating}
          />
          {edit && (
            <input
              type="button"
              value="Cancel"
              onClick={() => setEdit((state) => !state)}
              disabled={isUpdating}
            />
          )}
        </form>
      </div>
      <br />
      <table>
        <thead>
          <tr>
            <th>User Stories</th>
            <th>Effort Estimate</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Assigned</th>
          </tr>
        </thead>
        <tbody>
          {userStories?.map((userStory, idx) => (
            <UserStory key={idx} userStory={userStory} id={id} />
          ))}
          <div>
            <input type="button" value="Add user story" onClick={() => mutate()} />
          </div>
        </tbody>
      </table>
    </>
  );
}
