import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdateUserStory as createUpdateUserStoryApi } from "../../services/apiUserStories";
import toast from "react-hot-toast";

export function useCreateUpdateUserStory(id) {
    const queryClient = useQueryClient()
    const { mutate: createUpdateUserStory, isLoading: isCreatingUpdating } = useMutation({
        mutationFn: createUpdateUserStoryApi,
        onSuccess: () => {
            queryClient.invalidateQueries(["userStories", id])
        },
        onError: (err) => {
            toast.error(err.message)
        }
    })

    return { createUpdateUserStory, isCreatingUpdating }
}