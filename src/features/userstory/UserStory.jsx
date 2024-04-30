import { useState } from "react";
import { useForm } from "react-hook-form";
import {parseISO, formatISO} from 'date-fns';
import { useDeleteUserStory } from "./useDeleteUserStory";
import { useCreateUpdateUserStory } from "./useCreateUpdateUserStory";
import toast from "react-hot-toast";

// TODO: refactor to utils folder
function formatDate(isoFormat) {
    if (isoFormat == "") return;
    const parsedDate = parseISO(isoFormat)
    return formatISO(parsedDate, {representation: 'date'})
}

export default function UserStory({ userStory, id }) {
  const [edit, setEdit] = useState(false);
  const { register, handleSubmit, reset, getValues } = useForm({
    defaultValues: {
      title: userStory.title,
      effortEstimate: userStory.effortEstimate,
      startDate: formatDate(userStory.startDate),
      endDate: formatDate(userStory.endDate),
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

  const isWorking = isDeleting || isCreatingUpdating

  return (
    <>
      <tr>
        <td>
          <input
            type="text"
            name="title"
            id="title"
            {...register("title")}
            disabled={!edit}
          />
        </td>
        <td>
          <input
            type="text"
            name="effortEstimate"
            id="effortEstimate"
            {...register("effortEstimate")}
            disabled={!edit}
          />
        </td>
        <td>
          <input
            type="date"
            name="startDate"
            id="startDate"
            {...register("startDate")}
            disabled={!edit}
          />
        </td>
        <td>
          <input
            type="date"
            name="endDate"
            id="endDate"
            {...register("endDate")}
            disabled={!edit}
          />
        </td>
        <td>
          <select
            name="status"
            id="status"
            {...register("status")}
            disabled={!edit}
          >
            <option value="to-do">TO-DO</option>
            <option value="in-progress">IN-PROGRESS</option>
            <option value="done">DONE</option>
          </select>
        </td>
        <td>
          <input
            type="text"
            name="assigned"
            id="assigned"
            {...register("assigned")}
            disabled={!edit}
          />
        </td>
      </tr>
      <input
        type="button"
        value={!userStory.id ? "Create" : !edit ? "Edit" : "Save"}
        onClick={handleSubmit(onClick)}
        disabled={isWorking}
      />
      {edit && (
        <input
          type="button"
          value="Cancel"
          onClick={() => {
            reset();
            setEdit(false);
          }}
          disabled={isWorking}
        />
      )}
      {userStory.id && !edit && (
        <input type="button" value="Delete" onClick={handleSubmit(onDelete)} disabled={isWorking} />
      )}
    </>
  );
}
