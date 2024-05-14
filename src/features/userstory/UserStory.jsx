import { useState } from "react";
import { useForm } from "react-hook-form";
import { parseISO, formatISO } from "date-fns";
import { useDeleteUserStory } from "./useDeleteUserStory";
import { useCreateUpdateUserStory } from "./useCreateUpdateUserStory";
import toast from "react-hot-toast";
import { Row, Button, Form } from "react-bootstrap";
import { Basket, PencilSquare, PlusCircle, Save, XCircle } from "react-bootstrap-icons";

// TODO: refactor to utils folder
function formatDate(isoFormat) {
  if (isoFormat == "") return;
  const parsedDate = parseISO(isoFormat);
  return formatISO(parsedDate, { representation: "date" });
}

export default function UserStory({ userStory, id }) {
  const [edit, setEdit] = useState(false);
  const { register, handleSubmit, reset, getValues } = useForm({
    defaultValues: {
      title: userStory.title,
      effortEstimate: userStory.effortEstimate,
      startDate: formatDate(userStory.startDate ?  userStory.startDate : ""),
      endDate: formatDate(userStory.endDate ? userStory.endDate : ""),
      status: userStory.status,
      assigned: userStory.assigned,
    },
  });

  const { deleteUserStory, isDeleting } = useDeleteUserStory(id);
  const { createUpdateUserStory, isCreatingUpdating } =
    useCreateUpdateUserStory(id);

  function onClick(d) {
    if (!edit) {
      setEdit((state) => !state);
      return;
    }

    // Check if any value is empty
    const isEmpty = getValues("title") === "";

    if (isEmpty) {
      toast.error("User story title cannot be empty");
      return;
    }

    // TODO: implement logic to extract assignedId from assigned
    if (userStory.id)
      createUpdateUserStory(
        { data: d, id: userStory.id },
        {
          onSuccess: () => {
            toast.success("Record updated successfully");
            setEdit(false);
          },
        }
      );
    else {
      const data = { ...d, projectId: id };
      createUpdateUserStory(
        { data },
        {
          onSuccess: () => {
            toast.success("Record created successfully");
            setEdit(false);
          },
        }
      );
    }
  }

  function onDelete() {
    const { id } = userStory;
    deleteUserStory(id);
  }

  const isWorking = isDeleting || isCreatingUpdating;

  return (
    <>
      <Row>
        <Button
          as="input"
          type="text"
          name="title"
          {...register("title")}
          disabled={!edit}
        />
      </Row>
      <Row>
        <Button
          as="input"
          type="text"
          name="effortEstimate"
          {...register("effortEstimate")}
          disabled={!edit}
        />
      </Row>
      <Row>
        <Button
          as="input"
          type="date"
          name="startDate"
          {...register("startDate")}
          disabled={!edit}
        />
      </Row>
      <Row>
        <Button
          as="input"
          type="date"
          name="endDate"
          {...register("endDate")}
          disabled={!edit}
        />
      </Row>
      <Row>
        <Form.Select name="status" {...register("status")} disabled={!edit}>
          <option value="to-do">TO-DO</option>
          <option value="in-progress">IN-PROGRESS</option>
          <option value="done">DONE</option>
        </Form.Select>
      </Row>
      <Row>
        <Button
          as="input"
          type="text"
          name="assigned"
          {...register("assigned")}
          disabled={!edit}
        />
      </Row>
      <Row>
        {!userStory.id ? (
          <PlusCircle
            as={Button}
            size={20}
            variant="tertiary"
            onClick={handleSubmit(onClick)}
            disabled={isWorking}
          />
        ) : !edit ? (
          <PencilSquare
            as={Button}
            size={20}
            variant="tertiary"
            onClick={handleSubmit(onClick)}
            disabled={isWorking}
          />
        ) : (
          <Save
            as={Button}
            size={20}
            variant="tertiary"
            onClick={handleSubmit(onClick)}
            disabled={isWorking}
          />
        )}

        {edit && (
          <XCircle
            as={Button}
            size={20}
            variant="tertiary"
            onClick={() => {
              reset();
              setEdit(false);
            }}
            disabled={isWorking}
          />
        )}
        {userStory.id && !edit && (
          <Basket
            as={Button}
            size={20}
            variant="tertiary"
            onClick={handleSubmit(onDelete)}
            disabled={isWorking}
          />
        )}
      </Row>
    </>
  );
}
