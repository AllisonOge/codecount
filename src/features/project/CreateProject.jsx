import { useForm } from "react-hook-form";
import { useCreateProject } from "./useCreateProject";

export default function CreateProject({ cancelProject }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { createProject, isCreating } = useCreateProject();

  function onSubmit(d) {
    console.log(d);
    createProject(d, {
      onSettled: () => {
        reset();
        cancelProject((state) => !state);
      },
    });
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          {...register("title", {
            required: "This field is required",
          })}
          disabled={isCreating}
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          id="description"
          {...register("description")}
          disabled={isCreating}
        />
      </div>
      <br />
      <input type="submit" value="Create project" disabled={isCreating} />
      &nbsp;
      <input
        type="button"
        value="Cancel"
        onClick={() => cancelProject((state) => !state)}
        disabled={isCreating}
      />
    </form>
  );
}
