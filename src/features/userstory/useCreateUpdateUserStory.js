import { useMutation, useQueryClient } from "@tanstack/react-query";
import { catalogCompletedUserStory, createUpdateUserStory as createUpdateUserStoryApi } from "../../services/apiUserStories";
import toast from "react-hot-toast";

export function useCreateUpdateUserStory(projectId) {
    const queryClient = useQueryClient()
    const { mutate: createUpdateUserStory, isLoading: isCreatingUpdating } = useMutation({
        mutationFn: async ({ data, id }) => {
            // catalog completed user stories
            if (data?.status == "done" && id) {
                const userStoryId = id
                catalogCompletedUserStory({ projectId, userStoryId })
            }
            return await createUpdateUserStoryApi({ data, id })
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["userStories", projectId])
        },
        onError: (err) => {
            toast.error(err.message)
        }
    })

    return { createUpdateUserStory, isCreatingUpdating }
}