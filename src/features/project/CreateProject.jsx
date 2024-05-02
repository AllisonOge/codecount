import { useForm } from "react-hook-form";
import { useCreateProject } from "./useCreateProject";
import { Modal, Form } from "react-bootstrap";
import Error from "../../ui/Error";

export default function CreateProject({ cancelProject }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { createProject, isCreating } = useCreateProject();

  function onSubmit(d) {
    createProject(d, {
      onSettled: () => {
        reset();
        cancelProject((state) => !state);
      },
    });
  }
  return (
    <Modal.Dialog>
      <Modal.Header>Create a new Project</Modal.Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              {...register("title", {
                required: "This field is required",
              })}
              disabled={isCreating}
            />
            {errors?.title && <Error>{errors?.title?.message}</Error>}
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="description">Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              {...register("description")}
              disabled={isCreating}
            />
          </Form.Group>
        </Modal.Body>
        <br />
        <Modal.Footer>
          <input type="submit" value="Create project" disabled={isCreating} />
          &nbsp;
          <input
            type="button"
            value="Cancel"
            onClick={() => cancelProject((state) => !state)}
            disabled={isCreating}
          />
        </Modal.Footer>
      </Form>
    </Modal.Dialog>
  );
}
